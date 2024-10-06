import './FilterBy.css';

import './FilterBy.css';

const FilterBy = () => {
  return (
    <div className="contains-select">
      <div className="select-dropdown">
        <select name="select">
          <option value="Test">Comida de cachorros</option>
          <option value="Test">Prueba</option>
          <option value="Test">Prueba</option>
        </select>
      </div>
      {/*  */}
      <div className="select-dropdown">
        <select name="select">
          <option value="Test">Precio</option>
          <option value="Test">Prueba</option>
          <option value="Test">Prueba</option>
        </select>
      </div>
      {/*  */}
      <div className="select-dropdown">
        <select name="select">
          <option value="Test">Prueba</option>
          <option value="Test">Prueba</option>
          <option value="Test">Prueba</option>
        </select>
      </div>
    </div>
  );
};
export default FilterBy;
