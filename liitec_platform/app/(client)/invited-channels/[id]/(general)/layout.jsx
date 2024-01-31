import React from "react";
import GeneralService from "@/services/general.services";
import { InvitedChannelLinks } from "@/config/InvitedChannelConfig";
import { Chip, Divider } from "@nextui-org/react";
import Tabs from "@/components/Tabs";
import { getFormattedDate } from "@/utils/dateFormatter";
import MyBreacrumbs from "@/components/MyBreacrumbs";

export default async function Layout({ children, params }) {
  const channelId = params.id;

  const channel = await GeneralService.getChannel(channelId);
  console.log(channel);

  return (
    <div className="max-w-[85rem] w-full mx-auto p-4 sm:flex sm:items-center sm:justify-between">
      <div className="w-full">
        <section className="flex flex-col pb-8 items-start gap-2">
          <MyBreacrumbs/>
          <div className="flex flex-row items-center gap-2 pt-4">
            <h1 className="text-3xl md:text-4xl text-gray-700 font-medium">
              {channel?.name != null && channel.name !== ""
                ? channel.name
                : "Channel " + channel.channelId}
            </h1>
            <Chip size="sm" variant="flat" radius="md">
              Channel
            </Chip>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 mb-1 md:pb-6">
          <div className="">
            <ul className="list-none">
              <li className="mb-2 md:mb-0">
                <span className="font-bold">Channel Id:{" "}</span>
                <span className="font-medium">{channel?.channelId ?? "N/A"}</span>
              </li>

              <li className="mb-2 md:mb-0">
              <span className="font-bold">Owner:{" "}</span>
                 {channel?.owner !== undefined ? channel.owner : "N/A"}
              </li>
              <li className="mb-2 md:mb-0">
              <span className="font-bold">Access:{" "}</span>
                
                <Chip
                  className="capitalize"
                  color={channel?.isPublic ? "success" : "danger"}
                  size="sm"
                  variant="flat"
                >
                  {channel?.isPublic ? "Public" : "Private"}
                </Chip>
              </li>
            </ul>
          </div>
          <div className=" md:flex gap-4">
            <Divider orientation="vertical" className="hidden md:block" />
            <ul className="list-none">
              {channel?.project != null && (
                <li
                className="mb-2 md:mb-0"
                >
                  <span className="font-bold">Project:{" "}</span>
                   {channel.project ?? "N/A"}</li>
              )}

              {channel?.description != null && (
                <li
                className="mb-2 md:mb-0"
                >
                  
                  <span className="font-bold">Description:{" "}</span>
                  {channel.description ?? "N/A"}</li>
              )}

              {channel?.ubication?.latitude != null &&
                channel?.ubication?.longitude != null && (
                  <li
                  className="mb-2 md:mb-0"
                  >
                    <span className="font-bold">Ubication:{" "}</span>
                
                    <span className="text-blue-600">
                      {channel.ubication.latitude},{" "}
                      {channel.ubication.longitude}
                    </span>
                  </li>
                )}
            </ul>
          </div>
        </section>
        <section className="pb-8">
          <span className="list-disc font-bold">Created: </span>
          <span className="font-medium">
            {channel?.createdOn != null
              ? getFormattedDate(channel.createdOn)
              : "N/A"}
          </span>
        </section>
        <Tabs links={InvitedChannelLinks} ids={[params.id]} />
        {children}
      </div>
    </div>
  );
}
