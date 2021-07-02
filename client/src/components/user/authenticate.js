import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";

function AuthenticateUser(props) {
  const { authenticate, result } = props;
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    await authenticate(data);
    setLoading(false);
  };
  return (
    <div className="container mx-auto">
      <div className="mt-10 flex flex-col justify-center items-center gap-4">
        <Fragment>
          {result && (
            <div
              className="bg-red-100 border-t-4 border-red-500 rounded text-red-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div className="flex text-center">
                <div>
                  {result === "unauthenticated" && (
                    <Fragment>
                      <p className="font-bold">Could not sign in</p>
                      <p className="text-sm">
                        Your email or password is incorrect.
                      </p>
                    </Fragment>
                  )}
                  {result === "error" && (
                    <p>
                      There was an error while signing in your account.
                      <br /> Please try again later.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </Fragment>
        <h1 className="text-3xl md:text-4xl text-gray-800 mb-3 mt-5">
          Sign In
        </h1>
        <p className="text-gray-400 font-light mb-5">
          Signin to your account to use the Better Todo App
        </p>
        <div className="w-1/2 lg:w-1/4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <div>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  id="email"
                  name="email"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter Email"
                />
                {errors.email && (
                  <small className="text-red-400 font-light">
                    This field is required
                  </small>
                )}
              </div>
              <div>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  id="password"
                  name="password"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter Password"
                />
                {errors.password && (
                  <small className="text-red-400 font-light">
                    This field is required
                  </small>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="text-sm px-6 py-1 mt-4 text-white focus:outline-none bg-blue-700 rounded hover:bg-blue-600 transition duration-300"
                >
                  {loading ? "Siging In..." : "Sign In"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthenticateUser;
