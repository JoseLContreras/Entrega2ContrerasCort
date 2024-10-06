import './DeliveryItem.css';
import { useState } from 'react';
import { FaCaretUp } from 'react-icons/fa';
import { useGlobalContext } from '../../GlobalContext/GlobalContext';

const DeliveryItem = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(order.expected_delivery_date);
  const currentDate = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const numberOfDays = () => {
    if (currentDate.getTime() > date.getTime()) {
      return '0';
    }
    return Math.ceil(
      (date.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
    );
  };
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const checkFlair = (percentage) => {
    if (percentage < 50) {
      return 'flair danger-flair';
    } else if (percentage < 90) {
      return 'flair warning-flair';
    } else {
      return 'flair success-flair';
    }
  };

  const checkFlairText = (percentage) => {
    if (order.order_cancelled) {
      return 'Pedido cancelado';
    } else if (percentage < 50) {
      return 'Verificación pendiente';
    } else if (percentage < 90) {
      return 'Verificado y en entrega';
    } else {
      return 'Entregado';
    }
  };

  const { modal, orders } = useGlobalContext();

  const handleOpenCancelModal = (order_id) => {
    modal.openCancelModal();
    orders.setOrderToBeCanceled(order_id);
  };

  return (
    <div className="sub-container delivery-item-container">
      <div className="delivery-overview">
        <div className="delivery-summary">
          <div className="delivery-order-number">
            <h2 className="delivery-item-title order-main" title={order._id}>
              Orden: <span>#</span>
              {order._id.slice(0, 6)}
            </h2>
            <div className="delivery-items">
              <h5>Cantidad de artículos: {order.totalItemCount}</h5>
              <h5>Total: ${order.cost_after_delivery_rate}</h5>
              <h5>Tipo de entrega: {order.delivery_type}</h5>
              <h6>El costo total incluye el costo de envío.</h6>
            </div>
          </div>
          <div className="delivery-progress">
            <h3 className="delivery-item-title">Completado</h3>
            <h4>
              {order.percentage_complete}%{' '}
              <span className={checkFlair(order.percentage_complete)}>
                {checkFlairText(order.percentage_complete)}
              </span>
            </h4>
            <progress
              className="progress-bar"
              value={order.percentage_complete}
              max="100"
            ></progress>
          </div>
          <div className="delivery-date">
            <h3 className="delivery-item-title">Finalización prevista</h3>
            {(order.order_processed != true &&
              order.order_cancelled != true && <h4>{formattedDate}</h4>) ||
              (order.order_processed == true && (
                <h4 className="is-delivered">Delivered</h4>
              )) ||
              (order.order_cancelled == true && (
                <h4 className="is-cancelled">Cancelled</h4>
              ))}

            {(order.order_processed != true &&
              order.order_cancelled != true && (
                <h4>{numberOfDays()} día(s)</h4>
              )) ||
              ''}
          </div>
        </div>
        <div
          className={expanded ? 'fully-expanded isExpanded' : 'fully-expanded'}
        >
          <div className="products-in-delivery">
            <h3>Productos en Entrega</h3>
            <div className="delivery-products">
              {order.items.map((item) => {
                return (
                  <div className="delivery-products-item" key={item._id}>
                    <img src={item.product_image} alt="" width="50" />
                    <h5>Nombre del producto: {item.name}</h5>
                    <h5>Descripción: {item.description}</h5>
                    <h5>Precio: ${item.price}</h5>
                    <h5>Cantidad: {item.quantity}</h5>
                  </div>
                );
              })}
            </div>
          </div>
          {order.order_processed != true && order.order_cancelled != true && (
            <div className="danger-zone">
              <h3 className="danger-zone-text">Zona roja</h3>
              <div className="danger-zone-buttons">
                <button
                  className="btn-rounded danger-zone-button"
                  onClick={() => {
                    handleOpenCancelModal(order._id);
                  }}
                >
                  Cancelar pedido
                </button>
                <button
                  className="btn-rounded danger-zone-button report-issue"
                  onClick={() => {
                    // mailto link
                    window.location.href = `mailto:www.minisylar3@gmail.com?subject=Reporting Order #${order._id.slice(
                      0,
                      6
                    )}`;
                  }}
                >
                  Informar de un problema
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="expand-collapse-delivery">
        <button onClick={toggleExpanded}>
          {expanded ? 'Collapse' : 'Expand'}
          <span>
            <FaCaretUp
              className={
                expanded ? 'caret-delivery' : 'caret-delivery caret-expanded'
              }
            ></FaCaretUp>
          </span>
        </button>
      </div>
    </div>
  );
};
export default DeliveryItem;
