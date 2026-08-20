# ITUE301 Library Book Management System

Repository: `itue301-exam-24dce010-A`

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
npm start
```

Copy `.env.example` to `.env` before starting backend services that use MongoDB. The database connection will be added with the backend database task.

For the local MongoDB setup, use `MONGO_URI=mongodb://127.0.0.1:27017/library-system` in `backend/.env`.

To insert the practical records into MongoDB:

```bash
cd backend
npm run seed
```

The seed command creates 10 books, 10 members, and 10 linked borrowing records. Start the MongoDB-backed API with `npm start`.

## Task 3 API endpoints

- `GET /api/v1/borrowings` returns all in-memory borrowing records.
- `POST /api/v1/borrowings` creates a borrowing record. Send `memberId`, `bookId`, `borrowDate`, `returnDate`, and an optional `status` (`borrowed`, `returned`, or `overdue`) as JSON.
- `GET /api/v1/books` returns all in-memory books.

The backend applies a global request logger and returns structured JSON for errors.

## Task 5 database models

Mongoose models are defined in `backend/models/Book.js`, `Member.js`, and `Borrowing.js`. Borrowing records reference members and books through ObjectIds, and borrowing status is restricted to `borrowed`, `returned`, or `overdue`.

## Task 1

The React frontend includes `HomePage`, `BooksPage`, `BorrowPage`, and the reusable `BookCard` component. `BookCard` receives and displays `title`, `author`, `category`, and `available` through props.
