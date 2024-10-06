import doggieHappy from '@/assets/images/doggie.jpeg';
import './Banner.css';

const Banner = () => {
  return (
    <div className="sub-container">
      <div className="banner">
        <div className="banner-text">
          <h1>
            Obtenga hasta un 50% de descuento en <br></br>Comida para cachorros
          </h1>
          <span className="is-buy-now">
            <a href="#products">
              <button className="btn-rounded buy-now">Compra Ahora</button>
            </a>
          </span>
        </div>
        <div className="subject">
          <img src={doggieHappy} alt="Doggie Happy" width={'100%'} />
        </div>
      </div>
    </div>
  );
};
export default Banner;
