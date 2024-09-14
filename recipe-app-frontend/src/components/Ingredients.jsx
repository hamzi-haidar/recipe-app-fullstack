import { HiPlus, HiX } from "react-icons/hi";
import Ingredient from "./Ingredient";
import { useRef, useState } from "react";
import Button from "./Button";

function Ingredients({ ingredients, setIngredients }) {
  const [show, setShow] = useState(false);
  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [measurement, setMeasurement] = useState("g");

  const ref = useRef();

  return (
    <div className="flex flex-col gap-5">
      {setIngredients ? (
        <div className="flex items-center gap-2">
          <h3>Ingredients</h3>
          <p>(At least 1 ingredient is required)</p>
        </div>
      ) : (
        <h1>Ingredients</h1>
      )}
      <div className="flex flex-wrap gap-4">
        {ingredients.map((ing, i) => (
          <Ingredient
            key={i}
            ing={{ ...ing, id: i }}
            setIngredients={setIngredients}
            show={show}
          />
        ))}
        {setIngredients &&
          (!show ? (
            <button
              onClick={() => {
                setShow(true);
              }}
              className="rounded-3xl border-2 border-orange-400 p-6 hover:scale-105"
            >
              <HiPlus size="1.5rem" color="fb923c" />
            </button>
          ) : (
            <div
              ref={ref}
              className="rounded-xl border-2 border-orange-400 p-4"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="">Ingredient</label>
                <input
                  className="w-48 rounded-3xl bg-gray-300 p-1 px-4"
                  type="text"
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="">measurment</label>
                  <input
                    className="w-28 rounded-3xl bg-gray-300 p-1 px-4"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <select
                  className="rounded-3xl bg-gray-300 p-1 px-4"
                  value={measurement}
                  onChange={(e) => setMeasurement(e.target.value)}
                >
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                  <option value="L">L</option>
                  <option value="ml">ml</option>
                </select>
              </div>
              <div className="mt-3 flex flex-row-reverse gap-4">
                <Button
                  onClick={(e) => {
                    if (ingredient === "" || quantity === 0) return;
                    e.preventDefault();
                    setIngredients((ings) => [
                      ...ings,
                      { ingredient, quantity, measurement },
                    ]);

                    setIngredient("");
                    setQuantity(0);
                    setMeasurement("g");
                    setShow(false);
                  }}
                >
                  <HiPlus />
                </Button>
                <Button
                  onClick={() => {
                    setIngredient("");
                    setQuantity(0);
                    setMeasurement("g");
                    setShow(false);
                  }}
                  type="danger"
                >
                  <HiX />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Ingredients;
