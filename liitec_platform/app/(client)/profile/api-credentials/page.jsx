import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SecretSection from "@/components/SecretSection";
import { Link } from "@nextui-org/react";
import { getServerSession } from "next-auth";

export default async function ApiCredentialsPage() {
    
  const session = await getServerSession(authOptions);
  const key = session?.user?.apiKey?.key;


  return (
    <>
      <div>
        <div className="px-4 mb-10 sm:px-0">
          <h1 className="text-2xl md:text-4xl text-gray-700 font-medium pt-4">
            Api Credentials
          </h1>
          <p className="mt-1 max-w-2xl  leading-6 text-gray-500">
            Use your API key to authenticate{" "}
            <Link
              isExternal
              showAnchorIcon
              href="http://localhost:8081/api/v1/docs/"
              className="font-bold text-sky-600"
            >
              LIITEC API
            </Link>
            requests.
          </p>
        </div>
        <div className=" border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 items-center">
              <dt className=" font-bold leading-6 text-gray-900">Api Key</dt>
              <dd className="mt-2">
              <SecretSection id={session.user._id} secret={key? key : "N/A"} />
              </dd>
            </div>
          </dl>
        </div>
        
      </div>
    </>
  );
}
