import { useQuery } from "@tanstack/react-query";
import BASEURL from "./config";

async function getRecipes(id) {
  const res = await fetch(BASEURL + "/recipes/get_all.php/?user_id=" + id);

  const data = await res.json();

  return data.recipes;
}

export function useRecipes(id) {
  const { isLoading, data: recipes } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getRecipes(id),
  });

  return { recipes, isLoading };
}
