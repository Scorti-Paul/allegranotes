import { Link } from "react-router-dom";
import { ButtonProps } from ".";
import Loader from "./loader";
import ButtonLoader from "components/loaders/buttonloader";

const Button = ({
  text,
  type,
  Icon,
  hasIcon,
  onClick,
  path,
  loading }: ButtonProps) => {
  return (
    <>
      {
        type === "primary-btn" ? (
          <>
            <button
              onClick={onClick}
              className="text-white flex items-center gap-2 bg-indigo-600 px-4 py-3 rounded-lg"
            >
              <div className="flex gap-2 items-center justify-center">
                <span>{text}</span>
                {loading ? (
                  <ButtonLoader />
                ) : (
                  <>
                    {hasIcon && <>{Icon}</>}
                  </>
                )}

              </div>
            </button>
          </>
        ) : type === "secondary-link" ? (
          <>
            <div>
              <Link to={`${path}`} className="inline-flex w-full justify-center px-4 py-3 transition-all duration-200 text-indigo-500 hover:text-indigo-400 text-sm font-medium focus:outline-none focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:mt-0 sm:text-sm rounded-md">
                <div className="flex gap-2 items-center justify-center">
                  {loading && <Loader />}
                  {hasIcon && <>{Icon}</>}
                  <span>{text}</span>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div>
              <button
                onClick={onClick}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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