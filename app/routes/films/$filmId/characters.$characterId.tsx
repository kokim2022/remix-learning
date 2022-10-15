import type { LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import type { FilmCharacter } from "../../../api/films";
import { getFilmCharacter } from "../../../api/films";
import { useCatch, useLoaderData } from "@remix-run/react";


export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.characterId, "expected params.characterId");
  return getFilmCharacter(params.characterId);
};
const character = () => {
  const characterDetail = useLoaderData<FilmCharacter>();
  return (
    <div className="mb-3">
      <div className="text-3xl mb-2">Character Details</div>
      <div className="p-4 rounded shadow-lg border">
        <div className="text-gray-700 font-bold text-xl mb-2">
          {characterDetail.name}
        </div>
        <ul className="py-2">
          <li>Gender: {characterDetail.gender}</li>
          <li>Age: {characterDetail.age}</li>
          <li>Eye Color: {characterDetail.eye_color}</li>
          <li>Hair Color: {characterDetail.hair_color}</li>
        </ul>
      </div>
    </div>
  );
};

export default character;

/**
 * errors expect to happen
 * @returns
 */
export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div className="mb-3">
        <div className="text-3xl mb-2">Details</div>
        <div className="p-4 rounded shadow-lg border bg-orange-200 border-orange-600">
          <div className="text-gray-700 font-bold text-xl mb-2">
            {caught.statusText}
          </div>
          <p>
            {caught.status} {caught.statusText}
          </p>
        </div>
      </div>
    );
  }

  throw new Error("Unkown error");
}

/**
 * errors don't expect to happen
 * @param param0
 * @returns
 */
export function ErrorBoundary({ error }: any) {
  return (
    <div className="mb-3">
      <div className="text-3xl mb-2">Details</div>
      <div className="p-4 rounded shadow-lg border bg-rose-200 border-rose-600">
        <div className="text-gray-700 font-bold text-xl mb-2">
          Uh oh... Sorry something went wrong!
        </div>
        <p>{error?.message}</p>
      </div>
    </div>
  );
}
