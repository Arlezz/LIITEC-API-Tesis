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
          device.measures.map(async (variable, index) => {
            const data = await getDeviceData(
              params.dvId,
              variable.variable,
              1,
              15
            );
            return (
              <div className="p-0 md:p-4" key={index}>
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
      </section>
    </>
  );
}
