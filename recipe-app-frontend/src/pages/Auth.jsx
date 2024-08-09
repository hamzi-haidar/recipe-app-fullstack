import { useParams } from "react-router-dom";
import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";

function Auth() {
  const { id } = useParams();

  if (id === "login") return <Login />;

  return <Signup />;
}

export default Auth;
