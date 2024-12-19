import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInForm from "./component/SignInForm";
import SignUpForm from "./component/SignUpForm";
import BookRoomPage from "./component/BookRoomPage";
import LoadsPage from "./component/LoadsPage";
import LoadForm from "./component/LoadForm";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/user-loads" element={<LoadForm />} />
        <Route path="/loads" element={<LoadsPage />} />
        <Route path="/rooms/:roomName" element={<BookRoomPage />} />
      </Routes>
    </Router>
  );
};

export default App;
