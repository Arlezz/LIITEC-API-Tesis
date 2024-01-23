import React from "react";
import GeneralService from "@/services/general.services";
import { ChannelLinks } from "@/config/ChannelConfig";

import { Chip } from "@nextui-org/react";
import Tabs from "@/components/Tabs";

export default async function Layout({ children, params }) {
  const channelId = params.id;

  const channel = await GeneralService.getChannel(channelId);

  //console.log(channel);

  return (
    <div className="max-w-[85rem] w-full mx-auto p-4 sm:flex sm:items-center sm:justify-between">
      <div className="w-full">
        <section className="flex flex-col pb-8">
          <h1 className="text-3xl md:text-4xl text-gray-700 font-medium">
            {channel?.name !== undefined
              ? channel.name
              : "Channel " + channel.channelId}
          </h1>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 pb-8">
          <div className="">
            <ul className="list-none">
              <li>
                Channel Id:{" "}
                <span className="font-bold">{channel?.channelId ?? "N/A"}</span>
              </li>

              <li>
                Owner: {channel?.owner !== undefined ? channel.owner : "N/A"}
              </li>
              <li>
                Access:{" "}
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
            <div className="w-full h-[1px] md:w-[1px] md:h-full my-2 md:my-0 bg-gray-400"></div>
            <ul className="list-none">
              {channel?.project && <li>Project: {channel.project ?? "N/A"}</li>}

              {channel?.description && (
                <li>Description: {channel.description ?? "N/A"}</li>
              )}

              {channel?.ubication !== undefined && (
                <li>
                  Ubication:{" "}
                  {channel?.ubication.latitude !== undefined &&
                  channel.ubication.latitude !== "" ? (
                    <span className="text-blue-600">
                      {channel.ubication.latitude},{" "}
                      {channel?.ubication.longitude !== undefined &&
                      channel.ubication.longitude !== "" ? (
                        <span className="text-blue-600">
                          {channel.ubication.longitude}
                        </span>
                      ) : (
                        <span className="text-red-600">N/A</span>
                      )}
                    </span>
                  ) : (
                    <span className="text-red-600">N/A</span>
                  )}
                </li>
              )}
            </ul>
          </div>
        </section>
        <Tabs links={ChannelLinks} id={params.id}/>
        {children}
      </div>
    </div>
  );
}
