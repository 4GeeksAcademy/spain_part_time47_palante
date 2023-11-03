import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"
import "../../styles/login.css";

export const Login = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const enviarFormulario = (event) => {
		event.preventDefault()
		// Verifica si los campos obligatorios están llenos
		if (contact.email.trim() === "" || contact.password.trim() === "") {
			// Muestra una alerta o mensaje de error al usuario indicando que debe llenar todos los campos
			alert("Please fill out all required fields.");
			return; // Sale de la función sin continuar
		  }
		
		  // Si todos los campos están llenos, llama a actions.guardarInputs
		  actions.login(contact);
		  setSubmitted(true);
		}
	// Si submitted es true, muestra un mensaje de confirmación y redirige después de un breve retraso
	if (submitted) {
    actions.loginPrivate(contact)
		setTimeout(() => {
		navigate("/private"); 
		}, 1000);
		return (
			<div className="container">
			  <div className="alert alert-warning">
			  Your user has been login. Redirecting to private.
			  </div>
			</div>
		  );
		};
	  
  
 
  return (
    <div className="container">
            <div className="login-contenedor">
			        <div className="login-encabezado d-flex">
                <button className="acceder">INGRESAR</button>
                
                <Link to={"/signup"}>
                  <button className="registrarse"><strong>CREAR TU CUENTA</strong></button>
                </Link>
				      </div>  
              <div className="login-contenido">
                <div className="formulario">
                <form onSubmit={enviarFormulario}>
                
                <div className="mb-3">
                  
                    <input
                    type="text"
                    id="email"
                    className="form-control"
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    value={contact.email}
                    placeholder= "Email"
                    />
                </div>
                <div className="mb-3">
                    
                    <input
                    type="text"
                    id="phone"
                    className="form-control"
                    value={contact.password}
                    onChange={(e) => setContact({ ...contact, password: e.target.value })}
                    placeholder="Password"
                    />
                </div>
                <div>
					<button type="submit" className="btnSave">
						 Iniciar Sesión
					</button>
					
				</div>
                
                </form>
            </div> 
                </div>
              
            </div>
        </div>
   

	)
}
