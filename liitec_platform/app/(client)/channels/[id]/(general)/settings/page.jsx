
import ChannelSettingsForm from "@/components/Channels/ChannelSettingsForm";
import { Divider } from "@nextui-org/react";
import ChannelDeleteSection from "@/components/Channels/ChannelDeleteSection";
import { getChannel } from "@/lib/general.actions";

export default async function ChannelSettingsPage({ params }) {
  const channelId = params.id;
  
  
  const channel = (await getChannel(channelId)) || {};

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
