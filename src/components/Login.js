import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';  
import santanderLogo from '../assets/santanderLogo.png';

const Login = () => {
  const [legajo, setLegajo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/login',
        {},
        {
          headers: {
            'legajo': legajo.toUpperCase(),
            'password': password,
          },
        }
      );
  
      if (response.status === 200) {
        const data = response.data.data;
  
        localStorage.setItem('legajo', data.legajo);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('apellido', data.apellido);
        navigate('/home/tarea'); 
      } else {
        setError('Error en los datos, por favor verifique los datos ingresados');
      }
    } catch (error) {
        
      if (error.response) {
        const data = error.response.data;

        if (error.response.status === 404) {
          setError(data.message);
        } else {
          setError('Error en el servidor: ' + data.status);
        }
      } else {
        setError('Error en la solicitud: ' + error.message);
      }
    }
  };
  

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid" style={{justifyContent: 'center'}}>
          <a className="navbar-brand" href="/">
            <img src={santanderLogo} alt="Santander" style={{ height: '40px' }} />
          </a>

        </div>
      </nav>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <h3 className="text-center mb-4">Bienvenido al onboarding del Santander</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="form-group">
                <label className="form-label">Legajo</label>
                <input
                  type="text"
                  className="form-control"
                  value={legajo}
                  onChange={(e) => setLegajo(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Entrar
              </button>

              {error && <div className="alert alert-danger">{error}</div>}
              
            </form>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
