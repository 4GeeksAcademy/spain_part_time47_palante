import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/lecturas.css";
import apatia from "../../img/apatia.jpg";
import ansiedad from "../../img/ansiedad.jpg";
import pigmaleon from "../../img/pigmaleon.jpg";
import sueño from "../../img/sueño.jpg";
import bienestar from "../../img/bienestar.jpg";
import apego from "../../img/apego.jpg";



export const Podcast = () => {
	const { store, actions } = useContext(Context);

	

	return (
		<div className="container">
			<div class="row row-cols-1 row-cols-md-3 g-4">
				<div class="col">
					<div class="card h-100">
					<img src={apatia}></img>
					<div class="card-body">
						<h5 class="card-title">Apatía: significado, síntomas y causas. Ep.133</h5>
						<a href="https://somosestupendas.com/apatia-significado/">Escuchar</a>
						
					</div>
					
					</div>
				</div>
				<div class="col">
					<div class="card h-100">
					<img src={ansiedad}></img>
					<div class="card-body">
						<h5 class="card-title">Mis herramientas cuando siento ansiedad</h5>
						<a href="https://www.listennotes.com/es/podcasts/mjpadillo/mis-herramientas-cuando-g4dvYjzBcwb/">Escuchar</a>
						
					</div>
					
					</div>
				</div>
				<div class="col">
					<div class="card h-100">
					<img src={pigmaleon}></img>
					<div class="card-body">
						<h5 class="card-title">El efecto pigmaleon. Las profecias autocumplidas.</h5>
						<a href="https://open.spotify.com/episode/6SHQRUViADmzR1kjcdFAzw">Escuchar</a>
						
					</div>
					
					</div>
				</div>
				<div class="col">
					<div class="card h-100">
					<img src={sueño}></img>
					<div class="card-body">
						<h5 class="card-title">Apatía: significado, síntomas y causas. Ep.133</h5>
						<a href="https://open.spotify.com/episode/0UKoBt2JiqA8j3ugdfL85r">Escuchar</a>
						
					</div>
					
					</div>
				</div>
				<div class="col">
					<div class="card h-100">
					<img src={bienestar}></img>
					<div class="card-body">
						<h5 class="card-title">¿Por qué nos da miedo salir de nuestra zona de confort?</h5>
						<a href="https://podcasts.apple.com/es/podcast/por-qu%C3%A9-nos-da-miedo-salir-de-nuestra-zona-de-confort-167/id1513593368?i=1000630420945">Escuchar</a>
						
					</div>
					
					</div>
				</div>
				<div class="col">
					<div class="card h-100">
					<img src={apego}></img>
					<div class="card-body">
						<h5 class="card-title">Apego evitativo</h5>
						<a href="https://podcasts.apple.com/es/podcast/apego-evitativo/id1501727318?i=1000633085941">Escuchar</a>
						
					</div>
					
					</div>
				</div>
				
				
			</div>
			
			
		</div>
	);
};
