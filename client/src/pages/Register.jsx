import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message before new attempt
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form); // Make sure this matches your backend
      setMessage("✅ User registered successfully!");
      console.log("User registered:", res.data);
    } catch (err) {
      console.error("Registration error:", err);
      setMessage("❌ Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4">
        <h2 className="text-xl font-bold mb-2 text-center">Register</h2>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
        {message && (
          <p className={`text-sm text-center ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;
