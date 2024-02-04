import React, { useCallback, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, withRouter } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import useForm from "../../hooks/useForm";

import "./Login.scss";

const Login = ({ history, firebaseRecover, setFirebaseRecover }) => {
  const [{ email, password }, handleInputChange, handleInputReset] = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (firebaseRecover) {
      toast.success("📧 Invalid Email");
      setFirebaseRecover(false);
    }
  }, [firebaseRecover, setFirebaseRecover]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos
    if (!email.trim()) return toast.error("📧 The number is mandatory");
    if (!password.trim()) return toast.error("🔑 Password is required");

    // Enviar Formulario
    login(email.trim(), password.trim());
  };

  const login = useCallback(
    async (email, password) => {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);

        handleInputReset();

        history.push("/tasks");
      } catch (error) {
        if (error.code === "auth/user-not-found")
          return toast.error("🧾 Username or Incorrect Password");
        if (error.code === "auth/wrong-password")
          return toast.error("🧾 Username or Incorrect Password");
      }
    },
    [history, handleInputReset]
  );

  return (
    <div className="login form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>

        <form onSubmit={handleSubmit}>
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
            <input
              className="btn_ btn-primario btn-block"
              type="submit"
              value="Log In"
            />
          </div>
        </form>

        <Link className="enlace-cuenta" to="/recovery">
          Did you forget your password?
        </Link>

        <Link className="enlace-cuenta" to="/registration">
          Get an Account
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

export default withRouter(Login);
