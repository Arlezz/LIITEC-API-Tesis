"use client";

import MyGenericModal from "./MyGenericModal";
import { Chip, Code } from "@nextui-org/react";
import { getFormattedDate } from "@/utils/dateFormatter";
import MyCopyButton from "./MyCopyButton";

const MyViewModal = ({ isOpen, onClose, item }) => {
  const renderContent = () => {
    // Lógica para renderizar el contenido según el tipo de objeto
    if (!item) {
      return <p>Item is null or undefined</p>;
    }

    if (item._id) {
      // Es un usuario
      return (
        <>
          <div className=" border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">User Id</dt>
                <dd className="mt-1  leading-6  text-gray-700 sm:col-span-2 sm:mt-0">
                  <MyCopyButton label={item._id} herf={item._id} />
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Username</dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item?.username ?? "N/A"}
                </dd>
              </div>

              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">
                  Full name
                </dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item?.name + " " + item?.lastName ?? "N/A"}
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item?.email ?? "N/A"}
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">
                  LIITEC Broker
                </dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Chip
                    className="capitalize"
                    color={item?.superuser ? "warning" : "success"}
                    size="sm"
                    variant="flat"
                  >
                    {item?.superuser ? "Super User" : "Basic User"}
                  </Chip>
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">
                  User Role
                </dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Chip
                    className="capitalize"
                    color={
                      item.role === "superUser"
                        ? "secondary"
                        : item.role === "advancedUser"
                        ? "warning"
                        : "success"
                    }
                    size="sm"
                    variant="flat"
                  >
                    {item.role === "superUser"
                      ? "Admin"
                      : item.role === "advancedUser"
                      ? "Advanced User"
                      : "Basic User"}
                  </Chip>
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Created</dt>
                <dd className="mt-2  text-gray-900 sm:col-span-2 sm:mt-0">
                  {item?.createdOn != null
                    ? getFormattedDate(item.createdOn)
                    : "N/A"}
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Updated</dt>
                <dd className="mt-2  text-gray-900 sm:col-span-2 sm:mt-0">
                  {item?.updatedOn != null
                    ? getFormattedDate(item.updatedOn)
                    : "N/A"}
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">ACLs</dt>
                <ul className="flex flex-col gap-3 mt-2 text-gray-900 sm:col-span-2 sm:mt-0 overflow-x-auto">
                  {item.acls.length > 0 ? (
                    item.acls.map((acl, index) => (
                      <li key={index}>
                        <Code
                          key={index} // Add a unique key here
                          //className="capitalize"
                          color="default"
                          size="sm"
                        >
                          {acl.topic}
                        </Code>
                      </li>
                    ))
                  ) : (
                    <li key="no-acls">
                      <Code color="error" size="sm" variant="flat">
                        N/A
                      </Code>
                    </li>
                  )}
                </ul>
              </div>
            </dl>
          </div>
        </>
      );
    } else if (item.channelId && item.owner) {
      // Es un canal
      return (
        <>
          <div className=" border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">
                  Channel Id
                </dt>
                <dd className="mt-1  leading-6  text-gray-700 sm:col-span-2 sm:mt-0">
                  <MyCopyButton label={item.channelId} herf={item.channelId} />
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Owner</dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <MyCopyButton label={item.owner} herf={item.owner} />
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Name</dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item.name !== undefined &&
                  item.name !== null &&
                  item.name !== ""
                    ? item.name
                    : "N/A"}
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">
                  Description
                </dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item.description !== undefined &&
                  item.description !== null &&
                  item.description !== ""
                    ? item.description
                    : "N/A"}
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Access</dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Chip
                    className="capitalize"
                    color={item?.isPublic ? "success" : "danger"}
                    size="sm"
                    variant="flat"
                  >
                    {item?.isPublic ? "Public" : "Private"}
                  </Chip>
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Project</dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item.project !== undefined &&
                  item.project !== null &&
                  item.project !== ""
                    ? item.project
                    : "N/A"}
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">
                  Devices In Channel
                </dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item?.devicesCount ?? "N/A"}
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">
                  Ubication
                </dt>
                <ul className="mt-1 hover:underline hover:decoration-blue-600 hover:cursor-pointer leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item?.ubication?.latitude != null &&
                  item?.ubication?.longitude != null ? (
                    <li className="mb-2 md:mb-0">
                      <span className="text-blue-600">
                        {item.ubication.latitude}, {item.ubication.longitude}
                      </span>
                    </li>
                  ) : (
                    <li className="mb-2 md:mb-0">N/A</li>
                  )}
                </ul>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Created</dt>
                <dd className="mt-2  text-gray-900 sm:col-span-2 sm:mt-0">
                  {item?.createdOn != null
                    ? getFormattedDate(item.createdOn)
                    : "N/A"}
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Updated</dt>
                <dd className="mt-2  text-gray-900 sm:col-span-2 sm:mt-0">
                  {item?.updatedOn != null
                    ? getFormattedDate(item.updatedOn)
                    : "N/A"}
                </dd>
              </div>
            </dl>
          </div>
        </>
      );
    } else if (item.deviceId && item.channelId) {
      // Es un dispositivo
      return (
        <>
          <div className=" border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">
                  Device Id
                </dt>
                <dd className="mt-1  leading-6  text-gray-700 sm:col-span-2 sm:mt-0">
                  <MyCopyButton label={item.deviceId} herf={item.deviceId} />
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Channel</dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <MyCopyButton label={item.channelId} herf={item.channelId} />
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">State</dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Chip
                    //startContent={<CheckIcon size={18} />}
                    className="capitalize"
                    color={item?.isActive ? "success" : "danger"}
                    size="sm"
                    variant="dot"
                  >
                    {item?.isActive ? "Active" : "Inactive"}
                  </Chip>
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Model</dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item.model !== undefined &&
                  item.model !== null &&
                  item.model !== ""
                    ? item.model
                    : "N/A"}
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Type</dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item.type === "both" ? (
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
                      color={item.type === "analog" ? "secondary" : "warning"}
                      size="sm"
                      variant="flat"
                    >
                      {item.type}
                    </Chip>
                  )}
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">
                  Description
                </dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item.description !== undefined &&
                  item.description !== null &&
                  item.description !== ""
                    ? item.description
                    : "N/A"}
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Measures</dt>
                <ul className="mt-1 hover:underline hover:decoration-blue-600 hover:cursor-pointer leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item.measures.map((measure, index) => (
                    <li className="capitalize" key={index}>
                      <span className="font-medium">{measure.variable}</span>
                      <span className="text-gray-500"> ({measure.unit})</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Created</dt>
                <dd className="mt-2  text-gray-900 sm:col-span-2 sm:mt-0">
                  {item?.createdOn != null
                    ? getFormattedDate(item.createdOn)
                    : "N/A"}
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Updated</dt>
                <dd className="mt-2  text-gray-900 sm:col-span-2 sm:mt-0">
                  {item?.updatedOn != null
                    ? getFormattedDate(item.updatedOn)
                    : "N/A"}
                </dd>
              </div>
            </dl>
          </div>
        </>
      );
    } else if (item.key) {
      // Es una clave
      return (
        <>
          <div className=" border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Key</dt>
                <dd className="mt-1  leading-6  text-gray-700 sm:col-span-2 sm:mt-0">
                  <MyCopyButton label={item.key} herf={item.key} />
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">user</dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <MyCopyButton label={item.user} herf={item.user} />
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Type</dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Chip
                    className="capitalize"
                    color={
                      item.type === "superUser"
                        ? "secondary"
                        : item.type === "advancedUser"
                        ? "warning"
                        : "success"
                    }
                    size="sm"
                    variant="flat"
                  >
                    {item.type === "superUser"
                      ? "Admin"
                      : item.type === "advancedUser"
                      ? "Advanced User"
                      : "Basic User"}
                  </Chip>
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Deadline</dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span
                    className={`
                    ${
                      new Date(item.expirationDate) < Date.now()
                        ? "text-red-500"
                        : new Date(item.expirationDate) > Date.now()
                        ? "text-green-500"
                        : ""
                    }
                    `}
                  >
                    {item.expirationDate
                      ? getFormattedDate(item.expirationDate)
                      : "N/A"}
                  </span>
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">State</dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item.expirationDate ? (
                    <Chip
                      className="capitalize"
                      color={
                        new Date(item.expirationDate) < Date.now()
                          ? "danger"
                          : "success"
                      }
                      size="sm"
                      variant="dot"
                    >
                      {new Date(item.expirationDate) < new Date()
                        ? "expired"
                        : "active"}
                    </Chip>
                  ) : (
                    <Chip
                      className="capitalize"
                      color={"secondary"}
                      size="sm"
                      variant="dot"
                    >
                      {"Sistem Key"}
                    </Chip>
                  )}
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">
                  Channel Acess
                </dt>
                <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item.channelAccess !== undefined &&
                  item.channelAccess !== null &&
                  item.channelAccess !== ""
                    ? item.channelAccess
                    : "N/A"}
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Created</dt>
                <dd className="mt-2  text-gray-900 sm:col-span-2 sm:mt-0">
                  {item?.createdOn != null
                    ? getFormattedDate(item.createdOn)
                    : "N/A"}
                </dd>
              </div>
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className=" font-bold leading-6 text-gray-900">Updated</dt>
                <dd className="mt-2  text-gray-900 sm:col-span-2 sm:mt-0">
                  {item?.updatedOn != null
                    ? getFormattedDate(item.updatedOn)
                    : "N/A"}
                </dd>
              </div>
            </dl>
          </div>
        </>
      );
    } else {
      // Tipo de objeto no reconocido
      return <p>Objeto no reconocido</p>;
    }
  };

  return (
    <MyGenericModal
      size={"2xl"}
      scrollBehavior="outside"
      title="Item Details"
      subtitle={"Details of the selected item"}
      isOpen={isOpen}
      onClose={onClose}
      // Puedes agregar más props específicas si es necesario
    >
      {renderContent()}
    </MyGenericModal>
  );
};

export default MyViewModal;
