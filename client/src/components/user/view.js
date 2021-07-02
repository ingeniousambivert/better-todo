import React, { Fragment } from "react";

function UserView(props) {
  const { user, result, signOutUser } = props;
  return (
    <div>
      {user ? (
        <div className="flex flex-col justify-center items-center mt-20">
          <div className="w-1/2 lg:w-1/4">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-5">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Welcome
                </h3>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.firstname}&nbsp;{user.lastname}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.email}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Email Verified
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.isVerified ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Created At
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(user.createdAt).toString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={signOutUser}
              type="submit"
              className="text-sm px-6 py-1 mt-4 text-white focus:outline-none bg-red-700 rounded hover:bg-red-600 transition duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-20">
          <div className="w-1/2 lg:w-1/4">
            <Fragment>
              {result && (
                <div className="flex flex-col gap-4 justify-center items-center">
                  <div
                    className="bg-red-100 border-t-4 text-center border-red-500 rounded text-red-900 px-4 py-3 shadow-md"
                    role="alert"
                  >
                    <div className="flex text-center">
                      <div>
                        {result === "unauthorised" && (
                          <Fragment>
                            <p className="font-bold">
                              Could not access user's data
                            </p>
                            <p className="text-sm">Please try again later.</p>
                          </Fragment>
                        )}
                        {result === "notFound" && (
                          <Fragment>
                            <p className="font-bold">
                              Could not find user's data
                            </p>
                            <p className="text-sm">Please try again later.</p>
                          </Fragment>
                        )}
                        {result === "error" && (
                          <p>
                            There was an error while creating your account.
                            <br /> Please try again later.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={signOutUser}
                      type="submit"
                      className="text-sm px-6 py-1 mt-4 text-white focus:outline-none bg-red-700 rounded hover:bg-red-600 transition duration-300"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </Fragment>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserView;
