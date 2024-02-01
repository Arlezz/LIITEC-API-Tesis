import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getUser } from "@/lib/user.actions";
import { Chip, Snippet } from "@nextui-org/react";
import { getFormattedDate } from "@/utils/dateFormatter";
import MyCopyButton from "@/components/MyCopyButton";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  const role = session?.user?.apiKey?.type;

  const user = await getUser(session.user._id);


  return (
    <>
      <div>
        <div className="px-4 mb-10 sm:px-0">
          <h2 className="text-2xl md:text-3xl text-gray-700 font-medium">
            User Information
          </h2>
          <p className="mt-1 max-w-2xl  leading-6 text-gray-500">
            Personal details.
          </p>
        </div>
        <div className=" border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className=" font-bold leading-6 text-gray-900">User Id</dt>
              <dd className="mt-1  leading-6  text-gray-700 sm:col-span-2 sm:mt-0">
                <MyCopyButton label={user._id} herf={user._id} />
                {/* <Snippet symbol="" >{user._id}</Snippet> */}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className=" font-bold leading-6 text-gray-900">Username</dt>
              <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user?.username ?? "N/A"}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className=" font-bold leading-6 text-gray-900">Full name</dt>
              <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user?.name + " " + user?.lastName ?? "N/A"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className=" font-bold leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user?.email ?? "N/A"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className=" font-bold leading-6 text-gray-900">
                LIITEC Broker
              </dt>
              <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <Chip
                  className="capitalize"
                  color={user?.superuser ? "warning" : "success"}
                  size="sm"
                  variant="flat"
                >
                  {user?.superuser ? "Super User" : "Basic User"}
                </Chip>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className=" font-bold leading-6 text-gray-900">User Role</dt>
              <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <Chip
                  className="capitalize"
                  color={
                    role === "superUser"
                      ? "secondary"
                      : role === "advancedUser"
                      ? "warning"
                      : "success"
                  }
                  size="sm"
                  variant="flat"
                >
                  {role === "superUser"
                    ? "Admin"
                    : role === "advancedUser"
                    ? "Advanced User"
                    : "Basic User"}
                </Chip>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className=" font-bold leading-6 text-gray-900">Created</dt>
              <dd className="mt-2  text-gray-900 sm:col-span-2 sm:mt-0">
                {user?.createdOn != null
                  ? getFormattedDate(user.createdOn)
                  : "N/A"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
