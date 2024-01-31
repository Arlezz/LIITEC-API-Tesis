import { getChannelDevices } from "@/lib/general.actions";
import GenericTable from "@/components/GenericTable";
import TablePagination from "@/components/TablePagination";


import {
  InvitedDeviceTableRenderCell,
  InvitedDeviceTableColumns,
  InvitedDeviceTableInitialColumns,
  InvitedDeviceTableStatusOptions,
} from "@/config/InvitedDevicesConfig";

export default async function DevicesPage({ searchParams, params }) {

  const page = Number(searchParams.page) || 1;

  const devices = await getChannelDevices(params.id, page);

  const pages = devices.totalPages || 1;

  return (
    <>
      <section className="flex flex-col pb-8">
          <h2 className="text-2xl  md:text-3xl text-gray-700 font-medium">
            Channel Devices
          </h2>
      </section>
      <GenericTable
        data={devices.results}
        columns={InvitedDeviceTableColumns}
        renderCell={InvitedDeviceTableRenderCell}
        idField={"deviceId"}
        statusOptions={InvitedDeviceTableStatusOptions}
        initialColumns={InvitedDeviceTableInitialColumns}
        //createLink={`/channels/${params.id}/devices/create`}
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

