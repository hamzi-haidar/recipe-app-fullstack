import { useQuery } from "@tanstack/react-query";
import BASEURL from "./config";

async function getCommentsApi(id) {
  const res = await fetch(`${BASEURL}/comments/get_all.php?recipe_id=${id}`);

  const data = await res.json();

  return data.message;
}

export function useComments(id) {
  const { data: comments, isPending } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getCommentsApi(id),
  });

  return { comments, isPending };
}
