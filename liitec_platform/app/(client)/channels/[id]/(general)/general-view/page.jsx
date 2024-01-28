import { getMyDevices } from "@/lib/general.actions";
import RealtimeLineChart from "@/components/Data/RealtimeLineChart";
import { getDeviceData } from "@/lib/general.actions";
import { Skeleton, Link } from "@nextui-org/react";
import ArrowUpOnSquare from "@/components/ArrowUpOnSquare";


export default async function DevicesGeneralViewPage({ params }) {
  const devices = await getMyDevices(params.id);

  return (
    <>
      <section className="flex flex-col pb-8">
        <h2 className="text-2xl md:text-3xl text-gray-700 font-medium">
          General View
        </h2>
      </section>
      <section className="grid grid-cols-1 ">
        {devices.length > 0 ? (
          devices.map((device) => (
            <div key={device.deviceId} className="pb-8">
              <h3 className="flex flex-rows items-center gap-1 text-xl font-medium ">
                Device:
              </h3>
              <Link 
                className="pb-4 md:p-0"
                size="lg"
                showAnchorIcon 
                anchorIcon={<ArrowUpOnSquare/> }
                href={`/channels/${params.id}/devices/${device.deviceId}`}>
                {device.name || device.deviceId}
                </Link>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {device.measures.map(async (variable) => {
                  const data = await getDeviceData(
                    device.deviceId,
                    variable.variable,
                    1,
                    15
                  );
                  return (
                    <div className="p-0 pb-8 md:pt-4 md:pb-4 md:pl-0 md:pr-0" key={variable.variable}>
                      <RealtimeLineChart
                        channels={params.id}
                        device={device.deviceId}
                        variable={variable}
                        initialData={data.results}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          // Muestra el esqueleto mientras se cargan los datos
          <>
            No devices found
            {/* <Skeleton count={4} width={300} height={200} /> */}
          </>
        )}
      </section>
    </>
  );
}

