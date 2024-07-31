import Button from "./Button";

function Navbar() {
  return (
    <div className="fon flex items-center justify-between p-6 text-lg font-semibold">
      <img className="w-20" src="../src/assets/logo.png" alt="logo" />
      <div className="flex w-[40rem] items-center justify-between">
        <Button type="secondary" to="home">
          All recipes
        </Button>
        <Button type="secondary" to="my-recipes">
          My recipes
        </Button>
        <Button type="secondary" to="starred-recipes">
          Starred recipes
        </Button>
      </div>
      <div className="flex gap-10">
        <Button type="secondary" to="auth/:login">
          login
        </Button>
        <Button to="auth/:signup">Signup</Button>
      </div>
    </div>
  );
}

export default Navbar;
