export type Film = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  image: string;
  movie_banner: string;
  people: string[];
};

export const getFilms = async (title?: string | null) => {
  const response = await fetch("https://ghibliapi.herokuapp.com/films");
  const films: Film[] = await response.json();
  return films.filter((film) => {
    return title
      ? film.title.toLowerCase().includes(title.toLowerCase())
      : true;
  });
};

export const getFileById = async (filmId: string) => {
  const response = await fetch(
    `https://ghibliapi.herokuapp.com/films/${filmId}`
  );
  const film: Film = await response.json();
  return film;
};
