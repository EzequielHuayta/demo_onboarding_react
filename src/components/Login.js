import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [legajo, setLegajo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
//const navigate = useNavigate();

const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/login',
        {},
        {
          headers: {
            'legajo': legajo,
            'password': password,
          },
        }
      );
  
      if (response.status === 200) {
        const data = response.data.data;
  
        localStorage.setItem('legajo', legajo);
        localStorage.setItem('usuario', data.nombre);
  
        //navigate('/home'); 
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h3>Bienvenido al onboarding del Santander</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="mb-3">
              <label className="form-label">legajo</label>
              <input
                type="text"
                className="form-control"
                value={legajo}
                onChange={(e) => setLegajo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
