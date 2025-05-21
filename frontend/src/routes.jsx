import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import BookingPage from './pages/BookingPage';
import ShopPage from './pages/ShopPage';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </Router>
  );
}
