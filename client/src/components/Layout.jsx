import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              MERN Blog
            </Link>
            <div className="space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-800">
                Home
              </Link>
              <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded">
                Write Post
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;