import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <section className="home-page">
      <div className="home-page__intro">
        <p className="eyebrow">Campus library / 2026</p>
        <h1>Make room<br /><em>for a good story.</em></h1>
        <p className="home-page__summary">
          A calm, simple way to discover the collection, check availability,
          and keep every borrowing record in one place.
        </p>
        <Link className="button button--primary" to="/books">
          Browse the collection <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>
      <div className="home-page__feature" aria-label="Library collection highlight">
        <span className="feature-mark">01</span>
        <div>
          <p className="feature-label">Featured shelf</p>
          <h2>Ideas that<br />travel well</h2>
          <p>Essays, fiction, and field notes for curious minds.</p>
        </div>
        <span className="feature-arrow" aria-hidden="true">&#8599;</span>
      </div>
    </section>
  )
}

export default HomePage
