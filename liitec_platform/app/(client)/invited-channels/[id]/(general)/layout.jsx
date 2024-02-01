import React from "react";
import { InvitedChannelLinks } from "@/config/InvitedChannelConfig";
import { Chip, Divider } from "@nextui-org/react";
import Tabs from "@/components/Tabs";
import { getFormattedDate } from "@/utils/dateFormatter";
import MyBreacrumbs from "@/components/MyBreacrumbs";
import { getChannel } from "@/lib/general.actions";

export default async function Layout({ children, params }) {
  const channelId = params.id;

  const channel = await getChannel(channelId);

  return (
    <>
      <section className="flex flex-col pb-8 items-start gap-2">
        <MyBreacrumbs />
        <div className="flex flex-col items-start pt-4">
          <h1 className="text-3xl md:text-4xl text-gray-700 font-medium">
            {channel?.name != null && channel.name !== ""
              ? channel.name
              : "Channel " + channel.channelId}
          </h1>
          <Chip size="sm" color="primary" variant="flat" radius="md">
            Channel
          </Chip>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 mb-1 md:pb-6">
        <div className="">
          <ul className="list-none">
            <li className="mb-2 md:mb-0">
              <span className="font-bold">Channel Id: </span>
              <span className="font-medium">{channel?.channelId ?? "N/A"}</span>
            </li>

            <li className="mb-2 md:mb-0">
              <span className="font-bold">Owner: </span>
              {channel?.owner !== undefined ? channel.owner : "N/A"}
            </li>
            <li className="mb-2 md:mb-0">
              <span className="font-bold">Access: </span>

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
              <li className="mb-2 md:mb-0">
                <span className="font-bold">Project: </span>
                {channel.project ?? "N/A"}
              </li>
            )}

            {channel?.description != null && (
              <li className="mb-2 md:mb-0">
                <span className="font-bold">Description: </span>
                {channel.description ?? "N/A"}
              </li>
            )}

            {channel?.ubication?.latitude != null &&
              channel?.ubication?.longitude != null && (
                <li className="mb-2 md:mb-0">
                  <span className="font-bold">Ubication: </span>

                  <span className="text-blue-600">
                    {channel.ubication.latitude}, {channel.ubication.longitude}
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
    </>
  );
}
