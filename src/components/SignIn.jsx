import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Github, Twitter, Google } from "grommet-icons";

export default function SignIn() {
  const { signInWithGoogle, signInWithTwitter, signInWithGithub } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSignInWithGoogle() {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  async function handleSignInWithTwitter() {
    try {
      setError("");
      setLoading(true);
      await signInWithTwitter();
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  async function handleSignInWithGithub() {
    try {
      setError("");
      setLoading(true);
      await signInWithGithub();
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <>
      <Card className="text-center float-shadow">
        <Card.Body>
          <Button
            className="btn btn-light w-70 mt-3 p-3 rounded-pill"
            disabled={loading}
            onClick={handleSignInWithGoogle}
          >
            <Google color="plain" />
            <span className="ml-2">Continue with Google</span>
          </Button>
          <Button
            className="btn btn-light w-70 mt-3 p-3 rounded-pill"
            disabled={loading}
            onClick={handleSignInWithTwitter}
          >
            <Twitter color="plain" />
            <span className="ml-2">Continue with Twitter</span>
          </Button>
          <Button
            className="btn btn-light w-70 mt-3 p-3 rounded-pill"
            disabled={loading}
            onClick={handleSignInWithGithub}
          >
            <Github color="plain" />
            <span className="ml-2">Continue with Github</span>
          </Button>
          {error && <p class="text-center text-danger mt-3">{error}</p>}
        </Card.Body>
      </Card>
    </>
  );
}
