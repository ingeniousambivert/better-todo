import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";

function CreateTodo(props) {
  const { todo, setShowCreate, createTodo, setShowUpdate } = props;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: todo });

  const onSubmit = (data) => {
    setLoading(true);
    createTodo(data);
    setLoading(false);
    setShowUpdate(false);
    setShowCreate(false);
  };
  return (
    <div className="container mx-auto">
      <div className="mt-10 flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl md:text-4xl text-gray-800 mb-3 mt-5">
          Create a Todo
        </h1>
        <p className="text-gray-400 font-light mb-5">
          You can choose to set a reminder for your todo
        </p>
        <div className="w-1/2 lg:w-1/4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <div>
                <input
                  {...register("title", { required: true })}
                  type="text"
                  id="title"
                  name="title"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter A Title"
                />
                {errors.title && (
                  <small className="text-red-400 font-light">
                    This field is required
                  </small>
                )}
              </div>
              <div>
                <textarea
                  {...register("content")}
                  type="text"
                  id="content"
                  name="content"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter Content"
                />
              </div>

              <div className="flex flex-row space-x-5">
                <button
                  type="submit"
                  className="text-sm px-6 py-1 mt-4 text-white focus:outline-none bg-blue-700 rounded hover:bg-blue-600 transition duration-300"
                >
                  {loading === true ? "Creating..." : "Create"}
                </button>
                <button
                  onClick={() => {
                    setShowCreate(false);
                    setShowUpdate(false);
                  }}
                  className="text-sm px-6 py-1 mt-4 border border-gray-300 rounded hover:border-gray-500 focus:outline-none  transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function UpdateTodo(props) {
  const { todo, setShowCreate, setShowUpdate, updateTodo } = props;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: todo });

  const { _id: id } = todo;
  const onSubmit = (data) => {
    setLoading(true);
    updateTodo(id, data);
    setLoading(false);
    setShowUpdate(false);
    setShowCreate(false);
  };
  return (
    <div className="container mx-auto">
      <div className="mt-10 flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl md:text-4xl text-gray-800 mb-3 mt-5">
          Update a Todo
        </h1>

        <div className="w-1/2 lg:w-1/4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <div>
                <input
                  {...register("title", { required: true })}
                  type="text"
                  id="title"
                  name="title"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter A Title"
                />
                {errors.title && (
                  <small className="text-red-400 font-light">
                    This field is required
                  </small>
                )}
              </div>
              <div>
                <textarea
                  {...register("content")}
                  type="text"
                  id="content"
                  name="content"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter Content"
                />
              </div>

              <div className="flex flex-row space-x-5">
                <button
                  type="submit"
                  className="text-sm px-6 py-1 mt-4 text-white focus:outline-none bg-blue-700 rounded hover:bg-blue-600 transition duration-300"
                >
                  {loading === true ? "Updating..." : "Update"}
                </button>
                <button
                  onClick={() => {
                    setShowCreate(false);
                    setShowUpdate(false);
                  }}
                  className="text-sm px-6 py-1 mt-4 border border-gray-300 rounded hover:border-gray-500 focus:outline-none  transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function WriteTodo(props) {
  const {
    todo,
    setShowCreate,
    showCreate,
    createTodo,
    setShowUpdate,
    showUpdate,
    updateTodo,
  } = props;

  return (
    <Fragment>
      {showCreate && (
        <CreateTodo
          setShowUpdate={setShowUpdate}
          setShowCreate={setShowCreate}
          createTodo={createTodo}
        />
      )}
      {showUpdate && (
        <UpdateTodo
          todo={todo}
          setShowCreate={setShowCreate}
          setShowUpdate={setShowUpdate}
          updateTodo={updateTodo}
        />
      )}
    </Fragment>
  );
}

export default WriteTodo;
