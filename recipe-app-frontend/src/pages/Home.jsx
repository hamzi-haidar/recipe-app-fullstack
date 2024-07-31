import Heading from "../components/Heading";
import Hero from "../components/Hero";
import Recipes from "../components/Recipes";

function Home() {
  return (
    <>
      <Hero />
      <Heading>All Recipes</Heading>
      <Recipes />
    </>
  );
}

export default Home;
