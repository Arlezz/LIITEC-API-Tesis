import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import ChannelCreationForm from "@/components/Channels/ChannelCreationForm";


export default async function CreateChannelPage({ searchParams }) {

  const session = await getServerSession(authOptions);

  return (
    <div className="max-w-[85rem] w-full mx-auto p-4 sm:flex sm:items-center sm:justify-between">
      <div className="w-full">
        <section className="flex flex-col pb-8">
          <h1 className="text-2xl  md:text-4xl text-gray-700 font-medium">
            Create New Channel
          </h1>
        </section>
        <ChannelCreationForm session={session}/>
      </div>
    </div>
  );
}
