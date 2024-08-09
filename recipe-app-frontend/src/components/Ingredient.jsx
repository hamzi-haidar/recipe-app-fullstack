function Ingredient({ ing, setIngredients }) {
  return (
    <div className="min-w-40 rounded-2xl bg-orange-400 p-5 text-white">
      <p>{ing.ingredient}</p>
      <p>
        {ing.quantity}
        <span> {ing.measurement}</span>
      </p>
    </div>
  );
}

export default Ingredient;
