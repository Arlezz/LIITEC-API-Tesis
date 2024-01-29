import React from "react";
import { useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "./CalendarIcon";

export const MyDatePicker = ({ label, name = "" }) => {
  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <div className="capitalize flex flex-col">
      <label className="mb-1.5 text-small  text-black font-medium">
        {label}
      </label>
      <div className="">
        <DatePicker
            showIcon
            icon={<svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="!w-[1rem] !h-[1rem] top-1/2 transform -translate-y-1/2 left-0 text-[#707076]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>}
            dateFormat={"dd/MM/yyyy"}
            className="w-full text-sm rounded-[12px] border-[2px] border-[#e4e4e7] bg-[#f9fafb] hover:border-[#a1a1aa] focus:border-[#e4e4e7] w-full tap-highlight-transparent flex-row items-center shadow-sm  gap-3 border-medium border-default-200 data-[hover=true]:border-default-400 h-unit-10 min-h-unit-10 rounded-medium transition-background !duration-150 group-data-[focus=true]:border-primary transition-colors motion-reduce:transition-none is-filled focus:border-primary focus:ring-0 shadow-lg"
            wrapperClassName="w-full"
            {...field}
            selected={value}
            onChange={(date) => setValue(date)}
          />
      </div>
    </div>
  );
};
