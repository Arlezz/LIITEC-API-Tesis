"use client";
import { Button } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MyInput } from "../MyInput";
import { Eye, EyeOff } from "lucide-react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/user.actions";
import { useSession } from "next-auth/react";

export default function UserUpdatePassForm() {
  const { data: session, update } = useSession();


  const userId = session?.user._id ?? "";
  const [error, setError] = useState(null);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

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
          password: "",
          repeatPassword: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.password) {
            errors.password = "Password is required";
          } else if (
            !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              values.password
            ))
          ) {
            errors.password =
              "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character";
          } else if (values.password.length > 50) {
            errors.password = "Password must be at most 50 characters long";
          }

          if (!values.repeatPassword) {
            errors.repeatPassword = "Repeat password is required";
          } else if (values.repeatPassword !== values.password) {
            errors.repeatPassword = "Passwords must match";
          } else if (!(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              values.repeatPassword
            ))
          ) {
            errors.repeatPassword =
              "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character";
          } else if (values.repeatPassword.length > 50) {
            errors.repeatPassword =
              "Password must be at most 50 characters long";
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
              <div className="mt-2">
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
