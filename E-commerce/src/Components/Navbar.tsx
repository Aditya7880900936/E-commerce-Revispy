import { navItems } from "../Data";
import UpperBadge from "./UpperBadge";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 flex flex-col ">
      <UpperBadge />
      <nav className="flex justify-between items-center bg-white pb-3 px-4 shadow-md">
        <div>
          <img src="/ECOMMERCE.svg" alt="logo" />
        </div>
        <div className="flex items-center justify-center space-x-12">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="text-black font-semibold"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <img src="/Search.svg" alt="Search Logo" />
          <img src="/Cart.svg" alt="Cart Logo" />
        </div>
      </nav>
      <div className="bg-[#F4F4F4] flex items-center justify-center gap-2 p-1">
        <span>&lt;</span>
        <p>Get 10% off on business Sign-up</p>
        <span>&gt;</span>
      </div>
    </div>
  );
};

export default Navbar;
