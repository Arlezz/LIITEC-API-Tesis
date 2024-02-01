"use client";
import { Button } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MyInput } from "../MyInput";
import { MyTextArea } from "../MyTextArea";
import { MySelect } from "../MySelect";
import { updateChannel } from "@/lib/general.actions";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChannelSettingsAdmForm({ channel, onClose }) {
  const channelId = channel?.channelId ?? "";
  const [error, setError] = useState(null);
  const router = useRouter();

  function handleSubmit(channelId, values) {
    updateChannel(channelId, values)
      .then((response) => {
        router.push(`/admin/channels`);
        onClose();
      })
      .catch((error) => {
        console.log("Error al actualizar el canal:", error);
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
    <div className="">
      <Formik
        initialValues={{
          name: channel?.name ?? "",
          description: channel?.description ?? "",
          project: channel?.project ?? "",
          latitude: channel?.ubication?.latitude ?? "",
          longitude: channel?.ubication?.longitude ?? "",
          status: channel?.isActive ?? false,
          visibility: channel?.isPublic ?? false,
        }}
        validate={(values) => {
          const errors = {};

          if (values.name.length > 25) {
            errors.name = "Name must be at most 25 characters long";
          } else if (!/^[a-zA-Z0-9\s]*$/.test(values.name)) {
            errors.name = "Name must only contain letters, numbers, and spaces";
          }


          if (values.description.length > 50) {
            errors.description =
              "Description must be at most 50 characters long";
          } else if (!/^[a-zA-Z0-9\s]*$/.test(values.name)) {
            errors.name =
              "Description must only contain letters, numbers, and spaces";
          }

          if (values.project.length > 25) {
            errors.project = "Project must be at most 25 characters long";
          } else if (!/^[a-zA-Z0-9\s]*$/.test(values.name)) {
            errors.name =
              "Project must only contain letters, numbers, and spaces";
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
          handleSubmit(channelId, values);
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
                    label="Name"
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
                <div className="">
                  <Field
                    id="description"
                    name="description"
                    label="Description"
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
                <div className="">
                  <Field
                    id="project"
                    name="project"
                    label="Project"
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
                <div className="">
                  <Field
                    id="latitude"
                    name="latitude"
                    label="Latitude"
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
                <div className="">
                  <Field
                    id="longitude"
                    name="longitude"
                    label="Longitude"
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
                <div className="">
                  <Field
                    as="select"
                    id="status"
                    name="status"
                    label="Status"
                    placeholder="Status of the channel"
                    component={MySelect}
                    defaultSelectedKeys={[
                      values.status === true ? "true" : "false",
                    ]}
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    datas={[
                      { value: "true", label: "Active" },
                      { value: "false", label: "Inactive" },
                    ]}
                  />
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-red-500 text-sm font-semibold mt-1"
                  />
                </div>
                <div className="">
                  <Field
                    as="select"
                    id="visibility"
                    name="visibility"
                    label="Visibility"
                    placeholder="Visibility of the channel"
                    component={MySelect}
                    defaultSelectedKeys={[
                      values.visibility === true ? "true" : "false",
                    ]}
                    value={values.visibility}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    datas={[
                      { value: "true", label: "Public" },
                      { value: "false", label: "Private" },
                    ]}
                  />
                  <ErrorMessage
                    name="visibility"
                    component="div"
                    className="text-red-500 text-sm font-semibold mt-1"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end mb-4 mt-8 w-full">
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => onClose()}
                >
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save Changes
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
