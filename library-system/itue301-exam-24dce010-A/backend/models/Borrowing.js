import mongoose from 'mongoose'

const borrowingSchema = new mongoose.Schema(
  {
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    status: { type: String, enum: ['borrowed', 'returned', 'overdue'], default: 'borrowed' },
  },
  { timestamps: true },
)

const Borrowing = mongoose.models.Borrowing || mongoose.model('Borrowing', borrowingSchema)

export default Borrowing
