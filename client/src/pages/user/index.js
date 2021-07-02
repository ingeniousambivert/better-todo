import React, { useState, useEffect } from "react";
import Container from "../../layouts";
import client from "../../utils/client";
import UserView from "../../components/user/view";
import useStoreContext from "../../store";
function UserPage() {
  const { state, dispatch } = useStoreContext();
  const [result, setResult] = useState(null);
  const auth = state.auth;
  const user = state.user;

  const signOutUser = () => {
    dispatch({ type: "revokeUser" });
  };

  const getUserData = (auth) => {
    const { id, accessToken } = auth;
    client
      .get(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const user = response.data;
        dispatch({ type: "setUser", user });
      })
      .catch((error) => {
        if (error.message.includes("401", "403")) {
          setResult("unauthenticated");
        } else if (error.message.includes("404")) {
          setResult("notFound");
        } else {
          setResult("error");
        }
      });
  };

  useEffect(() => {
    getUserData(auth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Container>
      <UserView result={result} user={user} signOutUser={signOutUser} />
    </Container>
  );
}

export default UserPage;
