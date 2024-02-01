"use client";
import { Button } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MyInput } from "../MyInput";

import { Eye, EyeOff } from "lucide-react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/user.actions";

export default function UserSettingsAdmForm({ user, onClose }) {
  const userId = user?._id ?? "";
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  const router = useRouter();

  const handleSubmit = (userId, values) => {

    //if password and repeatPassword is empty, remove it from the object
    if (!values.password && !values.repeatPassword) {
        delete values.password;
        delete values.repeatPassword;
    }

    updateUser(userId, values)
      .then((response) => {
        router.push(`/admin/users`);
        onClose();
        //redirect(`/channels`);
      })
      .catch((error) => {
        console.log("Error al actualizar el usuario:", error);
        setError(error.message);
      });
  };

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
    <div className="">
      <Formik
        initialValues={{
          name: user?.name ?? "",
          lastName: user?.lastName ?? "",
          password: "",
          repeatPassword: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "First Name is required";
          } else if (values.name.length > 39) {
            errors.name = "First Name must be at most 30 characters long";
          } else if (!/^[a-zA-Z0-9\s]*$/.test(values.name)) {
            errors.name =
              "First Name must only contain letters, numbers, and spaces";
          }

          if (!values.lastName) {
            errors.lastName = "Last name is required";
          } else if (values.lastName.length > 30) {
            errors.lastName = "Last name must be at most 30 characters long";
          } else if (!/^[a-zA-Z0-9\s]*$/.test(values.lastName)) {
            errors.lastName =
              "Last name must only contain letters, numbers, and spaces";
          }

          if (values.password || values.repeatPassword) {
            // Al menos uno de los campos tiene un valor, validar ambos
            if (!values.password) {
              errors.password = "Password is required";
            } else if (
              !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                values.password
              )
            ) {
              errors.password =
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special case character";
            } else if (values.password.length > 50) {
              errors.password = "Password must be at most 50 characters long";
            }

            if (!values.repeatPassword) {
              errors.repeatPassword = "Repeat password is required";
            } else if (values.repeatPassword !== values.password) {
              errors.repeatPassword = "Passwords must match";
            } else if (
              !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                values.repeatPassword
              )
            ) {
              errors.repeatPassword =
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special case character";
            } else if (values.repeatPassword.length > 50) {
              errors.repeatPassword =
                "Password must be at most 50 characters long";
            }
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
              <div className="flex flex-col gap-4">
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
                <div className="">
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

                <div className="">
                  <Field
                    id="password"
                    name="password"
                    label="Enter New Password"
                    placeholder="Password"
                    component={MyInput}
                    type={isVisible ? "text" : "password"}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeOff className="text-default-400" size={18} />
                        ) : (
                          <Eye className="text-default-400" size={18} />
                        )}
                      </button>
                    }
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm font-semibold mt-1"
                  />
                </div>
                <div className="">
                  <Field
                    id="repeatPassword"
                    name="repeatPassword"
                    label="Repeat Password"
                    placeholder="Enter New Password Again"
                    component={MyInput}
                    type={isVisible2 ? "text" : "password"}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility2}
                      >
                        {isVisible2 ? (
                          <EyeOff className="text-default-400" size={18} />
                        ) : (
                          <Eye className="text-default-400" size={18} />
                        )}
                      </button>
                    }
                    value={values.repeatPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="repeatPassword"
                    component="div"
                    className="text-red-500 text-sm font-semibold mt-1"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end mb-4 mt-8 w-full">
              <Button color="danger" variant="light" onClick={() => onClose()}>
                Cancel
              </Button>
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
