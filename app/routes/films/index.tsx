import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// the loader is server side.
export const loader: LoaderFunction = () => {
  return { message: "Hello World" };
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
  const data = useLoaderData();
  return <div>films {data.message}</div>;
};

export default index;
