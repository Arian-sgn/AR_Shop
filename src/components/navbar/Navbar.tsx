import { NavLink } from "react-router-dom";
import Container from "../Container";
import Button from "../button/Button";

function Navbar() {
  return (
    <div className="h-16 border-b flex items-center border-gray-300 shadow-md rounded-lg">
      <Container>
        <div className="flex justify-between flex-row-reverse items-center">
          <ul className="flex flex-row-reverse">
            {/* خانه */}
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

            {/* فروشگاه */}
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
            <NavLink to="/cart">
              <Button
                className="
        text-[#00c0ff] 
        bg-[#00bfff12]
        shadow-xl
        rounded-lg
        p-3
        transition-all duration-300 ease-in-out
        hover:bg-[#00c0ff] 
        hover:text-white
        hover:shadow-xl
        font-semibold
      "
              >
                سبد خرید
              </Button>
            </NavLink>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
