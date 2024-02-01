import GenericTable from "@/components/GenericTable/GenericTable";
import TablePagination from "@/components/TablePagination";
import { getKeysAdmin } from "@/lib/auth.actions";
import { 
    KeysAdminTableRenderCell,
    KeysAdminTableColumns,
    KeysAdminTableInitialColumns,
    KeysAdminTableStatusOptions
  } from "@/config/Admin/KeysAdminConfig";
import { deleteDevice } from "@/lib/auth.actions";

export default async function DevicesAdmPage({ searchParams }) {


  const page = Number(searchParams.page) || 1;

  const keys = await getKeysAdmin(page);

  const pages = keys.totalPages || 1;


  return (
    <>
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl text-gray-700 font-medium">
          Keys Administration
        </h2>
        <p className="mt-1 max-w-2xl  leading-6 text-gray-500">
          Manage and monitor keys with our keys administration tool.
        </p>
      </div>
      <GenericTable
          filterField={"deviceId"}
          isStriped={false}
          data={keys.results}
          columns={KeysAdminTableColumns}
          renderCell={KeysAdminTableRenderCell}
          idField={"deviceId"}
          statusOptions={KeysAdminTableStatusOptions}
          initialColumns={KeysAdminTableInitialColumns}
          //createLink={"/auth/signup"}
          //handleDelete={deleteDevice}
          modalTitle={"Delete Key"}
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
