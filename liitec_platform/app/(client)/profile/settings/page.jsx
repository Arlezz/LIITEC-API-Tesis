import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import UserSettingsForm from "@/components/User/UserSettingsForm";
import UserUpdatePassForm from "@/components/User/UserUpdatePassForm";
import { getUser } from "@/lib/user.actions";
import { Divider } from "@nextui-org/react";


export default async function ProfileSettingsPage() {
  const session = await getServerSession(authOptions);


  const user = await getUser(session.user._id);

  return (
    <>
      <section className="flex flex-col">
        <h2 className="text-2xl pb-8 md:text-3xl text-gray-700 font-medium">
          Account Details
        </h2>
        <UserSettingsForm user={user} />
      </section>
      <Divider className="my-10 w-full md:w-1/2"/>
      <section className="flex flex-col">
        <h2 className="text-2xl pb-8 md:text-3xl text-gray-700 font-medium">
          Reset Password
        </h2>
        <UserUpdatePassForm />
      </section>
    </>
  );
}
