import { useEffect, useState } from 'react'
import BookCard from '../components/BookCard.jsx'

function BooksPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadBooks() {
      try {
        const response = await fetch('http://localhost:5000/api/v1/books')
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error?.message || 'Unable to load books')
        }

        setData(result.data)
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [])

  if (loading) {
    return <section className="page-section request-state">Loading books...</section>
  }

  if (error) {
    return <section className="page-section request-state request-state--error">Unable to load books: {error}</section>
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">The collection</p>
          <h1>Find your<br /><em>next chapter.</em></h1>
        </div>
        <p className="page-heading__note">{data.length} selected titles<br />across the shelves</p>
      </div>
      <div className="book-grid">
        {data.map((book) => <BookCard key={book._id} {...book} />)}
      </div>
    </section>
  )
}

export default BooksPage
