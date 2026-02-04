// src/components/Admin/AdminUsers.jsx
import React, { useContext } from "react";
import { AppContextData } from "../../context/AppContext";

function AdminUsers() {
  const { users, handleDeleteUser, handleBlockUser } =
    useContext(AppContextData);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">All Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow-sm rounded-lg">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-secondary">
              <th className="px-5 py-3 text-md font-bold border-r">No</th>
              <th className="px-5 py-3 text-md font-bold border-r">Username</th>
              <th className="px-5 py-3 text-md font-bold border-r">Email</th>
              <th className="px-5 py-3 text-md font-bold border-r">Role</th>
              <th className="px-5 py-3 text-md font-bold border-r">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id || index}
                className="hover:bg-gray-100 transition border-b last:border-none"
              >
                <td className="px-5 py-3 border-r">{index + 1}</td>
                <td className="px-5 py-3 border-r capitalize">
                  {user.userName}
                  {user.isBlocked && (
                    <span className="ml-2 text-xs text-red-600 font-semibold">
                      (Blocked)
                    </span>
                  )}
                </td>
                <td className="px-5 py-3 border-r">{user.email}</td>
                <td
                  className={`px-5 py-3 border-r font-semibold ${
                    user.role === "admin" ? "text-green-600" : "text-gray-700"
                  }`}
                >
                  {user.role}
                </td>

                <td className="px-10 py-3 border-r font-semibold">
                  {user.role === "admin" ? (
                    <div className="flex justify-center items-center gap-2">
                      <button className="w-20 h-8 bg-green-500 rounded-md text-white cursor-pointer">
                        Active
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() =>
                          handleBlockUser(
                            user.id,
                            user.userName,
                            user.isBlocked
                          )
                        }
                        className={`w-20 h-8 ${
                          user.isBlocked ? "bg-red-500" : "bg-green-500"
                        } rounded-md text-white cursor-pointer`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id, user.userName)}
                        className="w-20 h-8 bg-red-500 rounded-md text-white cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
