import { toast } from "react-toastify";
import Button from "../../../components/Buttons/button";
import Input from "../../../components/Inputs";
import { useState, useCallback } from "react";
import { useMutation } from "react-query";
import { registerUser } from "api/mutations/users";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [registerData, setRegisterData] = useState<any>({});
  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate();

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = useCallback(
    (e: any) => {
      setRegisterData({
        ...registerData,
        [e.target.name]: e.target.value,
      });
    },
    [registerData]
  );

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => registerUser(body),
    onSuccess: (response) => {
      toast?.success("Account created successfully!");
      navigate("/dashboard");
    },
    onError: (e: any) => {
      console.log(e);
      toast?.error("Could not log user in: ");
    },
  });

  const handleSubmission = useCallback(
    async (e: any) => {
      e?.preventDefault();

      const { firstName, lastName, ...rest } = registerData;

      if (firstName === undefined) {
        return toast?.error("Email can't be empty");
      }

      if (lastName === undefined) {
        return toast?.error("Email can't be empty");
      }

      if (registerData.phone === undefined) {
        return toast?.error("Phone number can't be empty");
      }

      if (registerData.password === undefined) {
        return toast?.error("Password can't be empty");
      }

      if (registerData.confirmPassword === undefined) {
        return toast?.error("Confirm password can't be empty");
      }

      if (registerData.email === undefined) {
        return toast?.error("Email can't be empty");
      }

      if (
        registerData.email.split("").filter((x: any) => x === "@").length !==
          -1 &&
        registerData.email.indexOf(".") === -1
      ) {
        return toast?.error("Email is invalid");
      }

      if (registerData.password !== registerData.confirmPassword) {
        return toast?.error("password and confirm password are not the same");
      }
     
        
          mutateAsync({
            name: firstName + " " + lastName,
            role: "buyer",
            ...rest,
          })
          ?.catch((e: any) => {
            toast?.warning(e?.message);
          });
          navigate("/products");
        
    },
    [registerData, mutateAsync, navigate]
  );

  return (
    <div className="h-screen bg-white">
      <div className="flex min-h-full">
        <div className="relative hidden w-2/5 flex-1 lg:block">
          <div className="absolute w-full bg-primary-green/25 h-full z-40">
            <div className="w-100 flex px-8 h-screen items-end pb-24">
              <div className="px-8 py-6 rounded-lg shadow-sm bg-black/50">
                <h1 className="text-white text-3xl font-semibold">
                  An Integrated solution for <br /> enhanced agricultural
                  activity.
                </h1>
                <p className="text-gray-300 text-md mt-2 font-light">
                  The largest and most preferred integration solution provider
                  for agricultural players in Africa with a global reach.
                </p>
              </div>
            </div>
          </div>
          {/* <img
            className="absolute inset-0 h-full w-full object-cover"
            src={register_bg}
            alt=""
          /> */}
        </div>

        <div className="flex flex-1 flex-col justify-center w-3/5 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full lg:w-92">
            <div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Create an account
              </h2>
              <p className="text-sm text-gray-600 mt-0.5">
                Fill out the details to create your account.
              </p>
            </div>

            <div className="mt-6">
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmission}>
                  <div className="overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:p-6 md:p-0 sm:block md:flex md:justify-between md:gap-4">
                      <div className="w-full grid grid-cols-6 gap-6 sm:mt-6 md:mt-0 md:pr-2">
                        <Input
                          label="First name"
                          name="firstName"
                          inputLength="medium"
                          placeholder="eg. John"
                          value={registerData["firstName"] || ""}
                          onChange={handleChange}
                          type="text"
                          field="input"
                          optionalLabel={true}
                          hasShowPassword="disable"
                          autoComplete="true"
                        />

                        <Input
                          label="Last name"
                          name="lastName"
                          inputLength="medium"
                          placeholder="eg. Doe"
                          value={registerData["lastName"] || ""}
                          onChange={handleChange}
                          type="text"
                          field="input"
                          optionalLabel={true}
                          hasShowPassword="disable"
                          autoComplete="true"
                        />

                        <Input
                          label="Email address"
                          name="email"
                          value={registerData["email"] || ""}
                          onChange={handleChange}
                          type="email"
                          field="input"
                          inputLength="large"
                          placeholder="you@example.com"
                          optionalLabel={true}
                          hasShowPassword="disable"
                        />

                        <Input
                          label="Phone number"
                          name="phone"
                          inputLength="large"
                          placeholder="(+233) xx xxx xxxx"
                          value={registerData["phone"] || ""}
                          onChange={handleChange}
                          type="tel"
                          hasShowPassword="disable"
                          optionalLabel={true}
                          field="input"
                          autoComplete="true"
                        />

                        <Input
                          label="Password"
                          name="password"
                          inputLength="large"
                          placeholder="***********"
                          value={registerData["password"] || ""}
                          onChange={handleChange}
                          type="password"
                          field="input"
                          hasShowPassword={showPassword}
                          handleShowHidePassword={handleShowHidePassword}
                          optionalLabel={true}
                          required={true}
                        />

                        <Input
                          label="Confirm password"
                          name="confirmPassword"
                          inputLength="large"
                          placeholder="***********"
                          value={registerData["confirmPassword"] || ""}
                          onChange={handleChange}
                          type="password"
                          field="input"
                          required={true}
                          hasShowPassword={showPassword}
                          handleShowHidePassword={handleShowHidePassword}
                          optionalLabel={true}
                        />
                      </div>
                    </div>

                    <div className="mt-6 w-full flex flex-col text-right">
                      <div className="w-[33.3rem]  self-end">
                        <Button
                          onClick={handleSubmission}
                          type="primary"
                          path=""
                          loading={isLoading}
                          hasIcon={false}
                          text={"Create account"}
                        />
                      </div>
                      <div className="mt-2 w-[25.73rem]  self-start">
                        <p className="text-gray-500">
                          Have an account?{" "}
                          <Link to="/login" className="text-green-700">
                            sign in
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}