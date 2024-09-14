import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { HiXMark } from "react-icons/hi2";
import Comment from "./Comment";
import Button from "./Button";
import { useState } from "react";
import { useAddComment } from "../services/useAddComment";
import { useComments } from "../services/useComments";

function CommentsModal({ open, setOpen, recipe_id, user_id }) {
  const [comment, setComment] = useState("");

  const { comments } = useComments(recipe_id);

  const { addComment } = useAddComment();

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
            <div className="mb-4 flex items-center justify-between">
              <h3 className="mr-10">Comments</h3>
              <button onClick={() => setOpen(false)}>
                <HiXMark />
              </button>
            </div>

            {comments?.length === 0 ? (
              <p>No comments yet</p>
            ) : (
              <div className="max-h-60 overflow-y-auto">
                {comments?.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </div>
            )}
            <div className="my-10 flex h-10 items-center gap-2">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment"
                className="h-20 w-full resize-none rounded-lg border-2 border-slate-500 p-2"
              />
              <Button
                onClick={() => {
                  if (comment === "") return;
                  addComment(
                    { recipe_id, user_id, comment },
                    {
                      onSuccess: () => {
                        setComment("");
                      },
                    },
                  );
                }}
              >
                comment
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default CommentsModal;
