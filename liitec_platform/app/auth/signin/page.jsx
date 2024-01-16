"use client";

import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SigninPage() {
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleLogin = async (values) => {
    const res = await signIn("credentials", {
      username_or_email: values.username_or_email,
      password: values.password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className=" h-full">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-14 w-auto"
            src="/LIITEC_LOGO.svg"
            alt="Liitec Logo"
            width={1000}
            height={1000}
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              username_or_email: "",
              password: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.username_or_email) {
                errors.username_or_email = "Username or email is required";
              } else if (/\@/.test(values.username_or_email)) {
                // Validate email address
                if (
                  !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    values.username_or_email
                  )
                ) {
                  errors.username_or_email = "Invalid email address";
                }
              } else {
                // Validate username
                if (!/^[a-zA-Z0-9]+$/.test(values.username_or_email)) {
                  errors.username_or_email = "Invalid username";
                }
              }

              if (!values.password) {
                errors.password = "Password is required";
              }

              return errors;
            }}
            onSubmit={(values) => {
              handleLogin(values);
            }}
          >
            {({}) => (
              <Form className="space-y-6">
                {error && (
                  <p className="bg-red-500 text-white p-3 text-sm font-semibold rounded">
                    {error}
                  </p>
                )}
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Username or Email
                  </label>
                  <div className="mt-2">
                    <Field
                      id="username_or_email"
                      name="username_or_email"
                      type="text"
                      placeholder="john@doe.com"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="username_or_email"
                      component="div"
                      className="text-red-500 text-sm font-semibold mt-1"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2 relative">
                    <Field
                      id="hs-toggle-password"
                      type="password"
                      name="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      data-hs-toggle-password='{
                                        "target": "#hs-toggle-password"
                                    }'
                      className="absolute top-0 end-0 p-3 rounded-e-md"
                    >
                      <svg
                        className="flex-shrink-0 w-3.5 h-3.5 text-gray-400"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          className="hs-password-active:hidden"
                          d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                        />
                        <path
                          className="hs-password-active:hidden"
                          d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                        />
                        <path
                          className="hs-password-active:hidden"
                          d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                        />
                        <line
                          className="hs-password-active:hidden"
                          x1="2"
                          x2="22"
                          y1="2"
                          y2="22"
                        />
                        <path
                          className="hidden hs-password-active:block"
                          d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                        />
                        <circle
                          className="hidden hs-password-active:block"
                          cx="12"
                          cy="12"
                          r="3"
                        />
                      </svg>
                    </button>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm font-semibold mt-1"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-sky-600 hover:text-sky-500"
            >
              Contact us to get started
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
