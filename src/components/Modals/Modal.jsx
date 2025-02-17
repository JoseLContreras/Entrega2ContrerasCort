import React from 'react';
import { toast } from 'react-toastify';
import './Modal.css';
import { useGlobalContext } from '@/components/GlobalContext/GlobalContext';
import ClipLoader from 'react-spinners/ClipLoader';
import { useState } from 'react';

const Modal = ({ header, submitAction, buttonText, isRegister }) => {
  const { auth } = useGlobalContext();
  const { modal } = useGlobalContext();
  let [loading, setLoading] = useState(false);
  const handleClose = () => {
    modal.closeModal();
  };
  const handleSwitch = () => {
    modal.openModal(!isRegister);
  };
  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // si los campos están vacíos
    if (Object.values(data).some((value) => value === '')) {
      toast.error('Por favor llena todos los campos');
      setLoading(false);
      return;
    }
    if (isRegister && data.password !== data.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }
    // registrarse o iniciar sesión
    if (isRegister) {
      auth
        .register(data)
        .then(() => {
          // cerrar modal
          modal.closeModal();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      auth
        .login(data)
        .then(() => {
          modal.closeModal();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-cancel">
          <button
            href="/"
            className="modal-cancel-button"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <div className="modal-header">
          <h3>{header}</h3>
        </div>
        <div className="modal-body">
          <form onSubmit={submitForm}>
            {isRegister && (
              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <input type="text" className="form-control" name="username" />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" className="form-control" />
            </div>
            {isRegister && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                />
              </div>
            )}
            <div className="login-or-register">
              {isRegister ? (
                <span>
                  ¿Ya tienes una cuenta?
                  <button
                    className="btn-rounded"
                    type="button"
                    onClick={() => {
                      handleSwitch();
                    }}
                  >
                    Iniciar
                  </button>
                </span>
              ) : (
                <span>
                  ¿No tienes una cuenta?
                  <button
                    className="btn-rounded"
                    type="button"
                    onClick={() => {
                      handleSwitch();
                    }}
                  >
                    Crea Una
                  </button>
                </span>
              )}
            </div>
            <div className="form-group">
              <button type="submit" className="btn-rounded btn-submit">
                {buttonText}{' '}
                <span>
                  <ClipLoader
                    loading={loading}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
