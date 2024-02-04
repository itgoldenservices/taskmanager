import React, { useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, withRouter } from "react-router-dom";

import { auth } from "../../firebaseSetup";

import useForm from "../../hooks/useForm";

import "./Recover.scss";

const Recover = ({ history, setFirebaseRecover }) => {
  const [{ email }, handleInputChange, handleInputReset] = useForm({
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return toast.error("📧 Email is mandatory");

    recover();
  };

  const recover = useCallback(async () => {
    try {
      await auth.sendPasswordResetEmail(email.trim());
      handleInputReset();

      setFirebaseRecover(true);

      history.push("/login");
    } catch (error) {
      toast.error("📧 Invalid Email");
    }
  }, [email, history, handleInputReset, setFirebaseRecover]);

  return (
    <div className="login form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Recover Password</h1>

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
            <input
              className="btn_ btn-primario btn-block"
              type="submit"
              value="Recover Password"
            />
          </div>
        </form>

        <Link className="enlace-cuenta" to="/login">
          Back to Login
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

export default withRouter(Recover);
