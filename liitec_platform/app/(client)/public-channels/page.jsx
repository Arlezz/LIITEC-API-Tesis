import { getPublicChannels } from "@/lib/general.actions";
import TablePagination from "@/components/TablePagination";
import GenericTable from "@/components/GenericTable";
import {
  PublicChannelTableRenderCell,
  PublicChannelTableColumns,
  PublicChannelTableInitialColumns,
  PublicChannelTableStatusOptions,
} from "@/config/PublicChannelConfig";

export default async function Page({ searchParams }) {
  const page = Number(searchParams.page) || 1;

  const publicChannels = await getPublicChannels(page);


  const pages = publicChannels.totalPages || 1;

  return (
    <>
      <section className="flex flex-col pb-8">
        <h1 className="text-2xl  md:text-4xl text-gray-700 font-medium">
          Public Channels
        </h1>
      </section>
      <GenericTable
        data={publicChannels.results}
        columns={PublicChannelTableColumns}
        renderCell={PublicChannelTableRenderCell}
        idField={"channelId"}
        statusOptions={PublicChannelTableStatusOptions}
        initialColumns={PublicChannelTableInitialColumns}
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
