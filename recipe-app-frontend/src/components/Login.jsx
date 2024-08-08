import { useState } from "react";
import { useLogin } from "../services/useLogin";
import Button from "./Button";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("h@t.com");
  const [password, setPassword] = useState("pass1243");

  const { login } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <div className="flex h-screen items-center justify-center gap-4">
      <img
        className="h-[35rem]"
        src="../src/assets/login.jpg"
        alt="ingredients"
      />
      <div className="h-[35rem] w-96 p-10">
        <h1>Log in</h1>
        <p>Login to your account below</p>
        <form className="mt-16 flex flex-col gap-10" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="rounded-3xl bg-gray-300 p-1 px-4"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="rounded-3xl bg-gray-300 p-1 px-4"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button>Login</Button>
        </form>
        <p className="mt-4 text-zinc-400">
          Dont have an account yet?{" "}
          <Link
            to="/auth/signup"
            className="font-medium text-blue-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
