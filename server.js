// ===============================================
// Express.js Starter Template with Public Files
// Serves HTML files from public directory
// ===============================================

const express = require('express');
const path = require('path');
const open = require('open'); // ⬅️ Add this line
const app = express();

// ===================
// MIDDLEWARE
// ===================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Update your mock posts data to include createdAt timestamps
let posts = [
  { 
    id: 1, 
    title: "First Post", 
    content: "This is the first post.",
    createdAt: new Date().toISOString() // Add this line
  },
  { 
    id: 2, 
    title: "Second Post", 
    content: "This is the second post.",
    createdAt: new Date().toISOString() // Add this line
  }
];

// ===================
// ROUTES
// ===================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login Routes
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Authentication logic would go here
  res.json({ message: `Logged in as username`, token: 'sample-jwt-token' });
});

// Register Routes
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  // User creation logic would go here
  res.json({ message: `User registered: username`, email });
});

// Contact Route
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// ==================================
// POSTS ROUTES
// ==================================

// Posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Get single post by ID
app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  post ? res.json(post) : res.status(404).send('Post not found');
});

// Update the POST endpoint to include createdAt
app.post('/api/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date().toISOString() // Add this line
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Delete a post
app.delete('/api/posts/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.status(204).send();
});


// ===================
// SERVER START
// ===================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`); // Corrected this line
  console.log(`Available Routes:`);
  console.log(`- Home: http://localhost:${PORT}`); // Corrected this line
  console.log(`- Login: http://localhost:${PORT}/login`);
  console.log(`- Register: http://localhost:${PORT}/register`);
  console.log(`- Contact: http://localhost:${PORT}/contact`);
});
