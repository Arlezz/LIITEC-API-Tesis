import GeneralService from "@/services/general.services";
import UserService from "@/services/user.services";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import AuthService from "@/services/auth.service";

import Map from "@/components/Map";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  var users = null;
  var keys = null;

  if (session?.user?.apiKey?.type === "superUser") {
    users = await UserService.getUsers();
    keys = await AuthService.getKeys();
  }

  const user = await UserService.getUser(session.user._id);

  const guests = await GeneralService.getGuests(user._id);

  const channels = await GeneralService.getChannels(user._id);

  const devicesPromises = channels.map(async (channel) => {
    const devices = await GeneralService.getDevices(channel.channelId);
    return devices;
  });

  const devices = (await Promise.all(devicesPromises)).flat();

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
                    {users?.length > 0 ? <>{users.length}</> : 0}
                  </span>
                  <span className="text-xl">Users</span>
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
              <span className="text-xl">Channels</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
              <span className="text-4xl font-bold">
                {devices?.length > 0 ? <>{devices.length}</> : 0}
              </span>
              <span className="text-xl">Devices</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
              <span className="text-4xl font-bold">
                {variables?.length > 0 ? <>{variables.length}</> : 0}
              </span>
              <span className="text-xl">Variables</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
              <span className="text-4xl font-bold">
                {user?.acls ? <>{user.acls.length}</> : 0}
              </span>
              <span className="text-xl">Topics</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
              <span className="text-4xl font-bold">
                {guests?.length > 0 ? <>{guests.length}</> : 0}
              </span>
              <span className="text-xl">Guests</span>
            </div>
            <div className="flex flex-col w-200 h-200 items-center justify-center bg-white rounded-lg shadow-lg p-0 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
              {/* <Map /> */}
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
          <div className="flex justify-center bg-white rounded-lg shadow-lg p-4 md:p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
            <div className="w-full h-[40vh] md:h-[70vh] bg-sky-100">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
