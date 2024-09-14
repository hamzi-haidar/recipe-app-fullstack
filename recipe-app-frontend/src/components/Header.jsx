import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import Navbar from "./Navbar";
import AddEditRecipe from "./AddEditRecipe";

function Header() {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const curUser = user;

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <>
      <div
        ref={ref}
        className="flex h-[100vh] w-full items-center justify-center"
      >
        <img
          src="../src/assets/hero-img.jpg"
          alt="hero-img"
          className="absolute -top-[0rem] -z-10 h-full w-full object-cover"
        />
        <div className="flex flex-col items-center gap-2 pb-32">
          <img className="w-16" src="../src/assets/logo.png" alt="logo" />
          <h1 className="pb-4 text-center text-5xl font-semibold leading-relaxed text-orange-950">
            THE BEST PLACE TO
            <br />
            SHARE AND LEARN RECIPES
          </h1>
        </div>
      </div>
      <Navbar inView={inView} setOpen={setOpen} curUser={curUser.user_name} />
      <AddEditRecipe open={open} setOpen={setOpen} userId={user.user_id} />
    </>
  );
}

export default Header;
