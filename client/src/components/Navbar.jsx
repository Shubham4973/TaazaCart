import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false); // mobile drawer
  const [searchOpen, setSearchOpen] = useState(false); // mobile search overlay
  const [profileOpen, setProfileOpen] = useState(false); // desktop profile dropdown

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // helper to open mobile search (close drawer if open)
  const openMobileSearch = () => {
    setOpen(false);
    setSearchOpen(true);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-8 lg:px-20 xl:px-32 py-4 bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 z-[9999] shadow-sm">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={() => {
            setOpen(false);
            setSearchOpen(false);
          }}
        >
          <img
            className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
            src={assets.logo}
            alt="Logo"
          />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-[17px] font-semibold text-gray-700">
          {["Home", "All Products", "Contact", "Seller"].map((item, i) => (
            <NavLink
              key={i}
              to={
                item === "Home"
                  ? "/"
                  : item === "Contact"
                  ? "/contact"
                  : item === "Seller"
                  ? "/seller"
                  : "/products"
              }
              className={({ isActive }) =>
                `relative group transition ${
                  isActive ? "text-primary" : "hover:text-primary"
                }`
              }
            >
              {item}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          ))}

          {/* Desktop Search Box - slightly smaller for balanced spacing */}
          <div className="hidden lg:flex items-center gap-2 border border-gray-300 px-3 py-1.5 rounded-full shadow-sm focus-within:border-primary transition-all w-48">
            <input
              value={searchQuery || ""}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none placeholder-gray-400 text-sm"
              type="text"
              placeholder="Search Products...."
            />
            <img
              src={assets.search_icon}
              alt="search"
              className="h-4 w-4 opacity-70"
            />
          </div>

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <img
              src={assets.nav_cart_icon}
              alt="cart"
              className="w-7 opacity-80 hover:opacity-100 transition"
            />
            <span className="absolute -top-2 -right-3 flex items-center justify-center text-[11px] font-semibold text-white bg-primary w-[20px] h-[20px] rounded-full shadow-md ring-2 ring-white">
              {getCartCount()}
            </span>
          </div>

          {/* Auth / Profile */}
          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="px-6 py-2 bg-primary hover:bg-primary-dark transition text-white rounded-full shadow-md hover:shadow-lg"
            >
              Login
            </button>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <img
                src={assets.profile_icon}
                alt="profile"
                className="w-10 cursor-pointer rounded-full border border-gray-200 hover:scale-105 transition"
              />
              <ul
                className={`absolute ${
                  profileOpen ? "flex" : "hidden"
                } flex-col top-12 right-0 bg-white shadow-lg border border-gray-100 py-2 w-44 rounded-lg text-sm animate-fadeIn z-40`}
              >
                <li
                  onClick={() => {
                    navigate("my-orders");
                    setProfileOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-primary/10 cursor-pointer transition"
                >
                  My Orders
                </li>
                <li
                  onClick={() => {
                    logout();
                    setProfileOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-primary/10 cursor-pointer transition"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Search Icon (mobile) */}
          <button
            onClick={openMobileSearch}
            aria-label="Open search"
            className="p-1"
          >
            <img
              src={assets.search_icon}
              alt="search"
              className="w-6 opacity-80 hover:opacity-100"
            />
          </button>

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <img
              src={assets.nav_cart_icon}
              alt="cart"
              className="w-6 opacity-80 hover:opacity-100"
            />
            <span className="absolute -top-2 -right-3 flex items-center justify-center text-[11px] font-semibold text-white bg-primary w-[20px] h-[20px] rounded-full shadow-md">
              {getCartCount()}
            </span>
          </div>

          {/* Menu Button */}
          <button
            onClick={() => {
              setOpen((s) => !s);
              setSearchOpen(false);
            }}
            aria-label="Menu"
          >
            <img src={assets.menu_icon} alt="menu" className="w-7" />
          </button>
        </div>
      </nav>

      {/* ================== Mob  ile Search Overlay ================== */}
      {searchOpen && (
        <>
          {/* overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-[9998]"
            onClick={() => setSearchOpen(false)}
          />

          <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-4">
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  value={searchQuery || ""}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setSearchOpen(false);
                  }}
                  className="w-full border border-gray-200 rounded-full px-4 py-2 outline-none"
                  placeholder="Search products.."
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="ml-2 p-2 rounded-full bg-gray-100"
                  aria-label="Close search"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ================== Mobile Menu Drawer ================== */}
      {open && (
        <>
          {/* overlay behind drawer */}
          <div
            className="fixed inset-0 bg-black/40 z-[9998]"
            onClick={() => setOpen(false)}
          />

          {/* drawer */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl flex flex-col items-start gap-4 px-6 py-6 text-base md:hidden z-[9999] overflow-y-auto">
            <button
              onClick={() => setOpen(false)}
              className="self-end text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="w-full text-gray-900 py-2"
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setOpen(false)}
              className="w-full text-gray-900 py-2"
            >
              All Products
            </NavLink>
            <NavLink
              to="/seller"
              onClick={() => setOpen(false)}
              className="w-full text-gray-900 py-2"
            >
              Seller
            </NavLink>
            {user && (
              <NavLink
                to="/my-orders"
                onClick={() => setOpen(false)}
                className="w-full text-gray-900 py-2"
              >
                My Orders
              </NavLink>
            )}
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="w-full text-gray-900 py-2"
            >
              Contact
            </NavLink>

            {!user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  setShowUserLogin(true);
                }}
                className="px-6 py-2 mt-4 bg-primary hover:bg-primary-dark transition text-white rounded-full w-full shadow-md"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="px-6 py-2 mt-4 bg-primary hover:bg-primary-dark transition text-white rounded-full w-full shadow-md"
              >
                Logout
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
