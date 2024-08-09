import { HiOutlineStar } from "react-icons/hi";
import Button from "./Button";
import { HiMiniStar } from "react-icons/hi2";

function Recipe({ data, curUser }) {
  const { id, name, image_url, description, user_name, stars, is_starred } =
    data;

  return (
    <div className="mx-4 flex flex-wrap items-center justify-around gap-4 lg:w-[60rem]">
      <div className="w-[15rem]">
        <img
          className="h-[15rem] w-[30rem] overflow-hidden rounded-full object-cover"
          src={image_url}
          alt={name}
        />
      </div>
      <div className="flex w-[70%] flex-col gap-8">
        <div className="flex justify-between">
          <h3>{name}</h3>
          <p>By {user_name}</p>
        </div>
        <div>{description.slice(0, 190)} ...</div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button to={"/recipe/" + id}>Learn recipe</Button>
            {curUser === user_name && <Button type="danger">Delete</Button>}
          </div>
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
  );
}

export default Recipe;
