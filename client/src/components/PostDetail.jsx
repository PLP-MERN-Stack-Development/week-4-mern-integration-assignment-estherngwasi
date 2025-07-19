import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAPI } from '../hooks/useAPI';
import { postsAPI } from '../services/api';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, loading, error } = useAPI(
    () => postsAPI.getById(id),
    [id]
  );

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsAPI.delete(id);
        navigate('/');
      } catch (error) {
        alert('Error deleting post');
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="bg-white p-8 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-6">
        <p>Category: {post.category.name}</p>
        <p>Author: {post.author}</p>
        <p>Published: {new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="prose max-w-none mb-6">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
      <div className="flex gap-4">
        <Link
          to={`/posts/${post._id}/edit`}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
        <Link to="/" className="bg-gray-500 text-white px-4 py-2 rounded">
          Back to Posts
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;