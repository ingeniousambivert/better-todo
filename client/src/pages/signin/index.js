import React, { useState } from "react";
import AuthenticateUser from "../../components/user/authenticate";
import client from "../../utils/client";
import useStoreContext from "../../store";
import Container from "../../layouts";

function SigninPage() {
  const { dispatch } = useStoreContext();
  const [result, setResult] = useState(null);
  const authenticate = (data) => {
    client
      .post("/api/users/auth/signin", data)
      .then((response) => {
        const auth = response.data;
        dispatch({ type: "authenticate", auth });
      })
      .catch((error) => {
        if (error.message.includes("401", "403")) {
          setResult("unauthenticated");
        } else {
          setResult("error");
        }
      });
  };
  return (
    <Container>
      <AuthenticateUser authenticate={authenticate} result={result} />
    </Container>
  );
}

export default SigninPage;
