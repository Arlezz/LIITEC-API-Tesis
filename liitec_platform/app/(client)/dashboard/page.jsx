import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getUser } from "@/lib/user.actions";
import {
  Users,
  Cpu,
  MemoryStick,
  KeyRound,
  CloudSun,
  Unplug,
  UserRoundCheck,
  MailCheck,
  Mail,
} from "lucide-react";
import {
  getMyChannels,
  getMyDevices,
  getGuests,
  getChannelsInvited,
} from "@/lib/general.actions";
import {
  getUsersPlatform,
  getKeys,
  getChannelsPlatform,
  getDevicesPlatform,
} from "@/lib/auth.actions";

import Map from "@/components/Map";
import { Link } from "@nextui-org/react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const role = session?.user?.apiKey?.type;

  let usersPlatform, keys, channelsPlatform, devicesPlatform;

  if (role === "superUser") {
    [usersPlatform, keys, channelsPlatform, devicesPlatform] =
      await Promise.all([
        getUsersPlatform(),
        getKeys(),
        getChannelsPlatform(),
        getDevicesPlatform(),
      ]);
  }

  const user = await getUser(session.user._id);
  const guests = await getGuests(user._id);

  let channels, devices, variables;

  if (role === "advancedUser" || role === "superUser") {
    channels = await getMyChannels(user._id);
    devices = await Promise.all(
      channels.map(async (channel) => await getMyDevices(channel.channelId))
    ).then((deviceLists) => deviceLists.flat());

    variables = devices.flatMap((device) =>
      device.measures.flatMap((measure) => measure.variable)
    );
  }

  const channelsInvited = await getChannelsInvited();

  return (
    <>
      {/* Title section */}
      <section className="flex flex-col pb-6">
        <span className="text-md md:text-xl text-gray-700 font-medium">
          Dashboard
        </span>
        <h1 className="text-2xl  md:text-4xl text-gray-700 font-medium">
          {session?.user?.apiKey?.type === "superUser" ? "Platform " : null}
          Overview
        </h1>
      </section>
      <div className="flex flex-col gap-4">
        {session?.user?.apiKey?.type === "superUser" ? (
          <>
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/admin/users"
                className="text-black flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <span className="text-4xl font-bold">
                  {usersPlatform?.length > 0 ? <>{usersPlatform.length}</> : 0}
                </span>

                <div className="flex gap-1 items-center">
                  <span className="text-xl">Users </span>
                  <Users size={25} />
                </div>
                <span className="text-gray-400 text-md font-medium">
                  In the platform
                </span>
              </Link>
              <Link
                href="/admin/channels"
                className="text-black flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <span className="text-4xl font-bold">
                  {channelsPlatform?.length > 0 ? (
                    <>{channelsPlatform.length}</>
                  ) : (
                    0
                  )}
                </span>
                <div className="flex gap-1 items-center">
                  <span className="text-xl">Channels </span>
                  <Cpu size={25} />
                </div>
                <span className="text-gray-400 text-md font-medium">
                  In the platform
                </span>
              </Link>
              <Link
                href="/admin/devices"
                className="text-black flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <span className="text-4xl font-bold">
                  {devicesPlatform?.length > 0 ? (
                    <>{devicesPlatform.length}</>
                  ) : (
                    0
                  )}
                </span>
                <div className="flex gap-1 items-center">
                  <span className="text-xl">Devices </span>
                  <MemoryStick size={25} />
                </div>
                <span className="text-gray-400 text-md font-medium">
                  In the platform
                </span>
              </Link>
              <Link
                href="/admin/keys"
                className="text-black flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <span className="text-4xl font-bold">
                  {keys?.length > 0 ? <>{keys.length}</> : 0}
                </span>
                <div className="flex gap-1 items-center">
                  <span className="text-xl">Keys </span>
                  <KeyRound size={25} />
                </div>
                <span className="text-gray-400 text-md font-medium">
                  In the platform
                </span>
              </Link>
            </section>
            <section className="flex flex-col pb-6 pt-10">
              <span className="text-md md:text-xl text-gray-700 font-medium">
                Dashboard
              </span>
              <h1 className="text-2xl  md:text-4xl text-gray-700 font-medium">
                My Overview
              </h1>
            </section>
          </>
        ) : null}

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {session?.user?.apiKey?.type === "advancedUser" ||
          session?.user.apiKey?.type === "superUser" ? (
            <>
              <Link
                href="/channels"
                className="text-black flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <span className="text-4xl font-bold">
                  {channels?.length > 0 ? <>{channels.length}</> : 0}
                </span>
                <div className="flex gap-1 items-center">
                  <span className="text-xl">My Channels</span>
                  <Cpu size={25} />
                </div>
              </Link>
              <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center  hover:bg-gray-100 transition duration-300 ease-in-out">
                <span className="text-4xl font-bold">
                  {devices?.length > 0 ? <>{devices.length}</> : 0}
                </span>
                <div className="flex gap-1 items-center">
                  <span className="text-xl">My Devices</span>
                  <MemoryStick size={25} />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center  hover:bg-gray-100 transition duration-300 ease-in-out">
                <span className="text-4xl font-bold">
                  {variables?.length > 0 ? <>{variables.length}</> : 0}
                </span>
                <div className="flex gap-1 items-center">
                  <span className="text-xl">My Variables</span>
                  <CloudSun size={25} />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center  hover:bg-gray-100 transition duration-300 ease-in-out">
                <span className="text-4xl font-bold">
                  {user?.acls ? <>{user.acls.length}</> : 0}
                </span>
                <div className="flex gap-1 items-center">
                  <span className="text-xl">My Topics</span>
                  <Unplug size={25} />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center  hover:bg-gray-100 transition duration-300 ease-in-out">
                <span className="text-4xl font-bold">
                  {guests?.length > 0 ? <>{guests.length}</> : 0}
                </span>
                <div className="flex gap-1 items-center">
                  <span className="text-xl">My Guests</span>
                  <UserRoundCheck size={25} />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center  hover:bg-gray-100 transition duration-300 ease-in-out">
                <span className="text-4xl font-bold">
                  {channelsInvited?.length > 0 ? (
                    <>{channelsInvited.length}</>
                  ) : (
                    0
                  )}
                </span>
                <div className="flex gap-1 items-center">
                  <span className="text-xl">Invited Channels</span>
                  <MailCheck size={25} />
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center  hover:bg-gray-100 transition duration-300 ease-in-out">
              <span className="text-4xl font-bold">
                {channelsInvited?.length > 0 ? (
                  <>{channelsInvited.length}</>
                ) : (
                  0
                )}
              </span>
              <div className="flex gap-1 items-center">
                <span className="text-xl">Invited Channels</span>
                <MailCheck size={25} />
              </div>{" "}
            </div>
          )}
        </section>
      </div>
      <div className="pb-8 pt-4">
        <section className="flex flex-col pb-6 pt-10">
          <span className="text-md md:text-xl text-gray-700 font-medium">
            Map
          </span>
          <h2 className="text-2xl  md:text-4xl text-gray-700 font-medium">
            Channel Ubications
          </h2>
        </section>
        <div className="flex justify-center bg-white rounded-lg shadow-lg p-2 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
          <div className="w-full h-[40vh] md:h-[700px] bg-sky-100">
            <Map
              // channels={
              //   (role === "superUser" || role === "advancedUser")
              //     ? channels
              //     : channelsInvited
              // }
              channels={
                role === "superUser"
                  ? channelsPlatform
                  : role === "advancedUser"
                  ? channels
                  : channelsInvited
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
