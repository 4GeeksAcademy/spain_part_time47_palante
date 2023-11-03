import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";



export const Signup = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [contact, setContact] = useState({
		email: "",
		password: ""

	})
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
		  actions.guardarInputsSignup(contact);
		  setSubmitted(true);
		}
	// Si submitted es true, muestra un mensaje de confirmación y redirige después de un breve retraso
	if (submitted) {
		setTimeout(() => {
		navigate("/login"); 
		}, 1000);
		return (
			<div className="container">
			  <div className="alert alert-warning">
			  Your user has been created. Redirecting to login.
			  </div>
			</div>
		  );
		};
	  
	
	return (
		<div className="container">
            <div className="login-contenedor">
			        <div className="login-encabezadoSignup d-flex">
                <button className="user"><i class="fa-solid fa-user"></i></button>
                
				<Link to={"/login"}>
                  <button className="ingresar"><strong>INGRESAR</strong></button>
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
					<button type="submit" className="btnRegistrar">
						 Registrar
					</button>
					
				</div>
                
                </form>
            </div> 
                </div>
              
            </div>
        </div>
   

	)
}
