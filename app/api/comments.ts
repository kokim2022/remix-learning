export type Comment = {
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
