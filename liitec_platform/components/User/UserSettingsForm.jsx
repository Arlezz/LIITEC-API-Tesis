"use client";
import { Button } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MyInput } from "../MyInput";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/user.actions";

export default function UserSettingsForm({ user }) {

  const userId = user?._id ?? "";
  const [error, setError] = useState(null);
  const router = useRouter();

  function handleSubmit(userId, values) {
    updateUser(userId, values)
      .then((response) => {
        router.push(`/profile`);
        //redirect(`/channels`);
      })
      .catch((error) => {
        console.log("Error al actualizar el usuario:", error);
        setError(error.message);
      });
  }

  useEffect(() => {
    let timeout;

    const hideError = () => {
      setError(null);
    };

    if (error) {
      timeout = setTimeout(hideError, 5000);
    }

    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <Formik
        initialValues={{
          name: user?.name ?? "",
          lastName: user?.lastName ?? ""
        }}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "First Name is required";
          } else if (values.name.length > 39) {
            errors.name = "First Name must be at most 30 characters long";
          } else if (!/^[a-zA-Z0-9\s]*$/.test(values.name)) {
            errors.name = "First Name must only contain letters, numbers, and spaces";
          }

          if (!values.lastName) {
            errors.lastName = "Last name is required";
          } else if (values.lastName.length > 30) {
            errors.lastName = "Last name must be at most 30 characters long";
          } else if (!/^[a-zA-Z0-9\s]*$/.test(values.lastName)) {
            errors.lastName = "Last name must only contain letters, numbers, and spaces";
          }

          return errors;
        }}
        onSubmit={(values) => {
          handleSubmit(userId, values);
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-1  gap-4">
              {error && (
                <p className="bg-red-500 text-white p-3 text-sm font-semibold rounded-lg">
                  {error}
                </p>
              )}
              <div className="">
                <Field
                  id="name"
                  name="name"
                  label="First Name"
                  placeholder="Jhon"
                  component={MyInput}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm font-semibold mt-1"
                />
              </div>
              <div className="mt-2">
                <Field
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  component={MyInput}
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm font-semibold mt-1"
                />
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" color="primary">
                Save Changes
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
