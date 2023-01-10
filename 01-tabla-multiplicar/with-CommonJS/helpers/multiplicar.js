const colors = require("colors")
const fs = require("fs")

const crearArchivo = async (base, limite, listar=false) => {
	try {
		let salida = ""
		let salidaLog = ""
  		for(let i = 1; i <= limite; i++) {
  			salida += `${base} * ${i} = ${base*i}\n`
    		salidaLog += `${colors.green(base)} ${colors.red("*")} ${colors.green(i)} = ${colors.blue(base*i)}\n`
		}
  
  		fs.writeFileSync(`./output/tabla-${base}.txt`, salida)

  		if(listar) console.log(salidaLog);
  		return `tabla-${base}.txt`
  		
	} catch (err) {
		throw err
	}
};

module.exports = {
	crearArchivo
}
