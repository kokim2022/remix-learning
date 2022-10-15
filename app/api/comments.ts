export type Comment = {
  id?: string;
  name: string;
  message: string;
  filmId: string;
};

// get comments by filmId
export const getComments = async (filmId: string): Promise<Comment[]> => {
  const response = await fetch(
    `http://localhost:3001/comments?filmId=${filmId}`
  );
  return response.json();
};

/**
 * added comment
 * @param comment
 * @returns
 */
export async function addComment(comment: Comment) {
  const response = await fetch("http://localhost:3001/comments", {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
