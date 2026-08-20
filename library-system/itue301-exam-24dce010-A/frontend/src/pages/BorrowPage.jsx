import { useEffect, useState } from 'react'

const initialForm = {
  memberName: '',
  bookTitle: '',
  borrowDate: '',
  returnDate: '',
}

function BorrowPage() {
  const [formData, setFormData] = useState(initialForm)
  const [submittedBorrow, setSubmittedBorrow] = useState(null)
  const [submissionError, setSubmissionError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookOptions, setBookOptions] = useState([])
  const [memberOptions, setMemberOptions] = useState([])

  useEffect(() => {
    async function loadOptions() {
      try {
        const [booksResponse, membersResponse] = await Promise.all([
          fetch('http://localhost:5000/api/v1/books'),
          fetch('http://localhost:5000/api/v1/members'),
        ])
        const booksResult = await booksResponse.json()
        const membersResult = await membersResponse.json()
        if (!booksResponse.ok || !membersResponse.ok) {
          throw new Error('Unable to load borrowing options')
        }
        setBookOptions(booksResult.data)
        setMemberOptions(membersResult.data)
      } catch (error) {
        setSubmissionError(error.message)
      }
    }

    loadOptions()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentForm) => ({ ...currentForm, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmissionError('')

    try {
      const selectedBook = bookOptions.find((book) => book.title === formData.bookTitle)
      const selectedMember = memberOptions.find((member) => member.name === formData.memberName)
      const response = await fetch('http://localhost:5000/api/v1/borrowings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId: selectedMember._id,
          bookId: selectedBook._id,
          borrowDate: formData.borrowDate,
          returnDate: formData.returnDate,
          status: 'borrowed',
        }),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error?.message || 'Unable to save borrowing record')
      }

      setSubmittedBorrow({ memberName: formData.memberName, bookTitle: formData.bookTitle, id: result.data.id })
      setFormData(initialForm)
    } catch (error) {
      setSubmissionError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="page-section borrow-page">
      <p className="eyebrow">Your reading list</p>
      <h1>Borrow<br /><em>with intention.</em></h1>
      <form className="borrow-form" onSubmit={handleSubmit}>
        <label>
          Member name
          <select name="memberName" value={formData.memberName} onChange={handleChange} required>
            <option value="">Select a member</option>
            {memberOptions.map((member) => <option key={member._id} value={member.name}>{member.name}</option>)}
          </select>
        </label>
        <label>
          Book title
          <select name="bookTitle" value={formData.bookTitle} onChange={handleChange} required>
            <option value="">Select a book</option>
            {bookOptions.map((book) => <option key={book._id} value={book.title}>{book.title}{book.available ? '' : ' (Not available)'}</option>)}
          </select>
        </label>
        <label>
          Borrow date
          <input type="date" name="borrowDate" value={formData.borrowDate} onChange={handleChange} required />
        </label>
        <label>
          Return date
          <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} required />
        </label>
        <button className="button button--primary borrow-form__submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Record borrowing'} <span aria-hidden="true">&#8594;</span>
        </button>
      </form>
      {submissionError && <p className="borrow-error" role="alert">{submissionError}</p>}
      {submittedBorrow && (
        <div className="borrow-confirmation" role="status">
          <span className="borrow-panel__number">02</span>
          <p><strong>{submittedBorrow.bookTitle}</strong> is ready for {submittedBorrow.memberName}. Record: {submittedBorrow.id}</p>
        </div>
      )}
    </section>
  )
}

export default BorrowPage
