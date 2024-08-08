import { useInView } from "react-intersection-observer";
import Hero from "../components/Hero";
import Recipes from "../components/Recipes";

function Home() {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <>
      <Hero ref={ref} />
      <Recipes inView={inView} />
    </>
  );
}

export default Home;
