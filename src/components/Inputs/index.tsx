import { InputProps } from "./types";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

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
              className="block text-base text-[#7B70AF]"
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
              required={required}
              disabled={disable}
              autoComplete={autoComplete}
              min={min}
              max={max}
              minLength={minLength}
              maxLength={maxLength}
              placeholder={placeholder}
              className="mt-1 border-[#DBD3FF] shadow-sm  text-[#7B70AF] placeholder:text-[#978EC2] focus:border-indigo-500 focus:ring-indigo-500 sm:text-md py-3 text-[#978EC2]c
                   block w-full rounded-md sm:text-md transition-all duration-200"
              
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
              className="block text-base text-[#7B70AF]"
            >
              {label}{" "}
              <span className="mt-2 text-sm text-red-400">{optionalLabel}</span>
            </label>
            <div className="mt-1">
              <textarea
                id={name}
                name={name}
                onChange={onChange}
                rows={6}
                value={value}
                placeholder={placeholder}
                className="mt-1 border-[#DBD3FF] shadow-sm placeholder:text-[#978EC2] focus:border-indigo-500 focus:ring-indigo-500 sm:text-md py-3 text-[#978EC2] block w-full rounded-md sm:text-md transition-all duration-200"
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