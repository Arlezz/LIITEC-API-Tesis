"use client";

import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AuthService from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SigninPage() {

    const [error, setError] = useState(null);

    const router = useRouter();

    const handleLogin = (values) => {
        AuthService.login(values.email_or_username, values.password).then(
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
        );
    };

  return (
    <>
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
                        email_or_username: "",
                        password: "",
                    }}
                    validate={(values) => {
                        const errors = {};

                        if (!values.email_or_username) {
                            errors.email_or_username = "Username or email is required";
                        } else if (/\@/.test(values.email_or_username)) {
                            // Validate email address
                            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email_or_username))) {
                                errors.email_or_username = "Invalid email address";
                            }
                        } else {
                            // Validate username
                            if (!(/^[a-zA-Z0-9]+$/.test(values.email_or_username))) {
                                errors.email_or_username = "Invalid username";
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
                    {({  }) => (
                        
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
                                        id="email_or_username"
                                        name="email_or_username"
                                        type="text"
                                        placeholder="john@doe.com"
                                        //autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                    />
                                    <ErrorMessage name="email_or_username" component="div" className="text-red-500 text-sm font-semibold mt-1" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    {/* <div className="text-sm">
                                        <a
                                            href="#"
                                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                                        >
                                            Forgot password?
                                        </a>
                                    </div> */}
                                </div>
                                <div className="mt-2">
                                    <Field
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="********"
                                        //autoComplete="current-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm font-semibold mt-1" />
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
    </>
  );
}
