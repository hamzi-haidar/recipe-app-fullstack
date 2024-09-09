import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Button from "./Button";
import FormInput from "./FormInput";
import Ingredients from "./Ingredients";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAddRecipe from "../services/useAddRecipe";
import Loader from "./Loader";

function AddEditRecipe({ open, setOpen, userId }) {
  const [ingredients, setIngredients] = useState([]);

  const { addRecipe, isPending } = useAddRecipe();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset();
    setIngredients([]);
  }, [open, reset]);

  function onSubmit(data) {
    if (ingredients.length === 0) return;
    addRecipe(
      { ...data, user_id: userId, ingredients },
      { onSuccess: () => setOpen(false) },
    );
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-30">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-2xl transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white p-10 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-3xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <h1 className="whitespace-nowrap py-10 text-center">
              create a new recipe
            </h1>

            <form
              className="flex flex-col gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormInput
                id="name"
                type="text"
                error={errors?.name?.message}
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
              <div className="relative flex flex-col gap-2">
                <label htmlFor="img">
                  <h3>Add image</h3>
                </label>
                <input
                  className="w-64 rounded-2xl border-2 border-orange-400"
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  {...register("img", { required: "this field is required" })}
                />
                {errors?.img?.message && (
                  <span className="absolute -bottom-6 text-sm text-red-500">
                    {errors.img.message}
                  </span>
                )}
              </div>
              <div className="relative flex flex-col gap-2">
                <label>
                  <h3>Description</h3>
                </label>
                <textarea
                  className="h-40 rounded-lg border-2 border-black"
                  id="description"
                  {...register("description", {
                    required: "this field is required",
                  })}
                />
                {errors?.description?.message && (
                  <span className="absolute -bottom-6 text-sm text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div className="relative flex flex-col gap-2">
                <label>
                  <h3>Steps</h3>
                </label>
                <textarea
                  className="h-40 rounded-lg border-2 border-black"
                  id="steps"
                  {...register("steps", { required: "this field is required" })}
                />
                {errors?.steps?.message && (
                  <span className="absolute -bottom-6 text-sm text-red-500">
                    {errors.steps.message}
                  </span>
                )}
              </div>
              <div className="flex flex-row-reverse gap-2 bg-gray-50 px-4 py-3">
                <Button disabled={isPending ? true : false}>
                  {isPending ? <Loader type="mini" /> : "Add"}
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                  }}
                  type="danger"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default AddEditRecipe;
