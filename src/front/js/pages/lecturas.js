import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/lecturas.css";
import comunicacionjpg from "../../img/comunicacion.jpg";
import emocionariojpg from "../../img/emocionario.jpg";
import hijojpg from "../../img/hijo.jpg";
import cielojpg from "../../img/cielo.jpg";
import amarjpg from "../../img/amar.jpg";
import ahorajpg from "../../img/ahora.jpg";
import emocionario from "../emocionario.pdf";
import comunicacion from "../emocionario.pdf";
import hijo from "../hijo.pdf";
import cielo from "../cielo.pdf";
import amar from "../amar.pdf";
import ahora from "../ahora.pdf";




export const Lecturas = () => {
	const { store, actions } = useContext(Context);

	

	return (
		<div className="container">
			<div class="row row-cols-1 row-cols-md-3 g-4">
				<div class="col">
					<div class="card h-100">
					<img src={emocionariojpg}></img>
					<div class="card-body">
						<h5 class="card-title">Emocionario</h5>
						<p class="card-text">Un libro con el que los niños y adultos crecerán aprendiendo a identificar cualquier sentimiento y aprenderán a regularlos.</p>
					</div>
					<div class="card-footer">
					<a href={emocionario} download> {' '}
                Descargar
              </a>
					</div>
					</div>
				</div>
				<div class="col">
					<div class="card h-100">
					<img src={hijojpg} class="card-img-top" alt="..."></img>
					<div class="card-body">
						<h5 class="card-title">Hijo Único</h5>
						<p class="card-text">Un libro que enseña a los adultos la mirada y esperanza de un niño.</p>
					</div>
					<div class="card-footer">
					<a href={hijo} download> {' '}
                Descargar
              </a>
					</div>
					</div>
				</div>
				<div class="col">
					<div class="card h-100">
					<img src={comunicacionjpg} class="card-img-top" alt="..."></img>
					<div class="card-body">
						<h5 class="card-title">Comunicacion no violenta. Un lenguaje de vida</h5>
						<p class="card-text">Un libro donde aprenderas acerca de los principios y valores en la comunicacion.</p>
					</div>
					<div class="card-footer">
					<a href={comunicacion} download> {' '}
                Descargar
              </a>
					</div>
					</div>
				</div>
				<div class="col">
					<div class="card h-100">
					<img src={amarjpg} class="card-img-top" alt="..."></img>
					<div class="card-body">
						<h5 class="card-title">El arte de amar</h5>
						<p class="card-text">En este libro el filósofo alemán nos explica qué significa amar y cómo desprendernos de nosotros mismos para experimentar ese sentimiento.</p>
					</div>
					<div class="card-footer">
					<a href={amar} download> {' '}
                Descargar
              </a>
					</div>
					</div>
				</div>
				<div class="col">
					<div class="card h-100">
					<img src={cielojpg} class="card-img-top" alt="..."></img>
					<div class="card-body">
						<h5 class="card-title">El cielo es el límite</h5>
						<p class="card-text">Es una obra llena de ingenio, sabiduría y sentido común, para abordar el propio cambio.</p>
					</div>
					<div class="card-footer">
					<a href={cielo} download> {' '}
                Descargar
              </a>
					</div>
					</div>
				</div>
				<div class="col">
					<div class="card h-100">
					<img src={ahorajpg} class="card-img-top" alt="..."></img>
					<div class="card-body">
						<h5 class="card-title">El poder del ahora</h5>
						<p class="card-text">Enseñanzas, meditaciones y ejercicios que te permitirán hacer un camino espiritual.</p>
					</div>
					<div class="card-footer">
					<a href={ahora} download> {' '}
                Descargar
              </a>
					</div>
					</div>
				</div>
				
				</div>
			
			
		</div>
	);
};
