"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const path = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: session } = useSession();
  //console.log(session);

  return (
    <>
      {session?.user ? (
        <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4">
          <nav
            className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
            aria-label="Global"
          >
            <div className="flex items-center justify-between">
              <Link
                className="inline-flex items-center gap-x-2 text-2xl font-semibold"
                href="/"
              >
                <Image
                  src="/LIITEC_LOGO.svg"
                  alt="Liitec Logo"
                  width={60}
                  height={60}
                />
                LITEC DATA
              </Link>
              <div className="sm:hidden">
                <button
                  type="button"
                  className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  data-hs-collapse="#navbar-with-mega-menu"
                  aria-controls="navbar-with-mega-menu"
                  aria-label="Toggle navigation"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <svg
                    className={` ${menuOpen? "hidden" : "" } flex-shrink-0 w-4 h-4`}
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
                    className={`${!menuOpen? "hidden" : "" } hs-collapse-open:block flex-shrink-0 w-4 h-4`}
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
              </div>
            </div>
            <div
              id="navbar-with-mega-menu"
              className={`hs-collapse ${!menuOpen? "hidden" : "" }  text-base transition-all duration-300 basis-auto grow sm:block`}
            >
              <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                <div>
                  <Link
                    className={`font-medium text-gray-600 hover:border-b-2 hover:border-sky-500
                    ${path === "/" ? "border-b-2 border-sky-500" : ""}
                  `}
                    href="/"
                  >
                    Inicio
                  </Link>
                </div>
                <div>
                  <Link
                    className={`font-medium text-gray-600 hover:border-b-2 hover:border-sky-500
                    ${
                      path === "/public-channels"
                        ? "border-b-2 border-sky-500"
                        : ""
                    }
                  `}
                    href="/public-channels"
                  >
                    Public Channels
                  </Link>
                </div>
                <div>
                  <Link
                    className={`font-medium text-gray-600 hover:border-b-2 hover:border-sky-500
                    ${path === "/channels" ? "border-b-2 border-sky-500" : ""}`}
                    href="/channels"
                    aria-current="page"
                  >
                    My Channels
                  </Link>
                </div>
                <div>
                  <Link
                    className={`font-medium text-gray-600 hover:border-b-2 hover:border-sky-500
                    ${path === "/support" ? "border-b-2 border-sky-500" : ""}
                    `}
                    href="/support"
                  >
                    Support
                  </Link>
                </div>

                <div className=" rounded">
                  <button
                    id="hs-mega-menu-basic-dr"
                    type="button"
                    className="flex items-center w-full text-sky-600 hover:text-sky-400 font-medium relative"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {session.user.name}
                    <svg
                      className="ms-1 flex-shrink-0 w-4 h-4"
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
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <div className={` ${!dropdownOpen? "hidden ":"opacity-100"} text-base transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] opacity-0 sm:w-48 z-10 bg-white sm:shadow-md rounded-lg p-2 before:absolute top-full sm:border before:-top-5 before:start-0 before:w-full before:h-5`}>
                    <Link
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-sky-600"
                      href="/profile"
                    >
                      Profile
                    </Link>
                    <a
                      onClick={() => signOut()}
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-sky-600"
                    >
                      Sign Out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      ) : (
        <></>
      )}
    </>
  );
}
