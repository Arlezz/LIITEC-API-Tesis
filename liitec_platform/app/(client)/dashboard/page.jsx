"use client";

import GeneralService from "@/services/general.services";
import UserService from "@/services/user.services";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function DashboardPage() {
  const { data: session } = useSession();

  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [userRol, setUserRol] = useState(null); //
  const [channels, setChannels] = useState(null);
  const [devices, setDevices] = useState(null);

  async function getUsers() {
    try {
      const users = await UserService.getUsers();
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUser() {
    try {
      const user = await UserService.getUser(session.user._id);
      setUser(user);
      //await getChannels();
    } catch (error) {
      console.log(error);
    }
  }

  async function getChannels() {
    try {
      const channels = await GeneralService.getChannels(user._id);
      setChannels(channels);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDevices() {
    try {
      const devicesPromises = channels.results.map(async (channel) => {
        const devices = await GeneralService.getDevices(channel.channelId);
        return devices.results; // Devuelve el array de objetos 'devices' en lugar de 'devices.count'
      });

      const devicesArrays = await Promise.all(devicesPromises);
      const allDevices = devicesArrays.flat(); // Concatena los arrays de dispositivos en uno solo

      setDevices(allDevices);
    } catch (error) {
      console.log(error);
    }
  }
  //getUser();

  useEffect(() => {
    if (session) {
        console.log("Efecto 1 ejecutado");

      setUserRol(session?.user?.apiKey?.type);
      getUser();

      if (session?.user?.apiKey?.type === "superUser") {
        getUsers();
      }
    } else {
      console.log("Efecto 1 no ejecutado");
    }
  }, [session]); // Dependencia actualizada

  useEffect(() => {
    if (user?._id) {
      getChannels();
    }
  }, [user]); // Dependencia actualizada

  useEffect(() => {
    if (channels?.count) {
      getDevices();
    }
  }, [channels]); // Dependencia actualizada

  console.log("session: ", session);
  console.log("user: ", user);
  console.log("channels: ", channels);
  console.log("devices: ", devices);

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
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {session?.user?.apiKey?.type === "superUser" ? (
              <>
                <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
                  <span className="text-4xl font-bold">
                    {users?.count ? <>{users.count}</> : <>{"0"}</>}
                  </span>
                  <span className="text-xl">Users</span>
                  <span className="text-gray-400 text-md font-medium">In the platform</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
                  <span className="text-4xl font-bold">20</span>
                  <span className="text-xl">Keys</span>
                  <span className="text-gray-400 text-md font-medium">In the platform</span>
                </div>
              </>
            ) : null}

            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
              <span className="text-4xl font-bold">
                {channels?.count ? <>{channels.count}</> : <>{"0"}</>}
              </span>
              <span className="text-xl">Channels</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
              <span className="text-4xl font-bold">
                {devices ? <>{devices.length}</> : <>{"0"}</>}
              </span>
              <span className="text-xl">Devices</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
              <span className="text-4xl font-bold">2</span>
              <span className="text-xl">Variables</span>
            </div>

            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
              <span className="text-4xl font-bold">
                {user?.acls ? <>{user.acls.length}</> : <>{"0"}</>}
              </span>
              <span className="text-xl">Topics</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
              <span className="text-4xl font-bold">2</span>
              <span className="text-xl">Guests</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
              UBICATIONS
              <br />
              MAP
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
