import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const [error, setError] = useState("");
  const inValid = password === "" || emailAddress === "";

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullname,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullname("");
        setPassword("");
        setEmailAddress("");
        setUsername("");
        setError(error.message);
      }
    } else {
      setError("Username already exist!, Try something different");
    }
  };

  useEffect(() => {
    document.title = "Sign Up-Instagram";
  }, []);
  return (
    <div className="container flex mx-auto max-w-screen-sm 2xl:max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iphone with profile"
        ></img>
      </div>
      <div className="flex flex-col w-2/5 px-3">
        <div className="flex flex-col items-center bg-white p-4 border rounded border-gray-primary mb-4">
          <h1 className="flex justify-center w-full">
            <img
              src="images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full  py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            ></input>
            <input
              aria-label="Enter your Full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray-base w-full  py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullname(target.value)}
              value={fullname}
            ></input>
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email Address"
              className="text-sm text-gray-base w-full  py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            ></input>
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full  py-5 px-4 h-2 border  border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            ></input>
            <button
              disabled={inValid}
              type="submit"
              className={`text-white bg-blue-medium w-full h-8 rounded font-bold ${
                inValid && "opacity-50"
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center rounded items-center flex-col w-full bg-white p-4 border border-gray-primary">
          <p className="test-sm font-semibold">
            Have an account?{" "}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
