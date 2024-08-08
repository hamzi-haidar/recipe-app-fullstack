import Button from "./Button";
import { useLogout } from "../services/useLogout";

function Heading({ inView, active, setActive }) {
  const { logout } = useLogout();
  return (
    <div
      className={`flex w-full items-center gap-10 bg-white px-20 py-10 transition-all duration-300 ${
        inView
          ? "absolute -bottom-3 bg-opacity-30 backdrop-blur-2xl"
          : "fixed -top-20 translate-y-20"
      }`}
    >
      <h1 className="w-60">{active}</h1>
      <div className="flex w-[30rem] items-center justify-around gap-4">
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
      <button className="ml-auto" onClick={logout}>
        Log out
      </button>
    </div>
  );
}

export default Heading;
