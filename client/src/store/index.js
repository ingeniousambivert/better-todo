import React from "react";
import { get } from "lodash";
import storage from "../utils/storage";
import produce from "immer";

const initialState = {
  user: storage.get("user") || null,
  auth: storage.get("auth") || null,
  todos: storage.get("todos") || null,
  isAuthenticated: storage.get("isAuthenticated") || false,
};

const reducer = (state, action) => {
  const handlers = {
    authenticate: (state, { auth }) => {
      state.isAuthenticated = true;
      storage.set("isAuthenticated", true);
      state.auth = auth;
      storage.set("auth", auth);
    },

    revoke: (state) => {
      state.isAuthenticated = false;
      storage.set("isAuthenticated", false);
      state.todos = null;
      storage.set("todos", null);
      state.user = null;
      storage.set("user", null);
      state.auth = null;
      storage.set("auth", null);
    },

    user: (state, { user }) => {
      storage.set("user", user);
      state.user = user;
    },

    todos: (state, { todos }) => {
      storage.set("todos", todos);
      state.todos = todos;
    },
  };

  // do batch updates to store to prevent
  // multiple re-renders during a single action
  // if the action is an array, update all the dispatchs at once
  const actions = Array.isArray(action) ? action : [action];

  actions.forEach((action) => {
    const handler = get(handlers, action.type);

    if (handler) {
      handler(state, action);
    }
  });

  return state;
};

export const StoreContext = React.createContext(null);

export const StoreProvider = (props) => {
  const [state, dispatch] = React.useReducer(produce(reducer), initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => React.useContext(StoreContext);

export default useStoreContext;
