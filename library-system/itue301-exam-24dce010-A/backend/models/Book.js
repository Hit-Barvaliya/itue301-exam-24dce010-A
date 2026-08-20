import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    isbn: { type: String, unique: true, sparse: true, trim: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true },
)

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema)

export default Book
