import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Meditaciones = () => {
    const {store, actions} = useContext(Context);

    return (
        <div className="container">
			<div class="row row-cols-1 row-cols-md-3 g-4">
				<div class="col">
					<div class="card h-100">
                        <iframe width="354" height="373" src="https://www.youtube.com/embed/YuEBtH_FWQk?si=coIln1W89--w6X9F" allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title">Meditación GUIADA para soltar el ESTRÉS y la ANSIEDAD. Mindful Science</h5>
                        </div>	
                    </div>
				</div>	
                <div class="col">
					<div class="card h-100">
                        <iframe width="354" height="373" src="https://www.youtube.com/embed/ifObMLAoNOc?si=7ypMecH2qj9NfZ2w" allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title"> Meditación & Morning Yoga</h5>
                        </div>	
                    </div>
				</div>	
                <div class="col">
					<div class="card h-100">
                        <iframe width="354" height="373" src="https://www.youtube.com/embed/gcfaCNeUx_g?si=UBsk0Of6dexZZ5Vn" allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title"> Vídeos de Yoga, Pilates y Meditacion online. Yoga en casa</h5>
                        </div>	
                    </div>
				</div>
                <div class="col">
					<div class="card h-100">
                        <iframe width="354" height="373" src="https://www.youtube.com/embed/4evSg0AJDRE?si=x9iTIqlsdPlss1FG"  allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title"> Hatha Flow para mover la energía del cuerpo</h5>
                        </div>	
                    </div>
				</div>
                <div class="col">
					<div class="card h-100">
                        <iframe width="354" height="373" src="https://www.youtube.com/embed/g4B6nn1Ll50?si=UU1o9mSrI_YbrQrM"  allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title"> Meditacion para dormir profundamente. Limpieza emocional. Easy Zen</h5>
                        </div>	
                    </div>
				</div>
                <div class="col">
					<div class="card h-100">
                        <iframe width="354" height="373" src="https://www.youtube.com/embed/kx8uFbUD5ts?si=7j71CLcY4F4kyFXL" allowfullscreen></iframe>
                        <div class="card-body">
                            <h5 class="card-title">Meditación guiada para calmar la ansiedad, la mente y eliminar el estres acumulado. Amitaba.</h5>
                        </div>	
                    </div>
				</div>	
			</div>		
                
        </div>

    )
    
}