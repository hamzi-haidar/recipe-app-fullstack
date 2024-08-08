import { useMutation, useQueryClient } from "@tanstack/react-query";
import BASEURL from "./config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

async function logoutApi() {
  const res = await fetch(BASEURL + `/auth/logout.php`);

  const data = await res.json();

  return data;
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.removeQueries(["user"]);
      localStorage.setItem("isAuthenticated", false);
      localStorage.removeItem("user");
      navigate("/auth/login");
    },
    onError: () => {
      toast.error("couldn't logout");
    },
  });

  return { logout, isPending };
}
