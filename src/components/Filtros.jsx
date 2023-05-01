const Filtros = ({ filtro, setFiltro }) => {
  const handleFiltro = (e) => {
    const { name, value } = e.target;
    setFiltro((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className="filtro">
      {/* Filtro TIPO DE COMIDA */}
      <div className="filtro__tipo">
        <label htmlFor="tipo">Tipo</label>
        <select
          name="tipo"
          id="tipo"
          value={filtro.tipo}
          onChange={handleFiltro}
        >
          <option value="todos">Todos</option>
          <option value="comida rapida">Comida Rápida</option>
          <option value="restaurant">Restaurant</option>
          <option value="completos">Completos</option>
        </select>
      </div>

      {/* Filtro HORA (SI ESTA ABIERTO) */}
      <div className="filtro__hora">
        <label htmlFor="hora">Hora</label>
        <input
          type="time"
          name="hora"
          id="hora"
          value={filtro.hora}
          onChange={handleFiltro}
        />
      </div>

      {/* Filtro ESTRELLAS */}
      <div className="filtro__estrellas">
        <label htmlFor="estrellas">Estrellas</label>
        <select
          name="estrellas"
          id="estrellas"
          value={filtro.estrellas}
          onChange={handleFiltro}
        >
          <option value="todos">Todos</option>
          <option value="1">1 estrella</option>
          <option value="2">2 estrellas</option>
          <option value="3">3 estrellas</option>
          <option value="4">4 estrellas</option>
          <option value="5">5 estrellas</option>
        </select>
      </div>
    </form>
  );
};

export default Filtros;
