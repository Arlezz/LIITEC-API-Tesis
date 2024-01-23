//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
//import { getServerSession } from "next-auth";
import GeneralService from "@/services/general.services";
import ChannelForm from "@/components/Channels/ChannelForm";

export default async function ChannelSettingsPage({params}) {

  const channelId = params.id;

  const channel = await GeneralService.getChannel(channelId) || {};

  //console.log("CANAL DENTRO",channel);


  return (
    <>
      <section className="flex flex-col pb-8">
        <h2 className="text-2xl  md:text-4xl text-gray-700 font-medium">
          Channel Settings
        </h2>
      </section>
      <ChannelForm channel={channel}/>
    </>
  );
}
