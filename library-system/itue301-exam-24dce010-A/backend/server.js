import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import errorHandler from './middleware/errorHandler.js'
import requestLogger from './middleware/requestLogger.js'
import Book from './models/Book.js'
import Borrowing from './models/Borrowing.js'
import Member from './models/Member.js'

const app = express()
const port = process.env.PORT || 5000

app.use(requestLogger)
app.use(cors())
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ message: 'Library API is running' })
})

app.get('/api/v1/borrowings', async (_request, response, next) => {
  try {
    const borrowings = await Borrowing.find().populate('memberId bookId')
    response.status(200).json({ success: true, data: borrowings })
  } catch (error) {
    next(error)
  }
})

app.post('/api/v1/borrowings', async (request, response, next) => {
  try {
    const { memberId, bookId, borrowDate, returnDate, status = 'borrowed' } = request.body
    const missingField = Object.entries({ memberId, bookId, borrowDate, returnDate })
      .find(([, value]) => !value)
    if (missingField) {
      const error = new Error(`${missingField[0]} is required`)
      error.statusCode = 400
      throw error
    }

    const member = await Member.findById(memberId)
    const book = await Book.findById(bookId)

    if (!member) {
      const error = new Error('Member not found')
      error.statusCode = 404
      throw error
    }
    if (!book) {
      const error = new Error('Book not found')
      error.statusCode = 404
      throw error
    }
    if (!book.available) {
      const error = new Error('Book is not available for borrowing')
      error.statusCode = 409
      throw error
    }

    const newBorrowing = await Borrowing.create({ memberId, bookId, borrowDate, returnDate, status })
    await Book.findByIdAndUpdate(bookId, { available: false })
    response.status(201).json({ success: true, data: newBorrowing })
  } catch (error) {
    next(error)
  }
})

app.get('/api/v1/books', async (_request, response, next) => {
  try {
    const books = await Book.find()
    response.status(200).json({ success: true, data: books })
  } catch (error) {
    next(error)
  }
})

app.get('/api/v1/members', async (_request, response, next) => {
  try {
    const members = await Member.find()
    response.status(200).json({ success: true, data: members })
  } catch (error) {
    next(error)
  }
})

app.use((_request, _response, next) => {
  const error = new Error('Route not found')
  error.statusCode = 404
  next(error)
})

app.use(errorHandler)

async function startServer() {
  await mongoose.connect(process.env.MONGO_URI)
  app.listen(port, () => {
    console.log(`Library API listening on port ${port}`)
  })
}

startServer().catch((error) => {
  console.error('MongoDB connection failed:', error.message)
  process.exit(1)
})
