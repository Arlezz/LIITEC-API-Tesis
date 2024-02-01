import { getChannelsInvitedPaginate } from "@/lib/general.actions";
import TablePagination from "@/components/TablePagination";
import GenericTable from "@/components/GenericTable";
import {
  InvitedChannelTableRenderCell,
  InvitedChannelTableColumns,
  InvitedChannelTableInitialColumns,
  InvitedChannelTableStatusOptions,
} from "@/config/InvitedChannelConfig";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Page({ searchParams }) {
  const page = Number(searchParams.page) || 1;

  const channelsInvited = await getChannelsInvitedPaginate(page);

  const pages = channelsInvited.totalPages || 1;

  return (
    <>
      <section className="flex flex-col pb-8">
        <h1 className="text-2xl md:text-4xl text-gray-700 font-medium">
          Invited Channels
        </h1>
      </section>
      <GenericTable
        data={channelsInvited.results}
        columns={InvitedChannelTableColumns}
        renderCell={InvitedChannelTableRenderCell}
        idField={"channelId"}
        statusOptions={InvitedChannelTableStatusOptions}
        initialColumns={InvitedChannelTableInitialColumns}
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
