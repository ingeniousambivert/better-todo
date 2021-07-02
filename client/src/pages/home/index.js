import React, { useState, useEffect, Fragment } from "react";
import Container from "../../layouts";
import client from "../../utils/client";
import useStoreContext from "../../store";
import ViewTodoList from "../../components/todo/view";
import WriteTodo from "../../components/todo/write";

function HomePage() {
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const [error, setErorr] = useState(false);
  const { state, dispatch } = useStoreContext();

  const todos = state.todos;
  const auth = state.auth;
  const { id, accessToken } = auth;

  const getTodos = () => {
    client
      .get("/api/todos", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const todos = response.data;
          dispatch({ type: "todos", todos });
        }
      })
      .catch((error) => {
        console.log(error);
        setErorr(true);
      });
  };

  const createTodo = (data) => {
    client
      .post(
        "/api/todos",
        { author: id, ...data },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          getTodos();
        }
      })
      .catch((error) => {
        console.log(error);
        setErorr(true);
      });
  };

  const updateTodo = (id, data) => {
    client
      .patch(`/api/todos/${id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          getTodos();
        }
      })
      .catch((error) => {
        console.log(error);
        setErorr(true);
      });
  };

  const deleteTodo = (id) => {
    client
      .delete(`/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          getTodos();
        }
      })
      .catch((error) => {
        console.log(error);
        setErorr(true);
      });
  };

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Container>
      <div className="flex flex-col space-y-4 mt-20">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl md:text-3xl text-gray-800 mb-3 mt-5 font-semibold">
            Your Todos
          </h1>
          <div>
            <button
              onClick={() => {
                setShowCreate(true);
              }}
              className="block text-sm px-6 py-1 mt-4 text-white focus:outline-none bg-blue-700 rounded hover:bg-blue-600 transition duration-300"
            >
              Add Todo
            </button>
          </div>
        </div>
        <Fragment>
          {error ? (
            <div className="flex flex-auto justify-center items-center">
              <div
                className="mt-10 w-1/2 bg-red-100 border-t-4 border-red-500 rounded text-red-900 px-4 py-3 shadow-md"
                role="alert"
              >
                <p className="text-center">
                  There was an error while fetching your todos.
                  <br /> Please try again later.
                </p>
              </div>
            </div>
          ) : (
            <div>
              {showCreate || showUpdate ? (
                <WriteTodo
                  todo={currentTodo}
                  setShowCreate={setShowCreate}
                  showCreate={showCreate}
                  createTodo={createTodo}
                  setShowUpdate={setShowUpdate}
                  showUpdate={showUpdate}
                  updateTodo={updateTodo}
                />
              ) : (
                <ViewTodoList
                  todos={todos}
                  setCurrentTodo={setCurrentTodo}
                  setShowUpdate={setShowUpdate}
                  updateTodo={updateTodo}
                  deleteTodo={deleteTodo}
                />
              )}
            </div>
          )}
        </Fragment>
      </div>
    </Container>
  );
}

export default HomePage;
