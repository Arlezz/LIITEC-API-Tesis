import GeneralService from "@/services/general.services";
import UserService from "@/services/user.services";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import AuthService from "@/services/auth.service";
import { getUser } from "@/lib/user.actions";
import { getMyChannelsDasboard, getMyDevicesDashboard, getGuestsDashboard } from "@/lib/general.actions";
import { getUsersPlatform, getKeys, getChannelsPlatform, getDevicesPlatform } from "@/lib/auth.actions";

import Map from "@/components/Map";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const role = session?.user?.apiKey?.type;

  var usersPlatform = null;
  var keys = null;
  var channelsPlatform = null;
  var devicesPlatform = null;

  if (role === "superUser") {
    usersPlatform = await getUsersPlatform();
    keys = await getKeys();
    channelsPlatform = await getChannelsPlatform();
    devicesPlatform = await getDevicesPlatform();
  }

  const user = await getUser(session.user._id);

  const guests = await getGuestsDashboard(user._id);

  const channels = await getMyChannelsDasboard(user._id);
  

  const devices = (await Promise.all(channels.map(async (channel) => await getMyDevicesDashboard(channel.channelId)))).flat();

  var variables = [];

  if (devices.length > 0) {
    devices.forEach((device) => {
      device.measures.forEach((measure) => {
        variables.push(measure.variable);
      });
    });
  }

  return (
    <div className="max-w-[85rem] w-full mx-auto p-4 sm:flex sm:items-center sm:justify-between">
      <div className="w-full">
        {/* Title section */}
        <section className="flex flex-col pb-8">
          <span className="text-md md:text-xl text-gray-700 font-medium">
            Dashboard
          </span>
          <h1 className="text-2xl  md:text-4xl text-gray-700 font-medium">
            Overview
          </h1>
        </section>
        <section className="">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {session?.user?.apiKey?.type === "superUser" ? (
              <>
                <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
                  <span className="text-4xl font-bold">
                    {usersPlatform?.length > 0 ? <>{usersPlatform.length}</> : 0}
                  </span>
                  <span className="text-xl">Users</span>
                  <span className="text-gray-400 text-md font-medium">
                    In the platform
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
                  <span className="text-4xl font-bold">
                    {channelsPlatform?.length > 0 ? <>{channelsPlatform.length}</> : 0}
                  </span>
                  <span className="text-xl">Channels</span>
                  <span className="text-gray-400 text-md font-medium">
                    In the platform
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
                  <span className="text-4xl font-bold">
                    {devicesPlatform?.length > 0 ? <>{devicesPlatform.length}</> : 0}
                  </span>
                  <span className="text-xl">Devices</span>
                  <span className="text-gray-400 text-md font-medium">
                    In the platform
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
                  <span className="text-4xl font-bold">
                    {keys?.length > 0 ? <>{keys.length}</> : 0}
                  </span>
                  <span className="text-xl">Keys</span>
                  <span className="text-gray-400 text-md font-medium">
                    In the platform
                  </span>
                </div>
              </>
            ) : null}

            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
              <span className="text-4xl font-bold">
                {channels?.length > 0 ? <>{channels.length}</> : 0}
              </span>
              <span className="text-xl">My Channels</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
              <span className="text-4xl font-bold">
                {devices?.length > 0 ? <>{devices.length}</> : 0}
              </span>
              <span className="text-xl">My Devices</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
              <span className="text-4xl font-bold">
                {variables?.length > 0 ? <>{variables.length}</> : 0}
              </span>
              <span className="text-xl">My Variables</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
              <span className="text-4xl font-bold">
                {user?.acls ? <>{user.acls.length}</> : 0}
              </span>
              <span className="text-xl">My Topics</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
              <span className="text-4xl font-bold">
                {guests?.length > 0 ? <>{guests.length}</> : 0}
              </span>
              <span className="text-xl">Guests</span>
            </div>
          </div>
        </section>
        <div className="py-8 ">
          <section className="flex flex-col pb-8">
            <span className="text-md md:text-xl text-gray-700 font-medium">
              Map
            </span>
            <h2 className="text-2xl  md:text-4xl text-gray-700 font-medium">
              Channel Ubications
            </h2>
          </section>
          <div className="flex justify-center bg-white rounded-lg shadow-lg p-2 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
            <div className="w-full h-[40vh] md:h-[700px] bg-sky-100">
              <Map channels={role === "superUser"? channelsPlatform : channels}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
