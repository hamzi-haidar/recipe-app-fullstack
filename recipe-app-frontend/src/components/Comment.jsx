import { HiXMark } from "react-icons/hi2";
import { useDeleteComment } from "../services/useDeleteComment";

function Comment({ comment }) {
  const curUser = JSON.parse(localStorage.getItem("user"));

  const { deleteComment } = useDeleteComment();

  console.log(comment);

  return (
    <div className="mt-2 rounded-lg border-2 p-2">
      <div className="flex justify-between">
        <span className="text-lg font-semibold text-slate-500">
          {comment.user_name}
        </span>
        {curUser.user_name === comment.user_name && (
          <button
            onClick={() => {
              deleteComment(comment.id);
            }}
          >
            <HiXMark />
          </button>
        )}
      </div>
      <p className="whitespace-pre-wrap">{comment.comment}</p>
    </div>
  );
}

export default Comment;
