import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardFooter, CardText } from "./card";

function ViewTodoList(props) {
  const {
    todos,
    loading,
    updateTodo,
    deleteTodo,
    setCurrentTodo,
    setShowUpdate,
  } = props;

  const todosLength = todos?.length;

  const renderTodos = (data) => {
    if (todosLength === 0) {
      return (
        <div className="flex flex-auto justify-center items-center">
          <div className="mt-10 w-1/2 ">
            <p className="text-center text-xl">No Todos Available</p>
            <p className="text-center mt-2 text-sm text-gray-400 font-light">
              Create one by clicking
              <br /> Add Todo button.
            </p>
          </div>
        </div>
      );
    } else {
      return data.map((item) => {
        return (
          <Card key={item._id + item.title}>
            <CardBody>
              <CardTitle>
                <div className="flex flex-row justify-between items-start">
                  <Link
                    to={{
                      pathname: `/home/todo/${item._id}`,
                      state: { id: item._id },
                    }}
                  >
                    <span
                      className={item.done && "line-through text-purple-500"}
                    >
                      {item.title}
                    </span>
                  </Link>

                  <button
                    onClick={() => {
                      const done = !item.done;
                      updateTodo(item._id, { done });
                    }}
                    className="text-xs font-semibold text-purple-500 underline"
                  >
                    {item.done ? "Mark As Undone" : "Mark As Done"}
                  </button>
                </div>
              </CardTitle>
              <div className="mb-2 space-y-2">
                <p
                  className={
                    item.done
                      ? "line-through text-purple-500 text-xs font-light"
                      : "text-xs font-light text-gray-600"
                  }
                >
                  {new Date(item.createdAt).toString()}
                </p>
                <p
                  className={
                    item.done
                      ? "line-through text-purple-500 text-xs font-light"
                      : "text-xs font-light text-gray-600"
                  }
                >
                  {item.reminder === 0
                    ? "No reminders"
                    : `Reminder every ${item.reminder} hours.`}
                </p>
              </div>
              <CardText className={item.done && "line-through text-purple-500"}>
                <div>
                  <p> {item.content && item.content}</p>
                </div>
              </CardText>
              <CardFooter>
                <div className="flex flex-row space-x-4">
                  <button
                    onClick={() => {
                      setCurrentTodo(item);
                      setShowUpdate(true);
                    }}
                    className="border border-gray-300 hover:border-gray-400 transition duration-300 px-2 py-1 focus:outline-none rounded text-xs"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      deleteTodo(item._id);
                    }}
                    className="border text-red-400 border-red-300 hover:border-red-400 transition duration-300 px-2 py-1 focus:outline-none rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              </CardFooter>
            </CardBody>
          </Card>
        );
      });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  return (
    <div className="mt-10">
      {loading && todos !== null ? (
        <div className="flex flex-auto justify-center items-center">
          <div className="mt-10 w-1/2 ">
            <p className="text-center">Loading...</p>
          </div>
        </div>
      ) : (
        <div
          className={
            todosLength > 2
              ? "md:grid md:grid-cols-3 md:gap-4 mx-auto space-y-2 md:space-y-0"
              : todosLength > 1
              ? "md:grid md:grid-cols-2 md:gap-4 md:max-w-4xl mx-auto space-y-2 md:space-y-0"
              : "mx-auto max-w-md"
          }
        >
          {todos && renderTodos(todos)}
        </div>
      )}
    </div>
  );
}

export default ViewTodoList;
