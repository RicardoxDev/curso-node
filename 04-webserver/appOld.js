import http from "http"

console.clear()

http.createServer( (req, res) => {

	res.writeHead(200, { "Content-Type": "application/json" })

	const persona = {
		nombre: "Ricardo",
		profesión: "Desarrollador Web",
		edad: 16
	}
	
	res.write(JSON.stringify(persona))
	res.end()
		
})
.listen(8080)

console.log("escuchando el puerto", 8080)
