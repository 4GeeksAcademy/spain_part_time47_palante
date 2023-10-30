import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/lecturas.css";
import comunicacionjpg from "../../img/comunicacion.jpg";
import emocionariojpg from "../../img/emocionario.jpg";
import hijojpg from "../../img/hijo.jpg";
import emocionario from "../emocionario.pdf";
import comunicacion from "../emocionario.pdf";
import hijo from "../hijo.pdf";



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
                Descargar PDF
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
                Descargar PDF
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
                Descargar PDF
              </a>
					</div>
					</div>
				</div>
				<div class="col">
					<div class="card h-100">
					<img src="https://ifeelonline.com/wp-content/uploads/2023/10/miniatura-web-ES.jpg" class="card-img-top" alt="..."></img>
					<div class="card-body">
						<h5 class="card-title">Card title</h5>
						<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
					</div>
					<div class="card-footer">
						<small class="text-body-secondary">Last updated 3 mins ago</small>
					</div>
					</div>
				</div>
				<div class="col">
					<div class="card h-100">
					<img src="..." class="card-img-top" alt="..."></img>
					<div class="card-body">
						<h5 class="card-title">Card title</h5>
						<p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
					</div>
					<div class="card-footer">
						<small class="text-body-secondary">Last updated 3 mins ago</small>
					</div>
					</div>
				</div>
				<div class="col">
					<div class="card h-100">
					<img src="..." class="card-img-top" alt="..."></img>
					<div class="card-body">
						<h5 class="card-title">Card title</h5>
						<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
					</div>
					<div class="card-footer">
						<small class="text-body-secondary">Last updated 3 mins ago</small>
					</div>
					</div>
				</div>
				
				</div>
			
			
		</div>
	);
};
