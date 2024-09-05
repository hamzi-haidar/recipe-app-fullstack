import { useQuery } from "@tanstack/react-query";
import BASEURL from "./config";

async function getRecipe(recipe_id, user_id) {
  const res = await fetch(
    BASEURL +
      `/recipes/get_recipe.php?recipe_id=${recipe_id}&user_id=${user_id}`,
  );

  const data = await res.json();

  return data.recipe;
}

export function useRecipe(recipe_id, user_id) {
  const { isLoading, data: recipe } = useQuery({
    queryKey: ["recipe"],
    queryFn: () => getRecipe(recipe_id, user_id),
  });

  return { recipe, isLoading };
}
