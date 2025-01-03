
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  describethebook: {
    type: String
  },
  date: {
    type: Date
  },
  publisher: {
    type: String
  },
});

module.exports = Book = mongoose.model('book', BookSchema);
