import GenericTable from "@/components/GenericTable/GenericTable";
import TablePagination from "@/components/TablePagination";
import { getDevicesAdmin } from "@/lib/auth.actions";
import { 
    DevicesAdminTableRenderCell,
    DevicesAdminTableColumns,
    DevicesAdminTableInitialColumns,
    DevicesAdminTableStatusOptions
  } from "@/config/Admin/DevicesAdminConfig";
import { deleteDevice } from "@/lib/auth.actions";

export default async function DevicesAdmPage({ searchParams }) {


  const page = Number(searchParams.page) || 1;

  const devices = await getDevicesAdmin(page);

  const pages = devices.totalPages || 1;


  return (
    <>
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl text-gray-700 font-medium">
          Devices Administration
        </h2>
        <p className="mt-1 max-w-2xl  leading-6 text-gray-500">
          Manage and monitor devices with our devices administration tool.
        </p>
      </div>
      <GenericTable
          filterField={"deviceId"}
          isStriped={false}
          data={devices.results}
          columns={DevicesAdminTableColumns}
          renderCell={DevicesAdminTableRenderCell}
          idField={"deviceId"}
          statusOptions={DevicesAdminTableStatusOptions}
          initialColumns={DevicesAdminTableInitialColumns}
          //createLink={"/auth/signup"}
          handleDelete={deleteDevice}
          modalTitle={"Delete Device"}
          modalDescription={"Are you sure you want to delete this device?"}
          redirectPostDelete={"/admin/devices"}
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
