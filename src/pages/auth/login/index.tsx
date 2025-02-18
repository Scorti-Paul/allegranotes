import Button from "../../../components/Buttons/button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/Inputs";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { loginUser } from "api/mutations/users";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
export default function LoginPage() {
  const [loginData, setLoginData] = useState<any>("");
  const [showPassword, setShowPassword] = useState(true);
  const [, setCookie] = useCookies(["accessToken"]);
  const [, setUserCookie] = useCookies(["user"]);

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleChange = useCallback(
    (e: any) => {
      setLoginData({
        ...loginData,
        [e.target.name]: e.target.value,
      });
    },
    [loginData]
  );

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => loginUser(body),
    onSuccess: (response) => {
      toast?.success("Welcome Back!");
      navigate("/notes");
      const user = jwtDecode(response?.token);
      setCookie("accessToken", response?.token);
      setUserCookie("user", JSON.stringify(user));
    },
    onError: (e: any) => {
      console.log(e);
      toast?.error("Could not log user in");
    },
  });

  const handleSubmission = useCallback(
    async (e: any) => {
      e?.preventDefault();

      if (loginData.email === undefined) {
        return toast?.error("Email can't be empty");
      }

      if (
        loginData.email.split("").filter((x: any) => x === "@").length !== -1 &&
        loginData.email.indexOf(".") === -1
      ) {
        return toast?.error("Email is invalid");
      }

      if (loginData.password === undefined) {
        return toast?.error("Password can't be empty");
      }

      mutateAsync({ ...loginData });
    },
    [mutateAsync, loginData]
  );

  return (
    <div className="h-screen bg-white">
      <div className="h-full flex justify-center items-center">
        <div className="py-6 px-4 sm:px-4 lg:px-6 shadow-md border rounded-md w-96">
          <div className="mx-auto w-full max-w-sm">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-darkBlue">
                Sign in to your account
              </h2>
              <p className="text-sm text-darkBlue mt-0.5">
                Enter your email and password to login.
              </p>
            </div>
            <div className="mt-6">
              <form
                onSubmit={handleSubmission}
                className="flex flex-col gap-6"
              >
                <Input
                  label="Email address"
                  type="email"
                  field="input"
                  value={loginData["email"] || ""}
                  onChange={handleChange}
                  inputLength="medium"
                  placeholder="you@example.com"
                  required={true}
                  name="email"
                  hasShowPassword="disable"
                  optionalLabel={true}
                  autoComplete="true"
                />

                <Input
                  label="Password"
                  name="password"
                  inputLength="medium"
                  placeholder="***********"
                  value={loginData["password"] || ""}
                  onChange={handleChange}
                  type="text"
                  field="input"
                  required={true}
                  hasShowPassword={showPassword}
                  handleShowHidePassword={handleShowHidePassword}
                  optionalLabel={true}
                />

                <div className="-mt-4 flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-primary-400 text-sm hover:text-primary-500"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <div className="w-full">
                  <Button
                    onClick={handleSubmission}
                    text="Sign in"
                    hasIcon={false}
                    path=""
                    loading={isLoading}
                    type="primary-btn"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}