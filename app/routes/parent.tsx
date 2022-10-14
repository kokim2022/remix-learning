import { Outlet } from "@remix-run/react";

/**
 * layout routes
 * @returns
 */
const parent = () => {
  return (
    <div className="p-10">
			{/* outlet is used for layout route */}
      <Outlet />
    </div>
  );
};

export default parent;
