import { getDevice } from "@/lib/general.actions";
import { Chip, Divider } from "@nextui-org/react";
import { DeviceLinks } from "@/config/DevicesConfig";
import Tabs from "@/components/Tabs";
import { getFormattedDate } from "@/utils/dateFormatter";


export default async function Layout({ params, children }) {
  console.log("params", params);

  const device = await getDevice(params.id, params.dvId);

  console.log("device", device);

  return (
    <>
      <section className="flex flex-row pb-8 items-center gap-2">
        <h2 className="text-2xl  md:text-4xl text-gray-700 font-medium">
          {device?.name != null && device.name !== ""
            ? device.name
            : "Device " + device.channelId}
        </h2>
        <Chip size="sm" variant="flat" radius="md">Device</Chip>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 pb-4">
        <div className="">
          <ul className="list-none">
            <li>
              Device Id:{" "}
              <span className="font-bold">{device?.deviceId ?? "N/A"}</span>
            </li>

            <li>
              Channel:{" "}
              {device?.channelId !== undefined ? device.channelId : "N/A"}
            </li>
            <li className="flex flex-center items-center gap-1">
              State:{" "}
              <Chip
                //startContent={<CheckIcon size={18} />}
                className="capitalize"
                color={device?.isActive ? "success" : "danger"}
                size="sm"
                variant="dot"
              >
                {device?.isActive ? "Active" : "Inactive"}
              </Chip>
            </li>
          </ul>
        </div>
        <div className=" md:flex gap-4">
          <Divider orientation="vertical" className="hidden md:block" />

          <ul className="list-none">
            {device?.model != null && (
              <li>
                Model:{" "}
                <span className="font-bold">{device?.model ?? "N/A"}</span>
              </li>
            )}

            {device?.type != null && (
              <li className="capitalize flex gap-1">
                Type:{" "}
                {device.type === "both" ? (
                  <span className="flex flex-row gap-1">
                    <Chip
                      className="capitalize"
                      color="secondary"
                      size="sm"
                      variant="flat"
                    >
                      Analog
                    </Chip>
                    <Chip
                      className="capitalize"
                      color="warning"
                      size="sm"
                      variant="flat"
                    >
                      Digital
                    </Chip>
                  </span>
                ) : (
                  <Chip
                    className="capitalize"
                    color={device.type === "analog" ? "secondary" : "warning"}
                    size="sm"
                    variant="flat"
                  >
                    {device.type}
                  </Chip>
                )}
              </li>
            )}
            {device?.description != null && (
                <li>Description: {device.description ?? "N/A"}</li>
            )}
          </ul>
        </div>
      </section>
      <section className="pb-6">
        <span className="list-disc">Measures:</span>
        {device.measures.map((measure, index) => (
          <li className="capitalize" key={index}>
            <span className="font-bold">{measure.variable}</span>
            <span className="text-gray-500"> ({measure.unit})</span>
          </li>
        ))}
      </section>
      <section className="pb-8">
          <span className="list-disc">Created: </span>
          <span className="font-medium">
            {device?.createdOn != null
              ? getFormattedDate(device.createdOn)
              : "N/A"}
          </span>
        </section>
      <Tabs links={DeviceLinks} ids={[params.id, params.dvId]} />

      {children}
    </>
  );
}
