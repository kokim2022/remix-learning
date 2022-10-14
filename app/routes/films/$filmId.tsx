import type { LoaderFunction } from "@remix-run/node";
import { getFileById } from "../../api/films";
import invariant from "tiny-invariant";
import { useLoaderData } from "@remix-run/react";
import type { Film } from "~/api/films";
import FilmBanner from "~/components/FilmBanner";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.filmId, "expected params.filmId"); // error ocuurs only when left side is false.
  const film = await getFileById(params.filmId);
  console.log("fetching film", film.title);
  return film;
};

const film = () => {
  const film = useLoaderData<Film>();
  return (
    <div>
      <FilmBanner film={film} />
    </div>
  );
};

export default film;
