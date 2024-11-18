import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Login.css';
import santanderLogo from '../assets/santanderLogo.png';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [mensajeBienvenida, serMensajeBienvenida] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const legajo = localStorage.getItem('legajo');
      const nombre = localStorage.getItem('nombre'); 
      const apellido = localStorage.getItem('apellido');

      if (!legajo) {
        setError('No se ha encontrado la información de login');
        setLoading(false);
        return;
      }

      serMensajeBienvenida(`Bienvenido, ${nombre} ${apellido} (Legajo: ${legajo})`);

      try {
        const response = await axios.get('http://localhost:8080/home/tarea', {
          headers: {
            legajo
          }
        });
        setTareas(response.data.data); 
        setLoading(false);
      } catch (err) {
        setError('Error al obtener las tareas');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {

    localStorage.removeItem('legajo');
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid" style={{justifyContent: 'center'}}>
          <a className="navbar-brand" href="/">
            <img src={santanderLogo} alt="Santander" style={{ height: '40px' }} />
          </a>

          <button className="btn btn-danger" onClick={handleLogout} style={{ position: 'absolute', right: '10px' }}>
            Logout
          </button>

        </div>
      </nav>

      <div className="container mt-5">
        <h3 className="text-center mb-4">{mensajeBienvenida}</h3> {/* Display the welcome message here */}
        
        {loading && <p>Loading...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {tareas.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Fecha de Finalización</th>
              </tr>
            </thead>
            <tbody>
              {tareas.map((tarea) => (
                <tr
                  key={tarea.id}
                  style={{
                    backgroundColor: tarea.finalizado ? '#d4edda' : '#f8d7da'
                  }}
                >
                  <td>{tarea.descripcion}</td>
                  <td>{tarea.finalizado ? 'Completado' : 'Pendiente'}</td>
                  <td>{new Date(tarea.fechaFin).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay tareas disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
