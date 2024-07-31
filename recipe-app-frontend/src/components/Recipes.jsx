import { useRecipes } from "../services/useRecipes";
import Loader from "./Loader";
import Recipe from "./Recipe";

function Recipes() {
  const { recipes, isLoading } = useRecipes();

  if (isLoading) return <Loader />;

  return (
    <div className="flex w-[100%] flex-col items-center gap-24">
      {recipes.map((recipe) => (
        <Recipe key={recipe.id} data={recipe} />
      ))}
    </div>
  );
}

export default Recipes;
