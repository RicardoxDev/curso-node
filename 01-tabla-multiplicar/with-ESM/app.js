import { crearArchivo } from "./helpers/multiplicar.js"
import { args } from "./config/yargs.js" 

crearArchivo(args.b, args.h, args.l)
	.then( nombreArchivo => console.log(`${nombreArchivo} Creado`))
	.catch( err => console.log(err))

