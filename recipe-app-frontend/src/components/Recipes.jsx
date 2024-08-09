import { useState } from "react";
import { useRecipes } from "../services/useRecipes";
import Heading from "./Heading";
import Loader from "./Loader";
import Recipe from "./Recipe";
import AddEditRecipe from "./AddEditRecipe";

function Recipes({ inView }) {
  const [active, setActive] = useState("All recipes");
  const [open, setOpen] = useState(false);
  const { recipes, isLoading } = useRecipes();

  if (isLoading) return <Loader />;

  const user = JSON.parse(localStorage.getItem("user"));

  const curUser = user.user_name;

  return (
    <>
      <Heading
        inView={inView}
        active={active}
        setActive={setActive}
        setOpen={setOpen}
        curUser={curUser}
      />
      <div className="mb-10 mt-32 flex w-[100%] flex-col items-center gap-24">
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} data={recipe} curUser={curUser} />
        ))}
      </div>
      <AddEditRecipe open={open} setOpen={setOpen} userId={user.user_id} />
    </>
  );
}

export default Recipes;
