import { getDevice, getDeviceData } from "@/lib/general.actions";
import LineChart from "@/components/LineChart";
import RealtimeLineChart from "@/components/Data/RealtimeLineChart";

export default async function DevicePage({ params }) {

  const device = await getDevice(params.id, params.dvId);

  return (
    <>
      <h1 className="text-2xl md:text-3xl text-gray-700 font-medium mb-8">
        Plotted Data
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2">
        {device &&
          device.measures.map(async (variable) => {
            const data = await getDeviceData(
              params.dvId,
              variable.variable,
              1,
              15
            );
            return (
              <div className="p-4">
                <RealtimeLineChart
                    channels={params.id}
                    key={variable.variable}
                    device={params.dvId}
                    variable={variable}
                    initialData={data.results}
                  />
              </div>
            );
          })}

        {/* {variables.map(async (variable) => {
          const data = await getDeviceData(params.dvId, variable.variable,1,15);
          return (
            <div key={variable.variable} className="p-4">
              <LineChart variable={variable} data={data.results} />
            </div>
          );
        })} */}
      </section>
    </>
  );
}
