// src/pages/admin/Dashboard.tsx
import { useAppSelector } from "../../src/hooks/redux";

const AdminDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Posts</h3>
            <p className="text-3xl font-bold text-green-600">567</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Comments</h3>
            <p className="text-3xl font-bold text-yellow-600">2,341</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">
              Active Users
            </h3>
            <p className="text-3xl font-bold text-purple-600">89</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Recent Users
            </h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">User {item}</p>
                    <p className="text-sm text-gray-500">
                      user{item}@example.com
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">2 hours ago</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Recent Posts
            </h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">Blog Post Title {item}</p>
                    <p className="text-sm text-gray-500">By Author {item}</p>
                  </div>
                  <span className="text-sm text-gray-400">1 day ago</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Admin Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Manage Users
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
              Manage Posts
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
