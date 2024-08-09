import Button from "./Button";

function Navbar() {
  return (
    <div className="flex items-center justify-end p-8 text-lg font-semibold">
      {/* <img className="w-16" src="../src/assets/logo.png" alt="logo" /> */}
      <div className="flex gap-10">
        {/* <Button type="secondary" to="auth/:login">
          login
        </Button>
        <Button to="auth/:signup">Signup</Button> */}
      </div>
    </div>
  );
}

export default Navbar;
