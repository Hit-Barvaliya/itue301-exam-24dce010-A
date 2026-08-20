import 'dotenv/config'
import mongoose from 'mongoose'
import Book from './models/Book.js'
import Member from './models/Member.js'
import Borrowing from './models/Borrowing.js'

const books = [
  ['The Design of Everyday Things', 'Don Norman', 'Design', '9780465050659', true],
  ['A Brief History of Time', 'Stephen Hawking', 'Science', '9780553380163', false],
  ['The Alchemist', 'Paulo Coelho', 'Fiction', '9780062315007', true],
  ['Clean Code', 'Robert C. Martin', 'Technology', '9780132350884', true],
  ['Atomic Habits', 'James Clear', 'Self-development', '9780735211292', true],
  ['The Little Prince', 'Antoine de Saint-Exupery', 'Classics', '9780156012195', false],
  ['Thinking, Fast and Slow', 'Daniel Kahneman', 'Psychology', '9780374533557', true],
  ['The Pragmatic Programmer', 'David Thomas', 'Technology', '9780135957059', true],
  ['Ikigai', 'Hector Garcia', 'Wellbeing', '9780143130727', true],
  ['Sapiens', 'Yuval Noah Harari', 'History', '9780062316097', false],
].map(([title, author, category, isbn, available]) => ({ title, author, category, isbn, available }))

const members = Array.from({ length: 10 }, (_, index) => ({
  name: `Library Member ${index + 1}`,
  email: `member${index + 1}@college.edu`,
  phone: `98765432${String(index).padStart(2, '0')}`,
  department: ['Computer Engineering', 'Information Technology', 'Science', 'Commerce'][index % 4],
}))

async function seedDatabase() {
  await mongoose.connect(process.env.MONGO_URI)
  await Book.deleteMany({})
  await Member.deleteMany({})
  await Borrowing.deleteMany({})

  const insertedBooks = await Book.insertMany(books)
  const insertedMembers = await Member.insertMany(members)
  const borrowings = insertedBooks.map((book, index) => ({
    memberId: insertedMembers[index]._id,
    bookId: book._id,
    borrowDate: new Date(`2026-08-${String(index + 1).padStart(2, '0')}`),
    returnDate: new Date(`2026-08-${String(index + 8).padStart(2, '0')}`),
    status: index % 3 === 0 ? 'returned' : index % 3 === 1 ? 'overdue' : 'borrowed',
  }))
  await Borrowing.insertMany(borrowings)

  console.log('Seeded 10 books, 10 members, and 10 borrowings.')
  await mongoose.disconnect()
}

seedDatabase().catch(async (error) => {
  console.error('Database seed failed:', error.message)
  await mongoose.disconnect()
  process.exitCode = 1
})
