import './ShopFooter.css';
import { Link } from 'react-router-dom';

const ShopFooter = () => {
  const newYear = new Date().getFullYear();
  return (
    <div className="sub-container">
      <div className="useful-links">
        <h2 className="logo-text">MIS MASCOTAS</h2>
        <ul className="useful-details">
          <li>+233 xxx xxx xxx</li>
          <li>DIRECCIÓN xx ,xxx</li>
          <li>Redes Sociales</li>
        </ul>
      </div>
      <div className="bottom-section">
        <div className="bottom-section-left">
          <ul>
            <li>
              <Link to={'/'}>Ofertas</Link>
            </li>
            <li>
              <a href="#products">Que hay de nuevo</a>
            </li>
            <li>
              <a href="#">Delivery</a>
            </li>
          </ul>
        </div>
        <div className="bottom-sectino-right">copyright &copy; {newYear}</div>
      </div>
    </div>
  );
};
export default ShopFooter;
