import React, { useEffect } from "react";
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
    if (todosLength > 0) {
      return data.map((item) => {
        return (
          <Card key={item._id}>
            <CardBody>
              <div className="flex flex-row justify-between items-start">
                <CardTitle
                  className={item.done && "line-through text-purple-500"}
                >
                  {item.title}
                </CardTitle>
                <button
                  onClick={() => {
                    const done = !item.done;
                    updateTodo(item._id, { done });
                  }}
                  className="text-xs text-purple-700 underline"
                >
                  {item.done ? "Mark As Undone" : "Mark As Done"}
                </button>
              </div>
              <div className="mb-2">
                <p
                  className={
                    item.done
                      ? "line-through text-purple-500 text-xs font-light"
                      : "text-xs font-light text-gray-600"
                  }
                >
                  {new Date(item.createdAt).toString()}
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
    } else {
      <div className="flex flex-auto justify-center items-center">
        <div className="mt-10 w-1/2 ">
          <p className="text-center">No Todos available</p>
        </div>
      </div>;
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
