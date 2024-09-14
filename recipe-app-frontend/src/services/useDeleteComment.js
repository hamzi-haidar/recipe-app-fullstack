import { useMutation, useQueryClient } from "@tanstack/react-query";
import BASEURL from "./config";

async function deleteCommentApi(id) {
  const res = await fetch(BASEURL + "/comments/delete.php", {
    method: "POST",
    header: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  console.log(data);
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  const { mutate: deleteComment, isPending } = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: () => queryClient.invalidateQueries(["comments"]),
  });

  return { deleteComment, isPending };
}
