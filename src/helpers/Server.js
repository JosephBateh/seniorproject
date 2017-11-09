import axios from "axios";

export function serverAuth() {
	return axios({
		method: "GET",
		baseURL: "http://localhost:8080",
		url: "/"
	})
		.then(response => {
			return response.data.Address;
		})
		.catch(err => {
			console.log(err);
		});
}

export function saveSmartPlaylist(data) {
	return axios({
		method: "POST",
		baseURL: "http://localhost:8080",
		url: "/smartplaylist",
		data: data
	}).catch(err => {
		console.log(err);
	});
}
