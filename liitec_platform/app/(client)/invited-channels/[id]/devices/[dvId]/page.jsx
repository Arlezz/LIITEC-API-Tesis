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
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
        {device &&
          device.measures.map(async (variable) => {
            const data = await getDeviceData(
              params.dvId,
              variable.variable,
              1,
              15
            );
            return (
              <div className="p-0 md:p-4" key={variable.variable}>
                <RealtimeLineChart
                  channels={params.id}
                  device={params.dvId}
                  variable={variable}
                  initialData={data.results}
                />
              </div>
            );
          })}
      </section>
    </>
  );
}
