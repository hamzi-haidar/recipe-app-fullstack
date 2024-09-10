import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Button from "./Button";
import { useDeleteRecipe } from "../services/useDeleteRecipe";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function DeleteModal({ open, setOpen, id, image_url }) {
  const { deleteRecipe, isPending } = useDeleteRecipe();

  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-30">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-2xl transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white p-10 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-3xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="flex h-10 items-center gap-4">
              <h3 className="mr-10">
                Are you sure you want to delete this recipe
              </h3>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                type="danger"
                onClick={() => {
                  deleteRecipe(
                    { id, image_url },
                    {
                      onSuccess: () => {
                        navigate(-1);
                      },
                    },
                  );
                }}
              >
                {isPending ? <Loader type="mini" /> : "Delete"}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteModal;
