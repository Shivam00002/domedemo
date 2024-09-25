import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomesByUser } from "../store/homesSlice";

function HomeList({ userId, onEditUser }) {
  const dispatch = useDispatch();
  const homes = useSelector((state) => state.homes.list);
  const status = useSelector((state) => state.homes.status);

  useEffect(() => {
    if (userId) {
      dispatch(fetchHomesByUser(userId));
    }
  }, [userId, dispatch]);

  if (status === "loading") {
    return <div>Loading homes...</div>;
  }

  if (status === "failed") {
    return <div>Error loading homes. Please try again.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {homes.map((home) => (
        <div key={home.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{home.address}</h2>
          <p>Price: ${home.price}</p>
          <button
            onClick={() => onEditUser(home)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit User
          </button>
        </div>
      ))}
    </div>
  );
}

export default HomeList;
