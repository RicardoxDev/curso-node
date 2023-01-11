import fs from "fs"
import axios from "axios"

export class Busquedas {
	historial = []
	dbPath =  "./db/database.json"

	constructor() {
		this.leerDB()
	}

	async ciudad( lugar = "") {
		try {
			const token = process.env.LOCATIONIQ_KEY
			const resp = await axios.get(`https://api.locationiq.com/v1/autocomplete?key=${token}&q=${lugar}`)
			const citys = await resp.data

			return citys.map(city => ({
				id: city["osm_id"],
				name: city["display_name"],
				lon: city.lon,
				lat: city.lat
			}))	
		} catch (error) {
			console.log("No se han encontrado ciudades para:", lugar)
			return []
		}
	}

	async climaCiudad( lat = 0, lon = 0 ) {
		try {
			const token = process.env.OPENWEATHER_KEY
			const baseURL = "https://api.openweathermap.org/data/2.5/weather?"
			const params = [`lat=${lat}`, `lon=${lon}`, `appid=${token}`, `units=metric`, `lang=es`]
			const resp = await axios.get(baseURL + params.join("&"))
			const { weather, main } = await resp.data
			
			return {
				desc: weather[0].description,
				min: main.temp_min,
				max: main.temp_max,
				temp: main.temp
			}
		} catch(error) {
			console.log("No se ha podido encontrar los datos climáticos. Error:", error)
			return {}
		}
	}

	agregarHistorial(lugar = "") {
	  if(this.historial.includes(lugar)) return
	 
		this.historial = this.historial.splice(0, 5)	 
	  this.historial.unshift(lugar);
	}

	guardarDB() {
		const payload = {
			historial: this.historial
		}
		
		fs.writeFileSync(this.dbPath, JSON.stringify(payload))
	}

	leerDB() {
		if( !fs.existsSync( this.dbPath ) ) return
		
		const info = fs.readFileSync( this.dbPath, { encoding: "utf-8" } )
		const data = JSON.parse( info )

		this.historial = data.historial
	}
	
}
