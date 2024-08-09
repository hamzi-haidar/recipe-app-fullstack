import { HiPlus } from "react-icons/hi";
import Ingredient from "./Ingredient";

function Ingredients({ ingredients, setIngredients }) {
  return (
    <div className="flex flex-col gap-5">
      {setIngredients ? <h3>Ingredients</h3> : <h1>Ingredients</h1>}
      <div className="flex flex-wrap gap-4">
        {ingredients.map((ing, i) => (
          <Ingredient key={i} ing={ing} setIngredients={setIngredients} />
        ))}
        {setIngredients && (
          <button className="rounded-3xl border-2 border-orange-400 p-6 hover:scale-105">
            <HiPlus size="1.5rem" color="fb923c" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Ingredients;
