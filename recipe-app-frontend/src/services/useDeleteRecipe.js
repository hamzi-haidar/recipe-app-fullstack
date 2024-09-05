import { useMutation, useQueryClient } from "@tanstack/react-query";
import BASEURL from "./config";
import { toast } from "react-toastify";

async function deleteRecipeApi({ id, image_url }) {
  const res = await fetch(BASEURL + "/recipes/delete.php", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  if (data.status === "unsuccessful") {
    throw new Error("couldn't delete recipe");
  }

  const res2 = await fetch(image_url, {
    method: "DELETE",
  });

  if (!res2.ok) {
    throw new Error("Couldn't delete image");
  }
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  const { mutate: deleteRecipe, isPending } = useMutation({
    mutationFn: deleteRecipeApi,
    onSuccess: () => {
      toast.success("recipe successfully deleted");
      queryClient.invalidateQueries(["recipes"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteRecipe, isPending };
}
