import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
	const navbarStyle = {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		zIndex: 100
		
		
	  };
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary" style={navbarStyle}>
			<div className="container">
				<Link to="/">
				<p>P'ALANTE</p>
				</Link>
				
				<div className="container_navbar_right d-flex">
					<div className="dropdown">
						<button className="btn_comunidad dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Comunidad
						</button>
						<ul className="dropdown-menu">
							<li><a className="dropdown-item" href="#">Chat</a></li>
							<li><a className="dropdown-item" href="#">Quedadas</a></li>
							
						</ul>
					</div>
					<div className="dropdown">
						<button className="btn_recursos dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Tools
						</button>
						<ul className="dropdown-menu">
							<Link to='/lecturas'>
								<li><a className="dropdown-item" href="#">Lecturas</a></li>
							</Link>
							<li><a className="dropdown-item" href="#">Meditaciones guiadas</a></li>
							<li><a className="dropdown-item" href="#">Entrevistas</a></li>
							<Link to='/podcast'>
							<li><a className="dropdown-item" href="#">Podcast</a></li>
							</Link>
							
							<li><a className="dropdown-item" href="#">De tus Freelance</a></li>
						</ul>
					</div>
					<div className="dropdown">
						<button className="btn_citas dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Citas
						</button>
						<ul className="dropdown-menu">
							<li><a className="dropdown-item" href="#">Profesionales</a></li>
							<li><a className="dropdown-item" href="#">Voluntarios</a></li>
							
						</ul>
					</div>
					<div className="login">
						<Link to='/login'>
							<button className="btn_login" type="button">
							Login
							</button>
						</Link>
						
					</div>
					
				</div>	
				
			</div>
		</nav>
	);
};
