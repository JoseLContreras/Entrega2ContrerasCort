import './EmptyState.css';
import EmptyCart from '../../../assets/images/empty-cart.png';
import { Link } from 'react-router-dom';
const EmptyState = () => {
  return (
    <div className="empty-cart-state">
      <div className="empty-cart-image">
        <img src={EmptyCart} alt="Empty cart" width={100} />
      </div>
      <div className="empty-cart-text">
        <h2>El carrito está vacío</h2>
        <p>Parece que aún no has añadido nada a tu carrito.</p>
        <Link to={'/'} className="add-item">
          Añade productos para comenzar
        </Link>
      </div>
    </div>
  );
};
export default EmptyState;
