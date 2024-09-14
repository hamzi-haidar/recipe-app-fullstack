import { useMutation, useQueryClient } from "@tanstack/react-query";
import BASEURL from "./config";

async function addCommentApi(comment) {
  const res = await fetch(BASEURL + "/comments/add.php", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  const data = await res.json();

  return data;
}

export function useAddComment() {
  const queryClient = useQueryClient();

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: addCommentApi,
    onSuccess: () => queryClient.invalidateQueries("comments"),
  });
  return { addComment, isPending };
}
