"use client";

import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AuthService from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignoutPage() {
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleLogin = (values) => {
    /*AuthService.login(values.email_or_username, values.password).then(
            (data) => {
                console.log(data);
                console.log("Login successful");
                router.push("/dashboard");
            }
        ).catch(
            (error) => {
                const errorMessage = error.response.data.error;
                console.log(errorMessage);
                setError(errorMessage);
            }
        );*/
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create an account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              
                        
            <form className="space-y-4 md:space-y-6" action="#">
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Username
                    </label>
                    <div className="mt-2">
                        <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="johndoe"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div className="mt-2">
                        <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="john"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Last Name
                    </label>
                    <div className="mt-2">
                        <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="john"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Email
                    </label>
                    <div className="mt-2">
                        <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="john@doe.com"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <div className="mt-2">
                        <input
                        id="email_or_username"
                        name="email_or_username"
                        type="text"
                        placeholder="john@doe.com"
                        //autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                {/* <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Confirm password
                    </label>
                    <div className="mt-2">
                        <input
                            type="password"
                            name="confirm-password"
                            placeholder="••••••••"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div> */}
                <div className="flex items-start">
                <div className="text-sm">
                    <label for="terms" className="block text-sm font-medium text-gray-900">
                      Super User
                    </label>
                  </div>
                  <div className="ml-3 flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-sky-600"
                      required=""
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create an account
                </button>
              </form>
            </div>
        </div>
    </>
  );
}
