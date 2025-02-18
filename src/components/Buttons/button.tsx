import { Link } from "react-router-dom";
import { ButtonProps } from ".";
import Loader from "./loader";

const Button = ({
  text,
  type,
  Icon,
  hasIcon,
  onClick,
  path,
  ref,
  children,
  loading,
  disabled, }: ButtonProps) => {
  return (
    <>
      {
        type === "primary-btn" ? (
          <>
            <button
              disabled={disabled}
              onClick={onClick}
              className={`inline-flex w-full justify-center font-medium rounded-md border-0 border-transparent ${disabled
                ? "text-gray-600 bg-gray-200 cursor-not-allowed"
                : "bg-primary-500 text-white shadow-sm hover:bg-primary-600"
                } focus:outline-none sm:col-start-2 sm:text-base transition-all duration-200 px-4 py-3 text-sm ${children}`}
            >
              <div className="flex gap-2 items-center justify-center">
                {loading && <Loader />}

                <span>{text}</span>
                {hasIcon && <>{Icon}</>}
              </div>
            </button>
          </>
        ) : type === "secondary-btn" ? (
          <>
            <div>
              <button
                disabled={disabled}
                onClick={onClick}
                ref={ref}
                className="inline-flex w-full justify-center rounded-md border-2 border-primary-500 bg-white px-4 py-3 text-base font-medium transition-all duration-200 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:mt-0 sm:text-sm"
              >
                <div className="flex gap-2 items-center justify-center">
                  {loading && <Loader />}
                  <span>{text}</span>
                  {hasIcon && <>{Icon}</>}
                </div>
              </button>
            </div>
          </>
        ) : type === "primary-link" ? (
          <>
            <div>
              <Link to={`${path}`} className='inline-flex w-full justify-center rounded-xl border-[2.5px] border-primary-500 px-4 py-3 transition-all duration-200 bg-primary-500 text-white text-sm font-medium hover:border-primary-600 hover:bg-primary-600 focus:outline-none focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:mt-0 sm:text-sm'>
                <div className="flex gap-2 items-center justify-center">
                  {loading && <Loader />}
                  {hasIcon && <>{Icon}</>}
                  <span>{text}</span>
                </div>
              </Link>
            </div>
          </>
          ) : type === "primary-link-large" ? (
            <>
            <div>
              <Link to={`${path}`} className='inline-flex w-full justify-center rounded-xl border-[2.5px] border-primary-500 px-4 py-4 transition-all duration-200 bg-primary-500 text-white text-sm font-medium hover:border-primary-600 hover:bg-primary-600 focus:outline-none focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:mt-0 sm:text-lg'>
                <div className="flex gap-2 items-center justify-center">
                  {loading && <Loader />}
                  <span>{text}</span>
                  {hasIcon && <>{Icon}</>}
                </div>
              </Link>
            </div>
          </>
        ) : type === "secondary-link" ? (
          <>
            <div>
              <Link to={`${path}`} className="inline-flex w-full justify-center rounded-xl border-2 border-primary-500 px-4 py-3 transition-all duration-200 bg-white text-primary-500 hover:bg-primary-500 hover:text-white text-sm font-medium focus:outline-none focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:mt-0 sm:text-sm">
                <div className="flex gap-2 items-center justify-center">
                  {loading && <Loader />}
                  {hasIcon && <>{Icon}</>}
                  <span>{text}</span>
                </div>
              </Link>
            </div>
          </>
        ) : type === "accent-link" ? (
          <>
            <div>
              <Link to={`${path}`}>
                <button
                  disabled={disabled}
                  onClick={onClick}
                  ref={ref}
                  className="inline-flex w-full justify-center rounded-md border border-green-300 bg-green-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-green-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-2 sm:mt-0 sm:text-sm"
                >
                  <div className="flex gap-2 items-center justify-center">
                    {loading && <Loader />}
                    <span>{text}</span>
                    {hasIcon && <>{Icon}</>}
                  </div>
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div>
              <button
                disabled={disabled}
                onClick={onClick}
                className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <div className="flex gap-2 items-center justify-center">
                  <span>{text}</span>
                  {hasIcon && <>{Icon}</>}
                </div>
              </button>
            </div>
          </>
        )}
    </>
  )
}

export default Button 