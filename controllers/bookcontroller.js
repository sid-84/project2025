
const Book = require('../models/Book');

// GET all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      return res.status(404).json({ error: 'No books found' });
    }
    res.json(books);
  } catch (err) {
    console.error('Error retrieving books:', err);
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
};

// GET a book by ID
const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: `Book with ID ${id} not found` });
    }
    res.json(book);
  } catch (err) {
    console.error(`Error retrieving book with ID ${id}:`, err);
    res.status(500).json({ error: 'Failed to retrieve book' });
  }
};

// POST a new book
const addBook = async (req, res) => {
  const { title, author, genre, year } = req.body;

  // Basic validation for required fields
  if (!title || !author || !genre || !year) {
    return res.status(400).json({ error: 'All fields (title, author, genre, year) are required' });
  }

  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    console.error('Error adding new book:', err);
    res.status(500).json({ error: 'Failed to add book' });
  }
};

// PUT (update) a book by ID
const updateBook = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Optional: Basic validation for fields to update
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: 'No data provided to update' });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ error: `Book with ID ${id} not found` });
    }
    res.json(updatedBook);
  } catch (err) {
    console.error(`Error updating book with ID ${id}:`, err);
    res.status(500).json({ error: 'Failed to update book' });
  }
};

// DELETE a book by ID
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndRemove(id);
    if (!deletedBook) {
      return res.status(404).json({ error: `Book with ID ${id} not found` });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(`Error deleting book with ID ${id}:`, err);
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
