import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
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
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
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
