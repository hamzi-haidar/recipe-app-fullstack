import { useMutation, useQueryClient } from "@tanstack/react-query";
import BASEURL from "./config";
import { toast } from "react-toastify";

async function addRecipeApi(data) {
  const { steps, name, user_id, description, ingredients } = data;

  const imgFile = data.img[0];
  const imageName = `${Date.now()}_${imgFile.name}`;
  const s3Url = `https://recipe-app-images-bucket.s3.eu-north-1.amazonaws.com/${imageName}`;

  try {
    const res = await fetch(s3Url, {
      method: "PUT",
      headers: {
        "Content-Type": imgFile.type,
      },
      body: imgFile,
    });

    if (!res.ok) {
      throw new Error("Couldn't add image");
    }

    const newRecipe = {
      name,
      steps,
      description,
      user_id,
      image_url: s3Url,
      ingredients,
    };

    const res2 = await fetch(BASEURL + "/recipes/add.php", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newRecipe),
    });

    const data = await res2.json();

    if (res2.status === "unsuccessful") {
      throw new Error("couldn't add recipe");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

function useAddRecipe() {
  const queryClient = useQueryClient();

  const { mutate: addRecipe, isPending } = useMutation({
    mutationFn: addRecipeApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["recipes"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addRecipe, isPending };
}

export default useAddRecipe;
