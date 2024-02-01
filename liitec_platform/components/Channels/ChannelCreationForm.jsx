"use client";
import { Button } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MyInput } from "../MyInput";
import { MyTextArea } from "../MyTextArea";
import { createChannel } from "@/lib/general.actions";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChannelCreationForm({ session }) {


  const [error, setError] = useState(null);
  const router = useRouter();

  function handleSubmit(userId, values) {
    createChannel(userId, values)
      .then((response) => {
        router.push(`/channels`);
      })
      .catch((error) => {
        console.log("Error al crear el canal:", error.message);
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
          name: "",
          description: "",
          project: "",
          latitude: "",
          longitude: "",
        }}
        validate={(values) => {
          const errors = {};

          if (values.name && values.name.length < 3) {
            errors.name = "Name must be at least 3 characters long";
          } else if (values.name && values.name.length > 25) {
            errors.name = "Name must be at most 25 characters long";
          } else if (values.name && !/^[a-zA-Z0-9\s]+$/.test(values.name)) {
            errors.name = "Name must only contain letters and spaces";
          }
          

          if (values.description && values.description.length < 3) {
            errors.description = "Description must be at least 3 characters long";
          } else if (values.description && values.description.length > 50) {
            errors.description = "Description must be at most 50 characters long";
          } else if (values.description && !/^[a-zA-Z0-9\s]+$/.test(values.description)) {
            errors.description = "Description must only contain letters and spaces";
          }
          

          if (values.project && values.project.length < 3) {
            errors.project = "Project must be at least 3 characters long";
          } else if (values.project && values.project.length > 25) {
            errors.project = "Project must be at most 25 characters long";
          } else if (values.project && !/^[a-zA-Z0-9\s]+$/.test(values.project)) {
            errors.project = "Project must only contain letters and spaces";
          }          

          if (
            (values.latitude && !values.longitude) ||
            (!values.latitude && values.longitude)
          ) {
            errors.latitude = "Both latitude and longitude are required";
            errors.longitude = "Both latitude and longitude are required";
          }

          if (values.latitude) {
            if (values.latitude.length > 25) {
              errors.latitude = "Latitude must be at most 25 characters long";
            } else if (
              !/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$/.test(
                values.latitude
              )
            ) {
              errors.latitude = "Incorrect latitude format";
            }
          }

          if (values.longitude) {
            if (values.longitude.length > 25) {
              errors.longitude = "Longitude must be at most 25 characters long";
            } else if (
              !/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$/.test(
                values.longitude
              )
            ) {
              errors.longitude = "Incorrect longitude format";
            }
          }

          return errors;
        }}
        onSubmit={(values) => {
          handleSubmit(session.user._id, values);
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
                  label="Name (Optional)"
                  placeholder="Name of the channel"
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
                  id="description"
                  name="description"
                  label="Description (Optional)"
                  placeholder="Description of the channel"
                  component={MyTextArea}
                  value={values.descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm font-semibold mt-1"
                />
              </div>
              <div className="mt-2">
                <Field
                  id="project"
                  name="project"
                  label="Project (Optional)"
                  placeholder="Project of the channel"
                  component={MyInput}
                  value={values.project}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="project"
                  component="div"
                  className="text-red-500 text-sm font-semibold mt-1"
                />
              </div>
              <div className="mt-2">
                <Field
                  id="latitude"
                  name="latitude"
                  label="Latitude (Optional)"
                  placeholder="Latitude of the channel"
                  component={MyInput}
                  value={values.latitude}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="latitude"
                  component="div"
                  className="text-red-500 text-sm font-semibold mt-1"
                />
              </div>
              <div className="mt-2">
                <Field
                  id="longitude"
                  name="longitude"
                  label="Longitude (Optional)"
                  placeholder="Longitude of the channel"
                  component={MyInput}
                  value={values.longitude}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="longitude"
                  component="div"
                  className="text-red-500 text-sm font-semibold mt-1"
                />
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" color="primary">
                Create Channel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
