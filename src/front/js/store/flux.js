const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			contact: "",
			lecturas: [
				{ 
					id: 1,
					tittle:"Emocionario",
					img: "https://m.media-amazon.com/images/I/81Zucao4i0L._SY522_.jpg",
					descargar: "https://convivencia.files.wordpress.com/2020/04/emocionario.pdf"
				},
				{ 
					id: 2,
					tittle:"El lado positivo del fracaso",
					img: "https://pictures.abebooks.com/isbn/9780881135886-es.jpg",
					descargar: "https://ia801004.us.archive.org/24/items/ArticulosMaxwell/El_lado_positivo_del_fracaso_PP_.pdf"
				},
				{ 
					id: 3,
					tittle:"El cielo es el límite",
					img: "data:image/jpeg;base64,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",
					descargar: "https://formarse.com.ar/libros/Libros%20para%20descargar%20de%20maestros%20espirituales/El-cielo-es-el-limite.pdf"
				},
				{ 
					id: 4,
					tittle:"El arte de amar",
					img: "https://imgv2-1-f.scribdassets.com/img/document/264710817/original/41a802a076/1692910614?v=1",
					descargar: "https://psicolebon.files.wordpress.com/2016/07/erich-fromm-el-arte-de-amar.pdf"
				},
				{ 
					id: 5,
					tittle:"Comunicacion no violenta. Un lenguaje de vida",
					img: "https://m.media-amazon.com/images/I/71Rvhmx+VZL._SY522_.jpg",
					descargar: "https://c15208330.ssl.cf2.rackcdn.com/uploads/public/3f3a23b05a0dcb7e26f24fb69a9d899b.pdf"
				},
				{ 
					id: 6,
					tittle:"Companeros de oracion",
					img: "https://0.academia-photos.com/attachment_thumbnails/54636634/mini_magick20190116-14863-ea6wv.png?1547659179",
					descargar: "https://ia801004.us.archive.org/24/items/ArticulosMaxwell/John_C._Maxwell-Companeros_de_Oracion.pdf"
				}

			],
			favoritos: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			guardarInputsSignup: (newContact) => {
				
				fetch(process.env.BACKEND_URL + "/signup", {
				method: "POST",
				body: JSON.stringify(newContact),
				headers: {
				"Content-Type": "application/json",
				},
			})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Network response was not ok');
				}
			})
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
			
			},

			login: async (body) => {
				const resp = await fetch(process.env.BACKEND_URL + "/login", { 
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body) 
			   })
		   
			   if(!resp.ok) throw Error("There was a problem in the login request")
		   
			   if(resp.status === 401){
					throw("Invalid credentials")
			   }
			   else if(resp.status === 400){
					throw ("Invalid email or password format")
			   }
			   const data = await resp.json()
			   // save your token in the localStorage
			  //also you should set your user into the store using the setStore function
			   sessionStorage.setItem("token", data.token);
			   console.log("token", data.token)
		   
			   return data
		   }, 
		
		loginPrivate: async (body) => {
			const token = sessionStorage.getItem('token');
	   
			const resp = await fetch(process.env.BACKEND_URL + "/private", {
			   method: 'GET',
			   headers: { 
				 "Content-Type": "application/json",
				 "Authorization": 'Bearer '+token // ⬅⬅⬅ authorization token
			   } 
			})
			if (resp.status === 403) {
				throw Error("Missing or invalid token");
			} else if (resp.status !== 200) {
				throw Error("Unknown error");
			}
			
	   
			const data = await resp.json();
			console.log("This is the data you requested", data);
			return data
	   
	   },
	   borrarToken: () =>{
		   sessionStorage.removeItem('token');
		   alert('Te has desconectado de la aplicacion')
	   },
	   
	   handleAgregarFavoritos: async (articleId) => {
		const token = sessionStorage.getItem('token');
   
		const resp = await fetch(process.env.BACKEND_URL + "/favoritos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer '+token // ⬅⬅⬅ authorization token
            },
            body: JSON.stringify({ 'article_id': articleId }), // Envía el ID del artículo que se agregará a favoritos
        })
            
		},
	   agregarFavoritos: (favorito, user) => {
		const store = getStore();
		const favoritos = store.favoritos;
		favorito.user = user;

		const nuevosFavoritos = favoritos.includes(favorito)
		? favoritos 
		: [...favoritos, favorito]; 

		setStore({ ...store, favoritos: nuevosFavoritos });
	},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
