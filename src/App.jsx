import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MusicDetailPage from "./pages/MusicDetail";
import UserDetailPage from "./pages/UserDetail";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/payment/Payment";
import Completion from "./components/payment/Completion";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51PBJHR2M3iXRRKjE33wLv50Lomq2gyzlduoYY6vWn4KsNOT0wBNHmgqqxuQlVwgDObfVtu1O43MhgsYPoa9oz2Sa00ZewDNnHd"
  );

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/d55ddd64-df90-4045-bdf3-48353dfd76ad" />} />
          <Route path="/:id" element={<MusicDetailPage />} />
          <Route path="/user-detail" element={<UserDetailPage />} />
          <Route
            path="/payment"
            element={<Payment stripePromise={stripePromise} />}
          />
          <Route
            path="/completion/:buyerId/:musicId/:amount"
            element={<Completion stripePromise={stripePromise} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
