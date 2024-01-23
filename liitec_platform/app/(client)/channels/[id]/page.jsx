import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import GeneralService from "@/services/general.services";
import { ChannelLinks } from "@/config/ChannelConfig";
import GenericTable from "@/components/GenericTable";
import TablePagination from "@/components/TablePagination";


import {
  DeviceTableRenderCell,
  DeviceTableColumns,
  DeviceTableInitialColumns,
  DeviceTableStatusOptions,
} from "@/config/DevicesConfig";

export default async function DevicesPage({ searchParams, params }) {

  const page = Number(searchParams.page) || 1;

  const devices = await GeneralService.getChannelDevices(params.id, page);

  const pages = devices.totalPages || 1;

  return (
    <>
      <section className="flex flex-col pb-8">
          <h2 className="text-2xl  md:text-4xl text-gray-700 font-medium">
            My Devices
          </h2>
      </section>
      <GenericTable
        data={devices.results}
        columns={DeviceTableColumns}
        renderCell={DeviceTableRenderCell}
        idField={"deviceId"}
        statusOptions={DeviceTableStatusOptions}
        initialColumns={DeviceTableInitialColumns}
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

