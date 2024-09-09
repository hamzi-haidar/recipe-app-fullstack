import { useMutation, useQueryClient } from "@tanstack/react-query";
import BASEURL from "./config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

async function loginApi({ email, password }) {
  const res = await fetch(BASEURL + `/auth/login.php`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,

    onSuccess: (user) => {
      toast.update(123, {
        render: `successfully logged in as ${user.user_name}`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      queryClient.setQueryData(["user"], user);

      localStorage.setItem("isAuthenticated", user.isAuthenticated);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/home", { replace: true });
    },

    onError: () => {
      toast.update(123, {
        render: "Provided email or password are incorrect",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    },

    onMutate: () => {
      toast.loading("logging in", { toastId: 123 });
    },
  });

  return { login, isPending };
}
