import "./index.css";
import React, { useState, useEffect } from "react";
import UserContext from "./context/UserContext";
import { Routes, Route } from "react-router-dom";
import { Homepage, Login, Register, Gallery } from "./pages";

function App() {
  const [user, setUser] = useState(null);

  if (user) sessionStorage.setItem("user", JSON.stringify(user));

  // useEffect with [] ensures that even if user refreshes the page(and since the side effect will run on every refresh), it retrieves
  // the token data from session storage and sets the token with it, allowing homepage to be shown even upon refresh
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      let userData = JSON.parse(sessionStorage.getItem("user"));
      setUser(userData);
    }
  }, []);

  // when user clicks "Login" button, setUser in handleSubmit gets called, which makes token a truthy value
  // triggering of setUser() causes App.js to be re-rendered, causing all of its child components which makes use of the
  // state variable(e.g token) to be re-rendered as well(which means only Homepage.jsx)
  // after Homepage.jsx gets rendered, the navigate() gets called, which directs the user to the home page.
  return (
    <UserContext.Provider value={setUser}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          {user ? (
            <>
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/gallery" element={<Gallery />} />
            </>
          ) : (
            ""
          )}
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
