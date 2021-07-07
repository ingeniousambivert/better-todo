import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Container from "../../../layouts";
import client from "../../../utils/client";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "../../../components/todo/card";
import useStoreContext from "../../../store";

function Todo() {
  const location = useLocation();
  const history = useHistory();
  const { state } = useStoreContext();
  const auth = state.auth;
  const { accessToken } = auth;

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getTodo = (id) => {
    setLoading(true);
    client
      .get(`/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const todo = response.data;
          setTodo(todo);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
    setLoading(false);
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
          getTodo(id);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  const renderTodo = (item) => {
    return (
      <Card key={item._id + item.title}>
        <CardBody>
          <CardTitle>
            <div className="flex flex-row justify-between items-start">
              <span className={item.done && "line-through text-purple-500"}>
                {item.title}
              </span>

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
        </CardBody>
      </Card>
    );
  };

  useEffect(() => {
    if (location.state) {
      getTodo(location.state.id);
    } else {
      history.push("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Container>
      <div className="flex flex-col space-y-4 mt-20">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl md:text-3xl text-gray-800 mb-3 mt-5 font-semibold">
            Your Todo
          </h1>
        </div>
        {loading ? (
          <div className="flex flex-auto justify-center items-center">
            <p className="text-center">Loading...</p>
          </div>
        ) : (
          <div className="mt-20">
            {error ? (
              <div className="flex flex-auto justify-center items-center">
                <div
                  className="mt-10 w-1/2 bg-red-100 border-t-4 border-red-500 rounded text-red-900 px-4 py-3 shadow-md"
                  role="alert"
                >
                  <p className="text-center">
                    There was an error while fetching todo.
                  </p>
                </div>
              </div>
            ) : (
              todo && renderTodo(todo)
            )}
          </div>
        )}
      </div>
    </Container>
  );
}

export default Todo;
