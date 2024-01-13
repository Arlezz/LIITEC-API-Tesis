"use client";

import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AuthService from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleRegister = (values) => {
    console.log(values);
    AuthService.register(values.username, values.name, values.lastname, values.email, values.password, values.role, values.superuser).then(
        (response) => {
            console.log(response);
        },
        (error) => {
            console.log(error.response.data.error);
            setError(error.response.data.error);
        }
        );
    
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
          <Formik
            initialValues={{
                username: "",
                name: "",
                lastname: "",
                email: "",
                password: "",
                superuser: false,
            }}
            validate={(values) => {
              const errors = {};

                if (!values.username) {
                    errors.username = "Username is required";
                } else if (values.username.length < 3) {
                    errors.username = "Username must be at least 3 characters long";
                } else if (values.username.length > 25) {
                    errors.username = "Username must be at most 25 characters long";
                } else if (!/^[a-zA-Z0-9_]+$/.test(values.username)) {
                    errors.username = "Username must only contain letters, numbers and underscores";
                } else if (!/^[a-zA-Z]/.test(values.username)) {
                    errors.username = "Username must start with a letter";
                }

                if (!values.name) {
                    errors.name = "Name is required";
                } else if (values.name.length < 3) {
                    errors.name = "Name must be at least 3 characters long";
                } else if (values.name.length > 25) {
                    errors.name = "Name must be at most 25 characters long";
                } else if (!/^[a-zA-Z]+$/.test(values.name)) {
                    errors.name = "Name must only contain letters";
                } 

                if (!values.lastname) {
                    errors.lastname = "Last name is required";
                } else if (values.lastname.length < 3) {
                    errors.lastname = "Last name must be at least 3 characters long";
                } else if (values.lastname.length > 25) {
                    errors.lastname = "Last name must be at most 25 characters long";
                } else if (!/^[a-zA-Z]+$/.test(values.lastname)) {
                    errors.lastname = "Last name must only contain letters";
                }


                if (!values.email) {
                    errors.email = "Username or email is required";
                } else if (!(/\@/.test(values.email))) {
                    errors.email = "Invalid email address";
                } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email))) {
                    errors.email = "Invalid email address";
                } 


                if (!values.password) {
                    errors.password = "Password is required";
                } else if (values.password.length < 8) {
                    errors.password = "Password must be at least 8 characters long";
                } else if (values.password.length > 20) {
                    errors.password = "Password must be at most 20 characters long";
                }


              return errors;
            }}
            onSubmit={(values) => {
                handleRegister(values);
            }}
          >
            {({}) => (
              <Form className="space-y-4 md:space-y-6" action="#">
                {error && (
                    <p className="bg-red-500 text-white p-3 text-sm font-semibold rounded">
                        {error}
                    </p>
                )}
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Username
                  </label>
                  <div className="mt-2">
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      placeholder="johndoe"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm font-semibold mt-1" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm font-semibold mt-1" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Last Name
                  </label>
                  <div className="mt-2">
                    <Field
                      id="lastname"
                      name="lastname"
                      type="text"
                      placeholder="Doe"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm font-semibold mt-1" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@doe.com"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm font-semibold mt-1" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="********"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm font-semibold mt-1" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    User Role
                  </label>
                  <div className="mt-2">
                    <Field 
                        id="role"
                        as="select"
                        name="role"
                        className="appearance-none py-1.5 pe-9 block w-full border-0 rounded-md text-sm shadow-sm ring-1 ring-inset ring-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
                            <option 
                                value="readUser"
                            >
                                Read Only
                            </option>
                            <option 
                                value="advancedUser"
                            >
                                Advanced User
                            </option>
                            <option 
                                value="superUser"
                            >
                                Super User
                            </option>
                    </Field>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm font-semibold mt-1" />
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-sm">
                    <label className="block text-sm font-medium text-gray-900">
                      MQTT Super User
                    </label>
                  </div>
                  <div className="ml-3 flex items-center h-5">
                    <Field
                      id="superuser"
                      name="superuser"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-sky-600"
                    />
                  </div>
                    
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create an account
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
