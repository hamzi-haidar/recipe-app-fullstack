import { useState } from "react";
import { useRecipes } from "../services/useRecipes";
import Heading from "./Heading";
import Loader from "./Loader";
import Recipe from "./Recipe";

function Recipes({ inView }) {
  const [active, setActive] = useState("All recipes");
  const { recipes, isLoading } = useRecipes();

  console.log(recipes);

  if (isLoading) return <Loader />;

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Heading inView={inView} active={active} setActive={setActive} />
      <div className="mb-10 mt-32 flex w-[100%] flex-col items-center gap-24">
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} data={recipe} curUser={user.user_name} />
        ))}
      </div>
    </>
  );
}

export default Recipes;
