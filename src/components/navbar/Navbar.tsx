import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container";

function Navbar() {
  return (
    <div className="h-16 border-b rounded-md shadow flex items-center">
      <Container>
        <div className="flex justify-between flex-row-reverse items-center">
          <ul className="flex flex-row-reverse">
            <li>
              <Link to={"/"} className="ml-8">خانه</Link>
            </li>
            <li>
              <Link to={"/store"} className="ml-8">فروشگاه</Link>
            </li>
          </ul>
          <div>
            <button>سبد خرید</button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
