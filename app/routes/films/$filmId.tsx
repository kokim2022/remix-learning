import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getFileById } from "../../api/films";
import invariant from "tiny-invariant";
import { Outlet, useLoaderData } from "@remix-run/react";
import type { Film } from "~/api/films";
import FilmBanner from "~/components/FilmBanner";
import CharacterList from "../../components/CharacterList";
import CommentsList from "~/components/CommentsList";
import { addComment } from "~/api/comments";

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.filmId, "expected params.filmId"); // error ocuurs only when left side is false.
  const body = await request.formData();

  const comment = {
    name: body.get("name") as string,
    message: body.get("message") as string,
    filmId: params.filmId,
  };

  const errors = { name: "", message: "" };

  if (!comment.name) {
    errors.name = "please provide your name";
  }

  if (!comment.message) {
    errors.message = "please provide your message";
  }

  if (errors.name || errors.message) {
    const values = Object.fromEntries(body);
    console.log({ errors, values })
    return { errors, values };
  }

  await addComment(comment);

  return redirect(`/films/${params.filmId}`);
};

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
          <div className="flex-1 flex flex-col justify-between">
            <Outlet />
            <CommentsList filmId={film.id} comments={film.comments || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default film;
