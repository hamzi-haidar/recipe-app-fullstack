import { useSearchParams } from "react-router-dom";
import { useRecipes } from "../services/useRecipes";
import Loader from "./Loader";
import Recipe from "./Recipe";

function Recipes() {
  const curUser = JSON.parse(localStorage.getItem("user"));

  const [searchParams] = useSearchParams();

  const { recipes, isLoading } = useRecipes(curUser.user_id);

  const filter = searchParams.get("filter") || "all-recipes";

  if (isLoading) return <Loader />;

  let filteredRecipes;

  if (filter === "all-recipes") filteredRecipes = recipes;
  if (filter === "my-recipes")
    filteredRecipes = recipes.filter(
      (recipe) => recipe.user_name === curUser.user_name,
    );
  if (filter === "starred-recipes")
    filteredRecipes = recipes.filter((recipe) => recipe.is_starred);
  return (
    <div className="mb-10 mt-32 flex w-[100%] flex-col items-center gap-24">
      {filteredRecipes.map((recipe) => (
        <Recipe key={recipe.id} data={recipe} curUser={curUser} />
      ))}
    </div>
  );
}

export default Recipes;
