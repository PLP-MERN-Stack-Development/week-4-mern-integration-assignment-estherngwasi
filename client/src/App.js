// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <Router>
      <div className="App" style={{ padding: "2rem" }}>
        <nav>
          <Link to="/">Home</Link> | <Link to="/register">Register</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>Blog Posts</h1>
                {posts.map((post) => (
                  <div key={post.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem" }}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                  </div>
                ))}
              </div>
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
