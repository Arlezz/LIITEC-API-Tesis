import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DeviceCreationForm from "@/components/Devices/DeviceCreationForm";
import MyBreacrumbs from "@/components/MyBreacrumbs";
import { getServerSession } from "next-auth";
//import ChannelCreationForm from "@/components/Channels/ChannelCreationForm";

export default async function CreateDevicelPage({ params, searchParams }) {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  const channelId = params.id;

  return (
    <>
      <section className="flex flex-col pb-8">
        <MyBreacrumbs/>
        <h1 className="text-2xl md:text-4xl text-gray-700 font-medium pt-4">
          Create New Device
        </h1>
      </section>
      <DeviceCreationForm session={session} channelId={channelId}/>
      {/* <ChannelCreationForm session={session}/> */}
    </>
  );
}
