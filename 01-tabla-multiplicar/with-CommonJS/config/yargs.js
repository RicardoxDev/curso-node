const args = require("yargs")
    .options({
	  "b": {
	    alias: "base",
		type: "number",
		demandOption: true,
		describe: "Es la base de la tabla de multiplicar"
	  },
	  "h": {
	  	alias: "hasta",
	    type: "number",
	  	demandOption: true,
	  	describe: "Es el límite de la tabla de multiplicar"
	  },
	  "l": {
	  	alias: "listar",
	    type: "boolean",
	  	default: false,
	  	describe: "Muestra la tabla en consola"
	  }
	})
	.check((argv, options) => {
		if(Number.isNaN(argv.b)) throw "La base tiene que ser un número"
		return true
	})
	.argv

module.exports = {
	args
}
