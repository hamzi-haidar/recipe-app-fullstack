import { useMutation, useQueryClient } from "@tanstack/react-query";
import BASEURL from "./config";
import { toast } from "react-toastify";

async function updateStartApi({ recipe_id, user_id, is_starred }) {
  const res = await fetch(
    `${BASEURL}/stars/${is_starred ? "delete" : "add"}.php`,
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ recipe_id, user_id }),
    },
  );

  const data = await res.json();
  if (data.status === "unsuccessful") throw new Error(data.message);
}

export function useStar() {
  const queryClient = useQueryClient();

  const { mutate: updateStar, isPending } = useMutation({
    mutationFn: updateStartApi,
    onSuccess: () => {
      toast.success();
      queryClient.invalidateQueries("recipes");
    },
    onError: () => {},
  });

  return { updateStar, isPending };
}
