import React, { useEffect, useState } from "react";
import { Cellar } from "../../components/Cellar/Cellar";
import axios from "axios";

export const CellarsPage = () => {
  const [cellars, setCellars] = useState([{}]);
  const headers = {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  };

  const getCellars = async () => {
    try {
      const { data } = await axios("http://localhost:3000/cellar/get", {
        headers: headers,
      });
      if (data.cellars) {
        setCellars(data.cellars);
        console.log(data.cellars);
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || "Error getting cellars");
    }
  };

  useEffect(() => getCellars, []);

  return (
    <>
      <h1>Cellars Page</h1>
      {cellars.map(
        ({ name, description, location, size, availability, price }, i) => {
          return (
            <Cellar
              key={i}
              name={name}
              description={description}
              location={location}
              size={size}
              availability={availability}
              price={price}
            ></Cellar>
          );
        }
      )}
    </>
  );
};
