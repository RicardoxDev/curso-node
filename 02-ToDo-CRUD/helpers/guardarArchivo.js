import fs from "fs"

const pathDB = "./db/data.json"

export const guardarDB = (data) => {
	fs.writeFileSync( pathDB, JSON.stringify(data) )
}

export const leerDB = () => {
	if(!fs.existsSync(pathDB)) return null

	const info = fs.readFileSync(pathDB, { encoding: "utf-8" })
	const data = JSON.parse(info)

	return data
}
