import { useParams } from "react-router-dom";
import { useRecipe } from "../services/useRecipe";
import Loader from "./Loader";
import Button from "./Button";
import { HiMiniStar } from "react-icons/hi2";
import { HiOutlineStar } from "react-icons/hi";
import Ingredients from "./Ingredients";
import { useEffect } from "react";

function RecipeDetails() {
  const params = useParams();

  const { isLoading, recipe } = useRecipe(params.id);

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
    <div className="mx-20 mb-10 flex flex-col gap-16">
      <div className="text-xl font-medium">
        <Button type="secondary" to={-1}>
          ← Back
        </Button>
      </div>
      <div className="mx-4 flex flex-wrap items-center justify-between gap-4 lg:w-[90%]">
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
          <div className="flex justify-between">
            <Button>Edit recipe</Button>
            <Button type="secondary">Comments</Button>
            <div className="flex items-center">
              {stars ? stars : 0}
              <Button type="secondary">
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
        <p>
          {steps} Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Deleniti incidunt aliquam sed libero earum quod neque exercitationem
          dolor, facere, accusamus eaque sapiente deserunt inventore ratione
          commodi fugiat vel, culpa assumenda. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Deleniti incidunt aliquam sed libero
          earum quod neque exercitationem dolor, facere, accusamus eaque
          sapiente deserunt inventore ratione commodi fugiat vel, culpa
          assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Deleniti incidunt aliquam sed libero earum quod neque exercitationem
          dolor, facere, accusamus eaque sapiente deserunt inventore ratione
          commodi fugiat vel, culpa assumenda. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Deleniti incidunt aliquam sed libero
          earum quod neque exercitationem dolor, facere, accusamus eaque
          sapiente deserunt inventore ratione commodi fugiat vel, culpa
          assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Deleniti incidunt aliquam sed libero earum quod neque exercitationem
          dolor, facere, accusamus eaque sapiente deserunt inventore ratione
          commodi fugiat vel, culpa assumenda. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Deleniti incidunt aliquam sed libero
          earum quod neque exercitationem dolor, facere, accusamus eaque
          sapiente deserunt inventore ratione commodi fugiat vel, culpa
          assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Deleniti incidunt aliquam sed libero earum quod neque exercitationem
          dolor, facere, accusamus eaque sapiente deserunt inventore ratione
          commodi fugiat vel, culpa assumenda. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Deleniti incidunt aliquam sed libero
          earum quod neque exercitationem dolor, facere, accusamus eaque
          sapiente deserunt inventore ratione commodi fugiat vel, culpa
          assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Deleniti incidunt aliquam sed libero earum quod neque exercitationem
          dolor, facere, accusamus eaque sapiente deserunt inventore ratione
          commodi fugiat vel, culpa assumenda.
        </p>
      </div>
    </div>
  );
}

export default RecipeDetails;
