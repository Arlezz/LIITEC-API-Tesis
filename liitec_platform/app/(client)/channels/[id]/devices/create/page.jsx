import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
//import ChannelCreationForm from "@/components/Channels/ChannelCreationForm";

export default async function CreateDevicelPage({ searchParams }) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <section className="flex flex-col pb-8">
        <h1 className="text-2xl  md:text-4xl text-gray-700 font-medium">
          Create New Device
        </h1>
      </section>
      {/* <ChannelCreationForm session={session}/> */}
    </>
  );
}
