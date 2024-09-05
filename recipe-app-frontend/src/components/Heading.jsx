import Button from "./Button";
import { useLogout } from "../services/useLogout";

function Heading({ inView, active, setActive, setOpen, curUser }) {
  const { logout } = useLogout();
  return (
    <div
      className={`z-20 flex w-full items-center gap-4 bg-white px-10 py-10 transition-all duration-300 ${
        inView
          ? "absolute -bottom-4 bg-opacity-30 backdrop-blur-3xl"
          : "fixed -top-10 translate-y-10"
      }`}
    >
      {/* <h1 className="w-60">{active}</h1> */}
      <div className="hidden w-[30rem] items-center justify-around gap-4 lg:flex">
        <Button
          active={active}
          type="secondary"
          onClick={(e) => {
            setActive(e.target.innerText);
          }}
        >
          All recipes
        </Button>
        <Button
          active={active}
          type="secondary"
          onClick={(e) => {
            setActive(e.target.innerText);
          }}
        >
          My recipes
        </Button>
        <Button
          active={active}
          type="secondary"
          onClick={(e) => {
            setActive(e.target.innerText);
          }}
        >
          Starred recipes
        </Button>
      </div>
      <select className="rounded-3xl border-2 border-orange-400 bg-transparent p-2 font-medium lg:hidden">
        <option value="All recipes">All recipes</option>
        <option value="My recipes">My recipes</option>
        <option value="Starred recipes">Starred recipes</option>
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

export default Heading;
