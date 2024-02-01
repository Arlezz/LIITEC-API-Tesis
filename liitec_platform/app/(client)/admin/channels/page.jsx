import GenericTable from "@/components/GenericTable/GenericTable";
import TablePagination from "@/components/TablePagination";
import { getChannelsAdmin } from "@/lib/auth.actions";
import { 
    ChannelsAdminTableRenderCell,
    ChannelsAdminTableColumns,
    ChannelsAdminTableInitialColumns,
    ChannelsAdminTableStatusOptions
  } from "@/config/Admin/ChannelsAdminConfig";
import { deleteChannel } from "@/lib/auth.actions";

export default async function ChannesAdmPage({ searchParams }) {


  const page = Number(searchParams.page) || 1;

  const channels = await getChannelsAdmin(page);

  const pages = channels.totalPages || 1;


  return (
    <>
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl text-gray-700 font-medium">
          Channels Administration
        </h2>
        <p className="mt-1 max-w-2xl  leading-6 text-gray-500">
          Manage and monitor channels with our channel administration tool.
        </p>
      </div>
      <GenericTable
          filterField={"channelId"}
          isStriped={false}
          data={channels.results}
          columns={ChannelsAdminTableColumns}
          renderCell={ChannelsAdminTableRenderCell}
          idField={"channelId"}
          statusOptions={ChannelsAdminTableStatusOptions}
          initialColumns={ChannelsAdminTableInitialColumns}
          //createLink={"/auth/signup"}
          handleDelete={deleteChannel}
          modalTitle={"Delete Device"}
          modalDescription={"Are you sure you want to delete this device?"}
          redirectPostDelete={"/admin/channels"}
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
