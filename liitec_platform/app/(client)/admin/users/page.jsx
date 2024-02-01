import GenericTable from "@/components/GenericTable/GenericTable";
import TablePagination from "@/components/TablePagination";
import { getUsersAdmin } from "@/lib/auth.actions";
import {
  UsersAdminTableRenderCell,
  UsersAdminTableColumns,
  UsersAdminTableInitialColumns,
  UsersAdminTableStatusOptions,
} from "@/config/Admin/UsersAdminConfig";
import { deleteUser } from "@/lib/auth.actions";

export default async function UsersAdmPage({ searchParams }) {
  const page = Number(searchParams.page) || 1;

  const users = await getUsersAdmin(page);

  const pages = users.totalPages || 1;

  return (
    <>
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl text-gray-700 font-medium">
          User Administration
        </h2>
        <p className="mt-1 max-w-2xl  leading-6 text-gray-500">
          Manage and monitor user accounts with our user administration tool.
        </p>
      </div>
      <GenericTable
        data={users.results}
        columns={UsersAdminTableColumns}
        renderCell={UsersAdminTableRenderCell}
        idField={"_id"}
        statusOptions={UsersAdminTableStatusOptions}
        initialColumns={UsersAdminTableInitialColumns}
        createLink={"/auth/signup"}
        handleDelete={deleteUser}
        modalTitle={"Delete User"}
        modalDescription={"Are you sure you want to delete this user?"}
        redirectPostDelete={"/admin/users"}
        redirectPostEdit={"/admin/users"}
        filterField="_id"
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
