import type { LoaderFunction } from "@remix-run/node";
import { getFileById } from "../../api/films";
import invariant from "tiny-invariant";
import { useLoaderData } from "@remix-run/react";
import type { Film } from "~/api/films";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.filmId, "expected params.filmId"); // error ocuurs only when left side is false.
  const film = await getFileById(params.filmId);
  return film;
};

const film = () => {
  const film = useLoaderData<Film>();
  return <div>{film.title}</div>;
};

export default film; 
