import { getMyDevices } from "@/lib/general.actions";
import RealtimeLineChart from "@/components/Data/RealtimeLineChart";
import { getDeviceData } from "@/lib/general.actions";
import { Skeleton } from "@nextui-org/react";


export default async function DevicesGeneralViewPage({ params }) {
  const devices = await getMyDevices(params.id);

  return (
    <>
      <section className="flex flex-col pb-8">
        <h2 className="text-2xl  md:text-3xl text-gray-700 font-medium">
          Genaral View
        </h2>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2">
        {devices.length  > 0 ? (
          devices.map((device) => (
            device.measures.map(async (variable) => {
              const data = await getDeviceData(
                device.deviceId,
                variable.variable,
                1,
                15
              );
              return (
                <div className="p-4" key={variable.variable}>
                  <RealtimeLineChart
                    channels={params.id}
                    device={device.deviceId}
                    variable={variable}
                    initialData={data.results}
                  />
                </div>
              );
            })
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
