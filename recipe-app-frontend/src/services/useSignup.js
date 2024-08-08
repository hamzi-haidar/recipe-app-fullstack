import { useMutation } from "@tanstack/react-query";
import BASEURL from "./config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

async function signupApi(newUser) {
  const res = await fetch(BASEURL + "/users/add.php", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const data = await res.json();

  if (data.status === "unsuccessful") {
    throw new Error(data.message);
  }
}

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,

    onSuccess: () => {
      toast.success("signup successful");
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isPending };
}
