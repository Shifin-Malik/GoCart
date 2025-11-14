import { NavLink } from "react-router-dom";
import { FaHome, FaBox, FaShoppingCart, FaUsers } from "react-icons/fa";

const links = [
  { id: 1, name: "Dashboard", path: "/GoCart/admin", icon: <FaHome /> },
  { id: 2, name: "Products", path: "/GoCart/admin/products", icon: <FaBox /> },
  {
    id: 3,
    name: "Orders",
    path: "/GoCart/admin/orders",
    icon: <FaShoppingCart />,
  },
  { id: 4, name: "Users", path: "/GoCart/admin/users", icon: <FaUsers /> },
];

function AdminSidebar() {
  return (
    <div className="w-56 mt-5 text-black h-screen p-4">
      <h2 className="text-2xl text-center font-bold mb-6 text-primary">
        Admin Panel
      </h2>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            end={link.name === "Dashboard"}
            className={({ isActive }) =>
              `transition flex items-center gap-2 px-3 py-2 rounded-md font-medium ${
                isActive
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-primary/10 hover:text-primary"
              }`
            }
          >
            <span className="text-xl">{link.icon}</span>
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default AdminSidebar;
