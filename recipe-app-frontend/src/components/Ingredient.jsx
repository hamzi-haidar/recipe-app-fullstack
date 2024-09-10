import { HiX } from "react-icons/hi";

function Ingredient({ ing, setIngredients, show }) {
  return (
    <div className="relative h-20 min-w-40 rounded-2xl bg-orange-400 p-5 pr-10 text-white">
      {setIngredients && !show && (
        <button
          id={ing.id}
          onClick={(e) => {
            e.preventDefault();
            setIngredients((ings) => ings.filter((_, i) => i !== ing.id));
          }}
          className="absolute right-3 top-2"
        >
          <HiX size="1.2rem" />
        </button>
      )}
      <p>{ing.ingredient}</p>
      <p>
        {ing.quantity}
        <span> {ing.measurement}</span>
      </p>
    </div>
  );
}

export default Ingredient;
