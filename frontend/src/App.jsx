// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AllProducts from "./pages/AllProducts";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { CartProvider } from "./context/CartContext";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistory from "./pages/OrderHistory";
import UploadProofPage from "./pages/UploadProofPage";

// Booking Appointments
import BookingPage from "./pages/BookingPage";
import MyAppointments from "./pages/MyAppointments";

function App() {
  return (
    <div className="font-sans">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/upload-proof/:orderId" element={<UploadProofPage />} />

            {/* --- Booking Appointments --- */}
            <Route path="/booking" element={<BookingPage />} />
            {/* <Route path="/booking-payment/:id" element={<BookingPaymentPage />} />  // REMOVE, tidak dipakai */}
            <Route path="/my-appointments" element={<MyAppointments />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
