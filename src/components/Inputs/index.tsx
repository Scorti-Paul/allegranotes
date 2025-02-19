import { InputProps } from "./types";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// import DatePicker from "react-datepicker"
// import moment from "moment";
// import "react-datepicker/dist/react-datepicker.css";

export default function Input({
  label,
  optionalLabel,
  type,
  field,
  required,
  name,
  value,
  onChange,
  hasShowPassword,
  handleShowHidePassword,
  autoComplete,
  placeholder,
  inputLength,
  disable,
  min,
  max,
  minLength,
  maxLength
}: InputProps) {
  const [inputBlur, setInputBlur] = useState(false);

  const handleBlur = (e: any) => {
    if (optionalLabel === false) {
      !e.target.value ? setInputBlur(true) : setInputBlur(false);
    }
  };

  return (
    <>
      {field === "input" ? (
        <>
          <div
            className={
              inputLength === "small"
                ? "col-span-6 sm:col-span-6 lg:col-span-2 relative"
                : inputLength === "medium"
                  ? "col-span-6 sm:col-span-3 relative"
                  : inputLength === "large"
                    ? "col-span-6 relative"
                    : "col-span-6 sm:col-span-6 lg:col-span-2 relative"
            }
          >
            <label
              htmlFor={name}
              className="block text-base font-medium text-[#7B70AF]"
            >
              {label}{" "}
              <span className="mt-2 text-lg text-red-400">{optionalLabel}</span>
            </label>
            <input
              type={
                hasShowPassword === "disable"
                  ? `${type}`
                  : hasShowPassword
                    ? "password"
                    : `${type}`
              }
              name={name}
              id={name}
              value={value}
              onChange={onChange}
              onBlur={handleBlur}
              required={required}
              disabled={disable}
              autoComplete={autoComplete}
              min={min}
              max={max}
              minLength={minLength}
              maxLength={maxLength}
              placeholder={placeholder}
              className={
                !inputBlur
                  ? `mt-1 block w-full rounded-md border-gray-300 shadow-sm placeholder:text-darkBlue/40 focus:border-indigo-500 focus:ring-indigo-500 sm:text-md transition-all duration-200 py-3 text-darkBlue`
                  : `mt-1 block w-full rounded-md border-red-400 shadow-sm placeholder:text-red-200 bg-red-50/40 focus:border-red-500 focus:ring-red-500 sm:text-md transition-all duration-200 py-3`
              }
            />
            {hasShowPassword === "disable" ? (
              ""
            ) : !hasShowPassword ? (
              <div className="flex items-center gap-2">
                <EyeSlashIcon
                  className="w-5 text-gray-400 absolute top-11 right-3 z-30 hover:cursor-pointer"
                  onClick={handleShowHidePassword}
                />
              </div>
            ) : hasShowPassword ? (
              <div className="flex items-center gap-2">
                <EyeIcon
                  className="transition-all duration-200 ease-in w-5 text-gray-400 absolute top-11 right-3 z-30 hover:cursor-pointer"
                  onClick={handleShowHidePassword}
                />
              </div>
            ) : (
              ""
            )}
            {/* <span></span> */}
            {inputBlur && (
              <span className="mt-1 text-xs text-red-400 absolute transition-all duration-200">
                This field is required
              </span>
            )}
          </div>
        </>
      ) : field === "textarea" ? (
        <>
          <div
            className={
              inputLength === "small"
                ? "col-span-6 sm:col-span-6 lg:col-span-2"
                : inputLength === "medium"
                  ? "col-span-6 sm:col-span-3"
                  : inputLength === "large"
                    ? "col-span-6"
                    : "col-span-6 sm:col-span-6 lg:col-span-2"
            }
          >
            <label
              htmlFor={name}
              className="block text-base font-normal text-[#7B70AF]"
            >
              {label}{" "}
              <span className="mt-2 text-sm text-red-400">{optionalLabel}</span>
            </label>
            <div className="mt-1">
              <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={handleBlur}
                rows={3}
                placeholder={placeholder}
                className={
                  !inputBlur
                    ? `mt-1 block w-full rounded-md border-gray-300 shadow-sm resize-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-700`
                    : `mt-1 block w-full rounded-md border-red-400 shadow-sm placeholder:text-red-200 bg-red-50/40 focus:border-red-500 focus:ring-red-500 sm:text-sm`
                }
                defaultValue={""}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}