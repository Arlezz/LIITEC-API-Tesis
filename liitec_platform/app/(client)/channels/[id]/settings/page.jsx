//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
//import { getServerSession } from "next-auth";
import GeneralService from "@/services/general.services";
import ChannelForm from "@/components/Channels/ChannelForm";
import { Divider, Button } from "@nextui-org/react";

export default async function ChannelSettingsPage({ params }) {
  const channelId = params.id;

  const channel = (await GeneralService.getChannel(channelId)) || {};

  return (
    <>
      <section className="flex flex-col">
        <h2 className="text-2xl pb-8 md:text-3xl text-gray-700 font-medium">
          Channel Settings
        </h2>
        <ChannelForm channel={channel} />
      </section>
      <Divider orientation="horizontal" className="my-8" />
      <section className="grid grid-cols-1 md:grid-cols-2 pb-8">
        <div>
          <h3 className="text-xl pb-6 md:text-2xl text-gray-700 font-medium">
            Danger Zone
          </h3>
          <div className="">
            <p>
              You are in the channel deletion area. Note that actions performed
              here cannot be undone. Proceed with caution.
            </p>
          </div>
          <div className="mt-6">
            <Button type="submit" color="danger">
              Delete Channel
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
