const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
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

			signupUser: (user) => {
				
				fetch(process.env.BACKEND_URL + "/user-register", {
				method: "POST",
				body: JSON.stringify(user),
				headers: {
				"Content-Type": "application/json",
				},
			})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Se produjo un error en la red');
				}
			})
			.then(data => console.log(data))
			.catch(error => console.log('error', error));
			
			},
			

			loginUser: async (body) => {
				const resp = await fetch(process.env.BACKEND_URL + "/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body)
				})

				if (!resp.ok) throw Error("Hubo un problema en la solicitud de inicio de sesión.")

				if (resp.status === 401) {
					throw ("Credenciales no válidas")
				}
				else if (resp.status === 400) {
					throw ("Correo electrónico o contraseña no válido")
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
						"Authorization": 'Bearer ' + token // ⬅⬅⬅ authorization token
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
			borrarToken: () => {
				sessionStorage.removeItem('token');
				alert('Te has desconectado de la aplicacion')
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
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
