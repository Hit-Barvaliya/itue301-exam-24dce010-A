import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import BooksPage from './pages/BooksPage.jsx'
import BorrowPage from './pages/BorrowPage.jsx'
import Navigation from './components/Navigation.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="site-header">
          <Navigation />
          <span className="header-status"><span aria-hidden="true" />Open today</span>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/borrow" element={<BorrowPage />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <span>ITUE301 / Library management system</span>
          <span>24DCE010 / A</span>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
