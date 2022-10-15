import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { getFileById } from "../../api/films";
import invariant from "tiny-invariant";
import { Outlet, useLoaderData } from "@remix-run/react";
import type { Film } from "~/api/films";
import FilmBanner from "~/components/FilmBanner";
import CharacterList from "../../components/CharacterList";

export const meta: MetaFunction = ({ data }) => {
  return { title: data.title, description: data.description };
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.filmId, "expected params.filmId"); // error ocuurs only when left side is false.
  const film = await getFileById(params.filmId);
  // console.log("fetching film", film);
  return film;
};

const film = () => {
  const film = useLoaderData<Film>();
  return (
    <div>
      <FilmBanner film={film} />
      <div className="p-10">
        <p>{film.description}</p>
        <div className="flex py-5 space-x-5">
          <CharacterList characters={film.characters} />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default film;
