import React from "react";

export const Lease = ({
  account = {},
  cellar = {},
  user = {},
  total,
}) => {

  const {
    dpi,
    name: nameAccount,
    surname: surnameAccount,
    age,
    phone: phoneAccount,
    email,
  } = account;
  const {
    name: nameCellar,
    description,
    location,
    size,
    availability,
    price,
  } = cellar;
  const {
    name: nameUser,
    surname: surnameUser,
    username,
    phone: phoneUser,
  } = user;

  return (
    <>
      <div>

        {/* <img className="card-img-top" src="../../assets/bodega1.png" alt="Card image cap"/> */}
        <div className="card-body" style={{ color: "#000" }}>
          <h5 className="card-title"></h5>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item"><h6>Account:</h6> {nameAccount}</li>
          <li className="list-group-item">{surnameAccount}</li>
          <li className="list-group-item">{email}</li>
        </ul>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><h6>Cellar:</h6> {nameCellar}</li>
          <li className="list-group-item">{location}</li>
          <li className="list-group-item">{price}</li>
        </ul>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><h6>User:</h6> {nameUser}</li>
          <li className="list-group-item">{surnameUser}</li>
          <li className="list-group-item">{username}</li>
          <li className="list-group-item">{total}</li>
        </ul>
      </div>
    </>
  );
};
