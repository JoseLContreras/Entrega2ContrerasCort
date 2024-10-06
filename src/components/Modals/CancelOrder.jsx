import React from 'react';
import { toast } from 'react-toastify';
import './Modal.css';
import { useGlobalContext } from '@/components/GlobalContext/GlobalContext';
import ClipLoader from 'react-spinners/ClipLoader';
import { useState } from 'react';

const CancelOrder = () => {
  const { modal, orders, auth } = useGlobalContext();
  let [loading, setLoading] = useState(false);
  const handleClose = () => {
    modal.closeCancelModal();
  };
  const submitForm = (e) => {
    console.log('intentando cancelar el pedido');
    e.preventDefault();
    setLoading(true);
    const order_to_be_cancelled = orders.state.order_to_be_canceled;
    orders
      .cancelOrder(order_to_be_cancelled)
      .then(() => {
        toast.success(
          `Orden #${order_to_be_cancelled.slice(0, 6)} ha sido cancelada`
        );
        // get new orders
        orders.getOrders(auth.state.user.id);
        handleClose();
      })
      .catch(() => {
        toast.error('Hubo un problema al cancelar su pedido.');
      })
      .finally(() => {
        setLoading(false);
      });
    // Enviar aquí la cancelación del pedido
    // Cerrar aquí el modal
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
          <h3>¿Estás seguro de que deseas cancelar tu pedido?</h3>
        </div>
        <div className="modal-body">
          <form onSubmit={submitForm}>
            <div className="form-group cancel-modal-group">
              <button
                type="submit"
                className="btn-rounded btn-submit btn-submit-small btn-cancel"
              >
                Cancelar mi pedido
                <span>
                  <ClipLoader
                    loading={loading}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </span>
              </button>
              <button
                type="button"
                className="btn-rounded btn-submit btn-submit-small"
                onClick={() => {
                  modal.closeCancelModal();
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;
