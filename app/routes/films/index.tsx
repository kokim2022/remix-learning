import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Film, getFilms } from "~/api/films";

// the loader is server side.
export const loader: LoaderFunction = async ({ request }) => {
  // get url from request
  const url = new URL(request.url);
  // get title parameter.
  const title = url.searchParams.get("title");
  return await getFilms(title);
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
  const films = useLoaderData<Film[]>();
  return (
    <div className="p-16 font-sans">
      <div className="text-5xl font-bold text-center">Sudio Ko Kim</div>
      {/* html form get */}
      {/* recommend to use remix form */}
      <Form reloadDocument method="get" className="py-5">
        <label className="font-bold">
          Search{" "}
          <input
            type="text"
            placeholder="type a title ..."
            className="border-2 rounded py-2 px-3"
            name="title"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:blue-700 text-white font-bold py-2 px-4 rounded mx-2"
        >
          Search
        </button>
      </Form>
      {/* <pre>{JSON.stringify(films, null, 3)}</pre> */}
      <div className="grid grid-cols-4 gap-4">
        {films.map((film) => {
          return (
            // hover:scale-105 is used to increase 5% of object while hover.
            // eslint-disable-next-line react/jsx-key
            <div className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer">
              <div>{film.title}</div>
              <img src={film.image} alt={film.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default index;
