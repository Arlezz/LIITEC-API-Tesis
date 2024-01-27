//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
//import { getServerSession } from "next-auth";
import GeneralService from "@/services/general.services";
import ChannelSettingsForm from "@/components/Channels/ChannelSettingsForm";
import { Divider, Button, useDisclosure } from "@nextui-org/react";
import ChannelDeleteSection from "@/components/Channels/ChannelDeleteSection";

export default async function ChannelSettingsPage({ params }) {
  const channelId = params.id;
  
  
  const channel = (await GeneralService.getChannel(channelId)) || {};

  return (
    <>
      <section className="flex flex-col">
        <h2 className="text-2xl pb-8 md:text-3xl text-gray-700 font-medium">
          Channel Settings
        </h2>
        <ChannelSettingsForm channel={channel} />
      </section>
      <Divider orientation="horizontal" className="my-8" />
      <ChannelDeleteSection channelId={channelId} />
    </>
  );
}
