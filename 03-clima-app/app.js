import chalk from "chalk"
import * as dotenv from "dotenv"
import { inquirerMenu, pause, readInput, listarLugares } from "./helpers/inquirer.js"
import { Busquedas } from "./models/busquedas.js"

dotenv.config()
console.clear()

const main = async() => {
	const busquedas = new Busquedas()
	let opt;
	
	do {
		opt = await inquirerMenu()

		switch(opt) {
			case 1:
				const termino = await readInput("Ciudad: ")
				const lugares = await busquedas.ciudad(termino)
				const selectID = await listarLugares(lugares)
				const selectLocation = lugares.find(l => l.id = selectID)
				if(selectID === "0") continue
				
				const { name, lat, lon } = selectLocation

				busquedas.agregarHistorial(name)
				
				const { desc, min, max, temp } = await busquedas.climaCiudad(lat, lon)

				
				console.log(chalk.blue("\nInformación de la ciudad\n"))
				console.log("Ciudad:", name)
				console.log("Lat:", lat)
				console.log("Lng:", lon)
				console.log("Temperatura:", temp)
				console.log("Mínima:", min)
				console.log("Máxima", max)
				console.log("Clima:", desc)
			break
			case 2:
			  busquedas.historial.forEach( (lugar, idx) => {
			  	console.log(chalk.blue((idx + 1) + ".") + " " + lugar)
				})
			break
		}
				
		if(opt !== 0) await pause()
	} while(opt !== 0)
}

main()
