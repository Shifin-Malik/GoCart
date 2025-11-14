import AdminSidebar from "../../components/AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
