import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup_user = () => {
  const { store, actions } = useContext(Context);
  const [register, setRegister] = useState({full_name:'', email:'', password:''})

  return (
    <div className="container">
      <h1>Registro de usuario</h1>

      <label for="exampleInputEmail1" class="form-label">Full name *</label>
      <input type="name" class="form-control" name="full name" id="exampleInputEmail1" aria-describedby="emailHelp" value={register.full_name} onChange={(e)=>setRegister(e.target.value)} />

      <label for="exampleInputEmail1" class="form-label">Email *</label>
      <input type="email" class="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" value={register.email} onChange={(e)=>setRegister(e.target.value)} />

      <label for="exampleInputEmail1" class="form-label">Password *</label>
      <input type="Password" class="form-control" name="Password" id="exampleInputEmail1" aria-describedby="emailHelp" value={register.password} onChange={(e)=>setRegister(e.target.value)} />
      <br/>
      <button>submit</button>
    </div>
  );
};
