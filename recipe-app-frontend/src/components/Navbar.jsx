import Button from "./Button";
import { useLogout } from "../services/useLogout";
import { useSearchParams } from "react-router-dom";

function Navbar({ inView, setOpen, curUser }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { logout } = useLogout();
  return (
    <div
      className={`z-20 flex w-full items-center gap-4 bg-white px-10 py-10 transition-all duration-300 ${
        inView
          ? "absolute -bottom-4 bg-opacity-30 backdrop-blur-3xl"
          : "fixed -top-10 translate-y-10"
      }`}
    >
      <div className="hidden w-[30rem] items-center justify-around gap-4 lg:flex">
        <Button
          type="secondary"
          onClick={(e) => {
            searchParams.set("filter", "all-recipes");
            setSearchParams(searchParams);
          }}
        >
          All recipes
        </Button>
        <Button
          type="secondary"
          onClick={(e) => {
            searchParams.set("filter", "my-recipes");
            setSearchParams(searchParams);
          }}
        >
          My recipes
        </Button>
        <Button
          type="secondary"
          onClick={(e) => {
            searchParams.set("filter", "starred-recipes");
            setSearchParams(searchParams);
          }}
        >
          Starred recipes
        </Button>
      </div>
      <select
        className="rounded-3xl border-2 border-orange-400 bg-transparent p-2 font-medium lg:hidden"
        value={searchParams.get("filter") || "all-recipes"}
        onChange={(e) => {
          console.log(e.target.value);
          searchParams.set("filter", e.target.value);
          setSearchParams(searchParams);
        }}
      >
        <option value="all-recipes">All recipes</option>
        <option value="my-recipes">My recipes</option>
        <option value="starred-recipes">Starred recipes</option>
      </select>
      <Button onClick={() => setOpen(true)}>
        <span className="lg:hidden">Add</span>
        <span className="hidden lg:block">Add recipe</span>
      </Button>
      <div className="ml-auto flex items-center justify-center gap-2 sm:flex-row sm:gap-4">
        <p className="text-sm font-bold md:text-lg">{curUser}</p>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}

export default Navbar;
