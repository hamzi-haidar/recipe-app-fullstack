import { useQuery } from "@tanstack/react-query";
import BASEURL from "./config";

async function getRecipes() {
  const res = await fetch(BASEURL + "/recipes/get_all.php");

  const data = await res.json();

  return data.recipes;
}

export function useRecipes() {
  const { isLoading, data: recipes } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  return { recipes, isLoading };
}
