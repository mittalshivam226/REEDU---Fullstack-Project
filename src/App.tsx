import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Browse } from './pages/Browse';
import { BookDetail } from './pages/BookDetail';
import { SellBook } from './pages/SellBook';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { SavedBooks } from './pages/SavedBooks';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="/sell" element={<SellBook />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/saved" element={<SavedBooks />} />
    </Routes>
  );
}

export default App;
