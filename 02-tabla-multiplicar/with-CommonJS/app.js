const { crearArchivo } = require("./helpers/multiplicar.js")
const { args } = require("./config/yargs.js") 

crearArchivo(args.b, args.h, args.l)
	.then( nombreArchivo => console.log(`${nombreArchivo} Creado`))
	.catch( err => console.log(err))

