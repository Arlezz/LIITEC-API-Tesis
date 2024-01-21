import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import GeneralService from "@/services/general.services";


export default async function ChannelDetailPage({ params }) {

    const channelId = params.id;

    const session = await getServerSession(authOptions);

    const channel = await GeneralService.getChannel(channelId);

    console.log(channel);




    return(
        <div className="max-w-[85rem] w-full mx-auto p-4 sm:flex sm:items-center sm:justify-between">
        <div className="w-full">
          <section className="flex flex-col pb-8">
            <h1 className="text-2xl md:text-3xl text-gray-700 font-medium">
                {channel?.name !== undefined ? channel.name : channel.channelId}
            </h1>
          </section>
        </div>
      </div>
    );
}

