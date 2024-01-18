import GeneralService from "@/services/general.services";
import UserService from "@/services/user.services";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import AuthService from "@/services/auth.service";
import ChannelTable from "@/components/ChannelTable";



export default async function ChannelPage() {
  const session = await getServerSession(authOptions);

  console.log(session);

  const channels = await GeneralService.getChannels(session.user._id);

  console.log("My Channels: ", channels);



  return (
    <div className="max-w-[85rem] w-full mx-auto p-4 sm:flex sm:items-center sm:justify-between">
      <div className="w-full">
        {/* Title section */}
        <section className="flex flex-col pb-8">
          <h1 className="text-2xl  md:text-4xl text-gray-700 font-medium">
            My Channels
          </h1>
        </section>
        <ChannelTable channels={channels}/>
  
      </div>
    </div>
  );
}
