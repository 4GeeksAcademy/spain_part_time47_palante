import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
  const [register, setRegister] = useState({ email:'', password:''})

	return (
		<div className="container">
			<h1>Login</h1>
			<label for="exampleInputEmail1" class="form-label">Email *</label>
      <input type="email" class="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" value={register.email} onChange={(e)=>setRegister(e.target.value)} />

      <label for="exampleInputEmail1" class="form-label">Password *</label>
      <input type="Password" class="form-control" name="Password" id="exampleInputEmail1" aria-describedby="emailHelp" value={register.password} onChange={(e)=>setRegister(e.target.value)} />
      <br/>
      <button>Login</button>
		</div>
	);
};
