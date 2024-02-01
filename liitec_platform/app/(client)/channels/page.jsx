import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { deleteChannel } from "@/lib/general.actions";

import { getUserChannels } from "@/lib/general.actions";

import TablePagination from "@/components/TablePagination";
import GenericTable from "@/components/GenericTable";
import {
  ChannelTableRenderCell,
  ChannelTableColumns,
  ChannelTableInitialColumns,
  ChannelTableStatusOptions,
} from "@/config/ChannelConfig";

export default async function ChannelPage({ searchParams }) {
  const session = await getServerSession(authOptions);

  const page = Number(searchParams.page) || 1;

  const channels = await getUserChannels(session.user._id, page);

  const pages = channels.totalPages || 1;

  return (
    <>
      <section className="flex flex-col pb-8">
        <h1 className="text-2xl  md:text-4xl text-gray-700 font-medium">
          My Channels
        </h1>
      </section>
      <GenericTable
        data={channels.results}
        columns={ChannelTableColumns}
        renderCell={ChannelTableRenderCell}
        idField={"channelId"}
        statusOptions={ChannelTableStatusOptions}
        initialColumns={ChannelTableInitialColumns}
        createLink={"/channels/create"}
        handleDelete={deleteChannel}
        modalTitle={"Delete Channel"}
        modalDescription={"Are you sure you want to delete this channel?"}
        redirectPostDelete={"/channels"}
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
