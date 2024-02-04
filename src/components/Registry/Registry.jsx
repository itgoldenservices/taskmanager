import React, { useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import useForm from "../../hooks/useForm";

import "./Registry.scss";

const Registry = ({ history }) => {
  const [
    { number, email, password, confirmation },
    handleInputChange,
    handleInputReset,
  ] = useForm({
    number: "",
    email: "",
    password: "",
    confirmation: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos
    if (!number.trim()) return toast.error("📛 The number is mandatory");

    if (!email.trim()) return toast.error("📧Email is mandatory");

    if (!password.trim()) return toast.error("🔑 Password is required");
    if (password.trim().length <= 6)
      return toast.error("🔑Password must be greater than 6 characters");

    if (!confirmation.trim())
      return toast.error("🔑 Password confirmation is required");
    if (password.trim() !== confirmation.trim())
      return toast.error("🔑 Password and password confirmation do not match");

    // Registrar Usuario
    registration(number.trim(), email.trim(), password.trim());
  };

  const registration = useCallback(
    async (number, email, password) => {
      try {
        const auth = getAuth();
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await db
          .collection("users")
          .doc(res.user.uid)
          .set({
            number,
            email,
            fecha: moment().format("DD/MM/YYYY"),
          });

        handleInputReset();

        history.push("/tasks");
      } catch (error) {
        if (error.code === "auth/email-already-in-use")
          return toast.warning(
            "📧 The Email is already in use, please enter another one"
          );
        if (error.code === "auth/invalid-email")
          return toast.warning("📧 Invalid email");
      }
    },
    [history, handleInputReset]
  );

  return (
    <div className="registry form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Get an Account</h1>

        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="number">Number:</label>

            <input
              type="text"
              id="number"
              name="number"
              placeholder="Your number"
              value={number}
              onChange={handleInputChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email:</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={handleInputChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password:</label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              value={password}
              onChange={handleInputChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="confirmation">Confirmation Password:</label>

            <input
              type="password"
              id="confirmation"
              name="confirmation"
              placeholder="Repeat your password"
              value={confirmation}
              onChange={handleInputChange}
            />
          </div>

          <div className="campo-form">
            <input
              className="btn_ btn-primario btn-block"
              type="submit"
              value="Register"
            />
          </div>
        </form>

        <Link className="enlace-cuenta" to="/login">
          Return to log
        </Link>
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default withRouter(Registry);
