import Button from "./Button";

function Hero() {
  return (
    <div className="flex h-[30rem] w-full items-center justify-center">
      <img
        src="../src/assets/hero-img.jpg"
        alt="hero-img"
        className="absolute -top-[10rem] -z-10 h-screen w-screen object-cover"
      />
      <div className="flex flex-col items-center gap-6 pb-40">
        <img className="w-20" src="../src/assets/logo.png" alt="logo" />
        <h1 className="text-center text-4xl font-semibold leading-relaxed">
          SHARE RECIPES
          <br />
          WITH OTHERS
        </h1>

        <Button to="/my-recipes">Start sharing</Button>
      </div>
    </div>
  );
}

export default Hero;
