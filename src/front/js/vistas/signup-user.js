import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";

export const Signup_user = () => {
  const { store, actions } = useContext(Context);
  const [register, setRegister] = useState({ full_name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')


  //La función handleSubmit se encarga de tomar los datos del formulario de registro y los envia al servidor en formato JSON.
  const handleSubmit = (e) => {
    e.preventDefault(); //Previene el comportamiento por defecto del navegador
  
    //Verifica que los campos "email" y "password" esten completos 
  if (register.full_name.trim() === '' || register.email.trim() === '' || register.password.trim() === '') {      
    setError('All fields are mandatory!');
    return;
  }
  //Envio los datos del formulario a una tabla a traves de un fetch con metodo "post"  
  fetch(process.env.BACKEND_URL + "/user-register", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(register),
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
  .catch(error => console.log(error))

  //Limpia los campos una vez creado el usuario exitosamente, da paso a poder seguir creando registros
  setRegister({
   full_name:'', email: '', password: ""
  });
}

  return (
    <div className="container">
      <form className="from" onSubmit={handleSubmit}>
        <h1>Registro de usuario</h1>

        <label for="exampleInputEmail1" class="form-label">Full name *</label>
        <input type="name" className="form-control" name="full name" id="exampleInputEmail1" aria-describedby="emailHelp" value={register.full_name} onChange={(e) => setRegister({...register,full_name:e.target.value})} />
  
        <label for="exampleInputEmail1" class="form-label">Email *</label>
        <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" value={register.email} onChange={(e) => setRegister({...register,email:e.target.value})} />

        <label for="exampleInputEmail1" class="form-label">Password *</label>
        <input type="Password" className="form-control" name="Password" id="exampleInputEmail1" aria-describedby="emailHelp" value={register.password} onChange={(e) => setRegister({...register,password:e.target.value})} />
        <br />
        {error && <p>{error}</p>}
        <button>submit</button>
      </form>
    </div>
  );
  
}
