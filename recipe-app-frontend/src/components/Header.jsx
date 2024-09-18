import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Navbar from "./Navbar";
import AddEditRecipe from "./AddEditRecipe";

export default function Header() {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const curUser = user;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  const inView = useInView(containerRef, { amount: 0.1 });

  return (
    <>
      <motion.div
        ref={containerRef}
        className="relative flex h-[100vh] w-full items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute left-0 top-0 h-full w-full will-change-transform"
          style={{ y: backgroundY }}
        >
          <img
            src="../src/assets/hero-img.jpg"
            alt="hero-img"
            className="h-[120%] w-full object-cover"
          />
        </motion.div>
        <motion.div
          className="relative z-10 flex flex-col items-center gap-2 pb-32 will-change-transform"
          style={{ y: textY }}
          initial={{ opacity: 0, y: 300 }}
          animate={{ opacity: 1, y: 1 }}
          transition={{ delay: 0.4 }}
        >
          <img className="w-16" src="../src/assets/logo.png" alt="logo" />
          <h1 className="pb-4 text-center text-5xl font-semibold leading-relaxed text-orange-950">
            THE BEST PLACE TO
            <br />
            SHARE AND LEARN RECIPES
          </h1>
        </motion.div>
      </motion.div>
      <Navbar inView={inView} setOpen={setOpen} curUser={curUser.user_name} />
      <AddEditRecipe open={open} setOpen={setOpen} userId={user.user_id} />
    </>
  );
}
