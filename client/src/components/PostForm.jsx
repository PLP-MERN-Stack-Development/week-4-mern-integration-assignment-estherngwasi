import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAPI } from '../hooks/useAPI';
import { postsAPI, categoriesAPI } from '../services/api';

const PostForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    author: ''
  });

  const { data: categories } = useAPI(() => categoriesAPI.getAll());
  const { data: post } = useAPI(() => 
    isEdit ? postsAPI.getById(id) : Promise.resolve(null), [id]
  );

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        category: post.category._id,
        author: post.author
      });
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await postsAPI.update(id, formData);
      } else {
        await postsAPI.create(formData);
      }
      navigate('/');
    } catch (error) {
      alert('Error saving post');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? 'Edit Post' : 'Create New Post'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a category</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="10"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            {isEdit ? 'Update' : 'Create'} Post
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-500 text-white px-6 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;