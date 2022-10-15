import type { Comment } from "~/api/comments";

type CommentsListProps = {
  filmId: string;
  comments: Comment[];
};

export default function CommentsList({ filmId, comments }: CommentsListProps) {
  return (
    <div>
      <h2 className="text-3xl mb-2">Community Comments</h2>

      <div className="flex flex-col space-y-4 my-3">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 rounded border border-slate-400">
            <div className="text-gray-700 font-bold text-xl mb-2">
              {comment.name}
            </div>
            <p className="text-gray-700">{comment.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
