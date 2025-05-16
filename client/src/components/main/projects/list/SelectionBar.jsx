import React from 'react';

const SelectionBar = ({ selected, onClear }) => {
  return (
    <div className="selection-bar">
      <p>Seleccionadas: {selected.length}</p>
      <button onClick={() => console.log(selected)}>Ver detalles</button>
      <button onClick={onClear}>Cancelar</button>
      <button onClick={() => console.log("Eliminar")}>🗑 Eliminar</button>
    </div>
  );
};

export default SelectionBar;
