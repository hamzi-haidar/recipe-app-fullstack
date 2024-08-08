import { useQuery } from "@tanstack/react-query";
import BASEURL from "./config";

async function getRecipe(id) {
  const res = await fetch(BASEURL + `/recipes/get_recipe.php?recipe_id=${+id}`);

  const data = await res.json();

  return data.recipe;
}

export function useRecipe(id) {
  const { isLoading, data: recipe } = useQuery({
    queryKey: ["recipe"],
    queryFn: () => getRecipe(id),
  });

  return { recipe, isLoading };
}
