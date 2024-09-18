import { motion } from "framer-motion";
import { HiX } from "react-icons/hi";

function Ingredient({ ing, setIngredients, show }) {
  return (
    <motion.div
      className="relative h-20 min-w-[8rem] rounded-2xl bg-orange-400 p-5 pr-10 text-white"
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{ opacity: 1, y: 1 }}
      transition={{ delay: setIngredients ? 0 : 0.1 * ing.id }}
    >
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
    </motion.div>
  );
}

export default Ingredient;
