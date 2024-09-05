import { useParams } from "react-router-dom";
import { useRecipe } from "../services/useRecipe";
import Loader from "./Loader";
import Button from "./Button";
import { HiMiniStar } from "react-icons/hi2";
import { HiOutlineStar } from "react-icons/hi";
import Ingredients from "./Ingredients";
import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import { useStar } from "../services/useStar";

function RecipeDetails() {
  const [open, setOpen] = useState(false);

  const params = useParams();

  const { user_name: curUser, user_id } = JSON.parse(
    localStorage.getItem("user"),
  );

  const { isLoading, recipe } = useRecipe(params.id, user_id);
  const { updateStar } = useStar();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  if (isLoading) return <Loader />;

  const {
    name,
    image_url,
    description,
    user_name,
    stars,
    is_starred,
    ingredients,
    steps,
  } = recipe[0];

  return (
    <div className="mx-20 mb-10 flex w-full flex-col gap-16 p-10">
      <div className="text-xl font-medium">
        <Button type="secondary" to={-1}>
          ← Back
        </Button>
      </div>
      <div className="mx-4 flex flex-wrap items-center justify-between gap-4">
        <div className="w-[20rem]">
          <img
            className="h-[20rem] w-[20rem] overflow-hidden rounded-full object-cover"
            src={image_url}
            alt={name}
          />
        </div>
        <div className="flex w-[70%] flex-col gap-12">
          <div className="flex justify-between">
            <h3>{name}</h3>
            <p>By {user_name}</p>
          </div>
          <div>{description}</div>
          <div className="flex justify-between gap-10">
            {curUser === user_name && (
              <div className="flex gap-4">
                <Button>Edit recipe</Button>
                <Button type="danger" onClick={() => setOpen(true)}>
                  Delete
                </Button>
                <DeleteModal
                  open={open}
                  setOpen={setOpen}
                  id={params.id}
                  image_url={image_url}
                />
              </div>
            )}
            <Button type="secondary">Comments</Button>
            <div className="flex items-center">
              {stars ? stars : 0}
              <Button
                type="secondary"
                onClick={() => {
                  updateStar({
                    recipe_id: params.id,
                    user_id,
                    is_starred: is_starred,
                  });
                }}
              >
                {is_starred ? (
                  <HiMiniStar size="1.7rem" />
                ) : (
                  <HiOutlineStar size="1.7rem" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Ingredients ingredients={ingredients} />
      <div className="flex flex-col gap-5">
        <h1>steps</h1>
        <p>{steps}</p>
      </div>
    </div>
  );
}

export default RecipeDetails;
