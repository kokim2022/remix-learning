import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// the loader is server side.
export const loader: LoaderFunction = async () => {
  const response = await fetch("https://ghibliapi.herokuapp.com/films");
  return response.json();
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: "styles" }];
};

export const meta: MetaFunction = () => ({
  title: "Kokim Film Studio",
  description: "list of films",
});

// client side on their browser.
const index = () => {
  // hook to get loader data
  const films = useLoaderData();
  return (
    <div>
      films
      <div>
        {films.map((film) => {
          return <div>{film.title}</div>;
        })}
      </div>
    </div>
  );
};

export default index;
