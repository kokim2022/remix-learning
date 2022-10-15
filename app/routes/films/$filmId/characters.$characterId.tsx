import { LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { FilmCharacter, getFilmCharacter } from "../../../api/films";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
  console.log("character deail params", params);
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
