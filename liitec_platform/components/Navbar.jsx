"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dropdown } from "flowbite-react";
import Image from "next/image";

export default function Navbar() {
  const path = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const { data: session } = useSession();

  //console.log("la session NAVBAR : ",session);

  const letterUsername =
    session?.user?.username?.charAt(0).toUpperCase() || "U";
  const usernameUpperCase =
    letterUsername + session?.user?.username?.slice(1) || "Usuario";
  const roleMappings = {
    readUser: "Read Only",
    advancedUser: "Advanced User",
    superUser: "Super User",
  };
  const userRole = roleMappings[session?.user?.apiKey?.type] || "Read Only";
  const userEmail = session?.user?.email || "user@dom.com";

  return (
    <nav className="bg-white border border-gray-200">
      <div className="max-w-[85rem] w-full mx-auto flex flex-wrap items-center justify-between  p-4">
        <Link
          href="/dashboard"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="col-md-12">
            <Image
              src="/LIITEC_LOGO.svg"
              alt="Liitec Logo"
              width={50}
              height={50}
            />
          </div>

          <span className="self-center text-gray-600 text-xl md:text-2xl font-semibold whitespace-nowrap ">
            LIITEC DATA
          </span>
        </Link>
        <div className="flex gap-2">
          <button
            type="button"
            className="md:hidden hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-100 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className={`
            ${menuOpen ? "hidden" : ""} flex-shrink-0 w-4 h-4`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <svg
              className={`${
                !menuOpen ? "hidden" : ""
              } hs-collapse-open:block flex-shrink-0 w-4 h-4`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          <div>
            <Dropdown
              label="Dropdown"
              placement="bottom"
              renderTrigger={() => (
                <span className="bg-sky-700 rounded-full text-white flex items-center py-2 px-4 text-gray-900 rounded md:hidden md:bg-transparent md:text-blue-700 md:p-0">
                  {session?.user ? (
                    <>{letterUsername}</>
                  ) : (
                    <>{letterUsername}</>
                  )}
                  <svg
                    className=" hidden sm:block w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </span>
              )}
            >
              <Dropdown.Header>
                <span className="block text-sm">{userRole}</span>
                <span className="block truncate text-sm font-medium">
                  {userEmail}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link
                  href="/profile"
                  className="block w-full flex rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  Profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
        >
          <ul className="flex md:items-center flex-col font-medium pt-4 md:p-0  text-base rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                href="/dashboard"
                className={`
                ${
                  path === "/"
                    ? "bg-sky-100 md:bg-transparent md:border-b-2 md:border-sky-600 md:text-sky-600"
                    : ""
                }
                block py-2 px-2 rounded-md md:rounded-none text-gray-900 md:hover:bg-transparent md:border-0 md:hover:text-sky-600 md:hover:border-b-2 md:hover:border-b-sky-600 md:p-0`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/public-channels"
                className={`
                ${
                  path === "/public-channels"
                    ? "bg-sky-100 md:bg-transparent md:border-b-2 md:border-sky-600 md:text-sky-600"
                    : ""
                }
                block py-2 px-2 rounded-md md:rounded-none text-gray-900 md:hover:bg-transparent md:border-0 md:hover:text-sky-600 md:hover:border-b-2 md:hover:border-b-sky-600 md:p-0`}
              >
                Public Channels
              </Link>
            </li>
            <li>
              <Link
                href="channels"
                className={`
                ${
                  path === "/channels"
                    ? "bg-sky-100 md:bg-transparent md:border-b-2 md:border-sky-600 md:text-sky-600"
                    : ""
                }
                block py-2 px-2 rounded-md md:rounded-none text-gray-900 md:hover:bg-transparent md:border-0 md:hover:text-sky-600 md:hover:border-b-2 md:hover:border-b-sky-600 md:p-0`}
              >
                My Channels
              </Link>
            </li>
            <li>
              <Link
                href="support"
                className={`
                ${
                  path === "/support"
                    ? "bg-sky-100 md:bg-transparent md:border-b-2 md:border-sky-600 md:text-sky-600"
                    : ""
                }
                block py-2 px-2 rounded-md md:rounded-none text-gray-900 md:hover:bg-transparent md:border-0 md:hover:text-sky-600 md:hover:border-b-2 md:hover:border-b-sky-600 md:p-0`}
              >
                Support
              </Link>
            </li>
            {userRole === "Super User" ? (
              <li>
                <Link
                  href="admin"
                  className={`
                ${
                  path === "/admin"
                    ? "bg-sky-100 md:bg-transparent md:border-b-2 md:border-sky-600 md:text-sky-600"
                    : ""
                }
                block py-2 px-2 rounded-md md:rounded-none text-gray-900 md:hover:bg-transparent md:border-0 md:hover:text-sky-600 md:hover:border-b-2 md:hover:border-b-sky-600 md:p-0`}
                >
                  Administrator
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
        <div
          className={`
            hidden md:block
        `}
        >
          <Dropdown
            label="Dropdown"
            placement="bottom"
            renderTrigger={() => (
              <span className="bg-sky-700 rounded-full text-white flex items-center py-2 px-4 text-gray-900 rounded">
                {session?.user ? <>{usernameUpperCase}</> : <>{"Usuario"}</>}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </span>
            )}
          >
            <Dropdown.Header>
              <span className="block text-sm">{userRole}</span>
              <span className="block truncate text-sm font-medium ">
                {userEmail}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link
                href="/profile"
                className="block w-full flex py-2 px-3 text-gray-900 rounded  md:hover:bg-transparent md:border-0 md:hover:text-sky-600 md:p-0"
              >
                Profile
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}
