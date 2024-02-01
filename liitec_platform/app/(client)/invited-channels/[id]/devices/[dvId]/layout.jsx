import { getDevice } from "@/lib/general.actions";
import { Button, Chip, Divider } from "@nextui-org/react";
import { InvitedDeviceLinks } from "@/config/InvitedDevicesConfig";
import Tabs from "@/components/Tabs";
import { getFormattedDate } from "@/utils/dateFormatter";
import { LeftArrowIcon } from "@/components/LeftArrowIcon";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyBreacrumbs from "@/components/MyBreacrumbs";

export default async function Layout({ params, children }) {
  const device = await getDevice(params.id, params.dvId);

  return (
    <>
      <section className="flex flex-col pb-8 items-start gap-2">
        <MyBreacrumbs/>
        <div className="flex flex-col items-start pt-4">
          <h1 className="text-2xl md:text-4xl text-gray-700 font-medium">
            {device?.name != null && device.name !== ""
              ? device.name
              : "Device " + device.channelId}
          </h1>
          <Chip size="sm" color="secondary" variant="flat" radius="md">
            Device
          </Chip>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 mb-2 md:mb-4">
        <div className="">
          <ul className="list-none">
            <li className="mb-2 md:mb-0">
              <span className="font-bold">Device Id:{" "}</span>
              <span className="font-medium">{device?.deviceId ?? "N/A"}</span>
            </li>

            <li className="mb-2 md:mb-0">
              <span className="font-bold">Channel :{" "}</span>
              {device?.channelId !== undefined ? device.channelId : "N/A"}
            </li>
            <li className="flex flex-center items-center gap-1 mb-2 md:mb-0">
            <span className="font-bold">State :{" "}</span>
              
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
              <li className="mb-2 md:mb-0">
                <span className="font-bold">Model :{" "}</span>
                <span className="font-bold">{device?.model ?? "N/A"}</span>
              </li>
            )}

            {device?.type != null && (
              <li className="capitalize flex gap-1 mb-2 md:mb-0">
                <span className="font-bold">Type :{" "}</span>
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
              
              <li className="list-none">
                                <span className="font-bold">Description :{" "}</span>

                {device.description ?? "N/A"}</li>
            )}
          </ul>
        </div>
      </section>
      <section className="mb-2 md:mb-6">
        <span className="list-disc font-bold">Measures:</span>
        {device.measures.map((measure, index) => (
          <li className="capitalize" key={index}>
            <span className="font-medium">{measure.variable}</span>
            <span className="text-gray-500"> ({measure.unit})</span>
          </li>
        ))}
      </section>
      <section className="pb-8">
        <span className="list-disc font-bold">Created: </span>
        <span className="font-medium">
          {device?.createdOn != null
            ? getFormattedDate(device.createdOn)
            : "N/A"}
        </span>
      </section>
      <Tabs links={InvitedDeviceLinks} ids={[params.id, params.dvId]} />

      {children}
    </>
  );
}
