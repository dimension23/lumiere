import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { signout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleSignOut() {
    setError("");
    try {
      await signout();
      history.push("/signin");
    } catch (error) {
      return setError(error.message);
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          {error && <p className="text-danger">{error}</p>}
          <img
            className="avatar float-shadow"
            alt="50x50"
            src={currentUser.photoURL}
          />
          <h2 className="text-center mb-4 mt-4">
            Welcome, {currentUser.displayName}
          </h2>
          <strong>Email:</strong> {currentUser.email}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button className="btn btn-danger" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </>
  );
}
