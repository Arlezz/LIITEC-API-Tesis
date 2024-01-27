import { getDevice } from "@/lib/general.actions";

export default async function DevicePage({ params }) {
  console.log("params", params);

  const device = await getDevice(params.id, params.dvId);

  console.log("device", device);

  return (
    <>
      <h1 className="text-2xl md:text-3xl text-gray-700 font-medium">
        GRAFICO DE LOS DEVICES
      </h1>
    </>
  );
}
