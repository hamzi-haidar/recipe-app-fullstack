import { useMutation, useQueryClient } from "@tanstack/react-query";
import BASEURL from "./config";
import { toast } from "react-toastify";

async function updateRecipeApi(data) {
  const { steps, name, description, ingredients, image_url, id } = data;

  const imgFile = data.img[0];
  const imageName = `${Date.now()}_${imgFile?.name}`;
  const s3Url = imgFile
    ? `https://recipe-app-images-bucket.s3.eu-north-1.amazonaws.com/${imageName}`
    : image_url;

  try {
    if (imgFile) {
      const res = await fetch(s3Url, {
        method: "PUT",
        headers: {
          "Content-Type": imgFile.type,
        },
        body: imgFile,
      });

      if (!res.ok) {
        throw new Error("Couldn't update image");
      }
    }

    const newRecipe = {
      name,
      steps,
      description,
      id,
      image_url: s3Url,
      ingredients,
    };

    const res2 = await fetch(BASEURL + "/recipes/update.php", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newRecipe),
    });

    const data = await res2.json();

    if (data.status === "unsuccessful") {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export function useUpdateRecipe() {
  const queryClient = useQueryClient();

  const { mutate: updateRecipe, isPending } = useMutation({
    mutationFn: updateRecipeApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("recipe");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateRecipe, isPending };
}
