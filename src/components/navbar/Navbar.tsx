import { NavLink } from "react-router-dom";
import Container from "../Container";
import Button from "../button/Button";
import { useCart } from "../../shopping cart context/useCart";

function Navbar() {
  const { cartQTY } = useCart();

  return (
    <div className="h-16 border-b flex items-center border-gray-300 shadow-md rounded-lg">
      <Container>
        <div className="flex justify-between flex-row-reverse items-center">
          <ul className="flex flex-row-reverse">
            <li className="ml-8">
              <NavLink
                to="/"
                className={({ isActive }: { isActive: boolean }) =>
                  `relative pb-1 transition-all ${
                    isActive ? "text-[#00c0ff]" : "text-black"
                  }`
                }
              >
                {({ isActive }: { isActive: boolean }) => (
                  <span className="relative group">
                    خانه
                    <span
                      className={`
                        absolute right-0 bottom-0 h-0.5 bg-[#00c0ff]
                        transition-all duration-300
                        ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                      `}
                    ></span>
                  </span>
                )}
              </NavLink>
            </li>

            <li className="ml-8">
              <NavLink
                to="/store"
                className={({ isActive }: { isActive: boolean }) =>
                  `relative pb-1 transition-all ${
                    isActive ? "text-[#00c0ff]" : "text-black"
                  }`
                }
              >
                {({ isActive }: { isActive: boolean }) => (
                  <span className="relative group">
                    فروشگاه
                    <span
                      className={`
                        absolute right-0 bottom-0 h-0.5 bg-[#00c0ff]
                        transition-all duration-300
                        ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                      `}
                    ></span>
                  </span>
                )}
              </NavLink>
            </li>
          </ul>

          <div>
            <NavLink className="relative" to="/cart">
              <svg
                className="h-12 w-12 color-red-400"
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.88 111.85"
              >
                <path d="M4.06,8.22A4.15,4.15,0,0,1,0,4.06,4.13,4.13,0,0,1,4.06,0h6A19.12,19.12,0,0,1,20,2.6c5.44,3.45,6.41,8.38,7.8,13.94h91a4.07,4.07,0,0,1,4.06,4.06,5,5,0,0,1-.21,1.25L112.06,64.61a4,4,0,0,1-4,3.13H41.51c1.46,5.41,2.92,8.32,4.89,9.67C48.8,79,53,79.08,59.93,79h47.13a4.06,4.06,0,0,1,0,8.12H60c-8.63.1-13.94-.11-18.2-2.91s-6.66-7.91-8.95-17h0L18.94,14.46c0-.1,0-.1-.11-.21a7.26,7.26,0,0,0-3.12-4.68A10.65,10.65,0,0,0,10,8.22H4.06Zm80.32,25a2.89,2.89,0,0,1,5.66,0V48.93a2.89,2.89,0,0,1-5.66,0V33.24Zm-16.95,0a2.89,2.89,0,0,1,5.67,0V48.93a2.89,2.89,0,0,1-5.67,0V33.24Zm-16.94,0a2.89,2.89,0,0,1,5.66,0V48.93a2.89,2.89,0,0,1-5.66,0V33.24Zm41.72-8.58H30.07l9.26,34.86H105l8.64-34.86Zm2.68,67.21a10,10,0,1,1-10,10,10,10,0,0,1,10-10Zm-43.8,0a10,10,0,1,1-10,10,10,10,0,0,1,10-10Z" />
              </svg>
              {cartQTY !== 0 ? (
                <span className="p-1 w-7 absolute flex justify-center items-center top-4 right-9 bg-[#00c0ff] text-white font-bold rounded-full">
                  {cartQTY}
                </span>
              ) : (
                ""
              )}
            </NavLink>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
