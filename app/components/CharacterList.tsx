import { NavLink } from "@remix-run/react";
import type { FilmCharacter } from "~/api/films";

type CharacterListProps = {
  characters?: FilmCharacter[];
};
export default function CharacterList({ characters }: CharacterListProps) {
  return (
    <div className="flex-1 max-w-md">
      <h3 className="text-3xl">Characters</h3>

      <ul className="flex flex-col space-y-3 my-3">
        {characters?.map((character) => (
          // eslint-disable-next-line react/jsx-key
          <li>{character.name}</li>
        ))}
      </ul>
    </div>
  );
}
