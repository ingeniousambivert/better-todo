import React, { useState } from "react";
import CreateUser from "../../components/user/create";
import client from "../../utils/client";
import Container from "../../layouts";
function SignupPage() {
  const [result, setResult] = useState(null);

  const create = (data) => {
    client
      .post("/api/users/auth/signup", data)
      .then((response) => {
        if (response.status === 201) {
          setResult("created");
        }
      })
      .catch((error) => {
        if (error.message.includes("409")) {
          setResult("exists");
        } else {
          setResult("error");
        }
      });
  };

  return (
    <Container>
      <div>
        <CreateUser create={create} result={result} />
      </div>
    </Container>
  );
}

export default SignupPage;
