import { useQuery } from "@tanstack/react-query";
import URL from "./config";

async function getRecipes() {
  const res = await fetch(URL + "/recipes/get_all.php");

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
