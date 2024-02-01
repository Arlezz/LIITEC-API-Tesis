import { getDevice } from "@/lib/general.actions";
import DeviceSettingsForm from "@/components/Devices/DeviceSettingsForm";
import { Divider } from "@nextui-org/react";
import DeviceDeleteSection from "@/components/Devices/DeviceDeleteSection";

export default async function DevicesPage({ params }) {
  const device = await getDevice(params.id, params.dvId);

  return (
    <>
      <section className="flex flex-col">
        <h2 className="text-2xl pb-8 md:text-3xl text-gray-700 font-medium">
          Device Settings
        </h2>
        <DeviceSettingsForm device={device}/>
      </section>
      <Divider orientation="horizontal" className="my-8" />
      <DeviceDeleteSection channelId={params.id} deviceId={params.dvId}/>
    </>
  );
}
