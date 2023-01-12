import express from "express"
import hbs from "hbs"
import * as dotenv from "dotenv"

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
const app = express()
const port = process.env.PORT

console.clear()

app.set("view engine", "hbs")
hbs.registerPartials( __dirname + "/views/partials")

//Servir contenido estático
app.use( express.static( "public" ) )

app.get("/", (req, res) => {
	res.render("home", {
		nombre: "RicardoDev",
	})
})

app.get("*", (req, res) => {
	res.render( "404" )
})

app.listen(port, () => {
	console.log(`Tu servidor está corriendo en http://localhost:${port}`)
})
