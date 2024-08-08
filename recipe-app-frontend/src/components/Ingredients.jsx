import Ingredient from "./Ingredient";

function Ingredients({ ingredients }) {
  return (
    <div className="flex flex-col gap-5">
      <h1>Ingredients</h1>
      <div className="flex gap-4">
        {ingredients.map((ing) => (
          <Ingredient key={ing.ing_id} ing={ing} />
        ))}
      </div>
    </div>
  );
}

export default Ingredients;
