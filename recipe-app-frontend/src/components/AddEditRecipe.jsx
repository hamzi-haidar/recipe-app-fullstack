import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Button from "./Button";
import FormInput from "./FormInput";
import Ingredients from "./Ingredients";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAddRecipe from "../services/useAddRecipe";

function AddEditRecipe({ open, setOpen, userId }) {
  const [ingredients, setIngredients] = useState([
    { ingredient: "lahme", quantity: 200, measurement: "g" },
    { ingredient: "rice asda ", quantity: 300, measurement: "kg" },
    { ingredient: "jej", quantity: 50, measurement: "ml" },
    { ingredient: "jej", quantity: 50, measurement: "ml" },
    { ingredient: "jej", quantity: 50, measurement: "ml" },
    { ingredient: "jej", quantity: 50, measurement: "ml" },
    { ingredient: "jej", quantity: 50, measurement: "ml" },
    { ingredient: "jej", quantity: 50, measurement: "ml" },
    { ingredient: "jej", quantity: 50, measurement: "ml" },
    { ingredient: "jej", quantity: 50, measurement: "ml" },
  ]);

  const { addRecipe } = useAddRecipe();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    addRecipe({ ...data, user_id: userId, ingredients });
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-xl transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white p-10 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-3xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <h1 className="whitespace-nowrap px-[13rem] py-10">
              create a new recipe
            </h1>

            <form
              className="flex flex-col gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormInput
                id="name"
                type="text"
                register={{
                  ...register("name", { required: "this field is required" }),
                }}
              >
                <h3>Recipe name</h3>
              </FormInput>
              <div className="flex">
                <Ingredients
                  ingredients={ingredients}
                  setIngredients={setIngredients}
                />
              </div>
              <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                {...register("img", { required: "this field is required" })}
              />
              <div className="flex flex-col">
                <label>
                  <h3>Description</h3>
                </label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "this field is required",
                  })}
                />
              </div>
              <div className="flex flex-col">
                <label>
                  <h3>Steps</h3>
                </label>
                <textarea
                  id="steps"
                  {...register("steps", { required: "this field is required" })}
                />
              </div>
              <div className="flex flex-row-reverse gap-2 bg-gray-50 px-4 py-3">
                <Button>Add</Button>
                <Button type="danger">Cancel</Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default AddEditRecipe;
