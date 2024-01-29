import GenericTable from "@/components/GenericTable";
import TablePagination from "@/components/TablePagination";
import { getGuest } from "@/lib/general.actions";
import {
  ChannelGuestTableRenderCell,
  ChannelGuestTableColumns,
  ChannelGuestTableInitialColumns,
  ChannelGuestTableStatusOptions,
} from "@/config/ChannelGuestConfig";

export default async function InvitePage({ searchParams, params}) {

  const page = Number(searchParams.page) || 1;

  const guests = await getGuest(params.id, page);

  const pages = guests.totalPages || 1;

  return (
    <>
      <section className="flex flex-col">
        <h2 className="text-2xl pb-8 md:text-3xl text-gray-700 font-medium">
          Channel Guests
        </h2>
      </section>
      <GenericTable
        data={guests.results}
        columns={ChannelGuestTableColumns}
        renderCell={ChannelGuestTableRenderCell}
        idField={"_id"}
        statusOptions={ChannelGuestTableStatusOptions}
        initialColumns={ChannelGuestTableInitialColumns}
        createLink={`/channels/${params.id}/guests/create`}
      />
      <div className="py-8 px-2 flex justify-center items-center">
          <TablePagination
            page={page}
            totalPages={pages}
            hasNextPage={page < pages}
          />
        </div>
    </>
  );
}
