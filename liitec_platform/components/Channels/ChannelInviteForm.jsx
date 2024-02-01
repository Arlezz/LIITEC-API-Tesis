"use client";
import { Button } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MyInput } from "../MyInput";
import { MyTextArea } from "../MyTextArea";
import { createGuest } from "@/lib/general.actions";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MyDatePicker } from "../MyDatePicker";

export default function ChannelInviteForm({ channel }) {
  const [error, setError] = useState(null);
  const router = useRouter();

  function handleSubmit(channelId, values) {

    createGuest(channelId, values)
      .then(() => {
        router.push(`/channels/${channelId}/guests`);
      })
      .catch((error) => {
        console.error(error);
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
          userId: "",
          expiration: new Date(),
        }}
        validate={(values) => {
          const errors = {};

          if (values.userId && values.userId.length < 3) {
            errors.userId = "User Id must be at least 3 characters long";
          } else if (values.userId && values.userId.length > 30) {
            errors.name = "User Id must be at most 30 characters long";
          }

          return errors;
        }}
        onSubmit={(values) => {
          handleSubmit(channel, values);
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-1  gap-4">
              {error && (
                <p className="bg-red-500 text-white p-3 text-sm font-semibold rounded-lg">
                  {error}
                </p>
              )}
              <div className="">
                <Field
                  id="userId"
                  name="userId"
                  label="User Id"
                  placeholder="Identifier of the user to invite"
                  component={MyInput}
                  value={values.userId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="userId"
                  component="div"
                  className="text-red-500 text-sm font-semibold mt-1"
                />
              </div>
              <div className="mt-2">
                <MyDatePicker
                  id="expiration"
                  name="expiration"
                  label="Deadline"
                  value={values.description}
                  onChange={setFieldValue}
                />
                <ErrorMessage
                  name="expiration"
                  component="div"
                  className="text-red-500 text-sm font-semibold mt-1"
                />
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" color="primary">
                Invite
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
