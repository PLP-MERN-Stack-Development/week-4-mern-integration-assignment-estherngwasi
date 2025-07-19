import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAPI } from '../hooks/useAPI';
import { postsAPI } from '../services/api';

const PostList = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  
  const { data, loading, error } = useAPI(
    () => postsAPI.getAll(page, search),
    [page, search]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div>
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Search
          </button>
        </form>
      </div>

      <div className="grid gap-6">
        {data?.posts?.map((post) => (
          <div key={post._id} className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">
              <Link to={`/posts/${post._id}`} className="hover:text-blue-600">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-2">
              Category: {post.category.name} | By: {post.author}
            </p>
            <p className="text-gray-700">
              {post.content.substring(0, 150)}...
            </p>
            <div className="mt-4 flex gap-2">
              <Link
                to={`/posts/${post._id}/edit`}
                className="text-blue-500 hover:underline"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>

      {data?.totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: data.totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded ${
                page === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;