import React, { useState } from "react";
import "./login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // fetch('/login', {method: "POST", body: JSON.stringify({
    //     email, password
    // })})

    alert(JSON.stringify({ email, password }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit} className="Login__form">
        <input
          className="Login__input"
          autoFocus
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="Login__input"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          className="Login__button"
          type="submit"
          disabled={!validateForm()}
        >
          Login
        </button>
      </form>
    </div>
  );
}
