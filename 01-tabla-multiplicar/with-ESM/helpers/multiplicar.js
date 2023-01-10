import fs from "fs"
import chalk from "chalk"

export const crearArchivo = async (base, limite, listar=false) => {
	try {
		let salida = ""
		let salidaLog = ""
  		for(let i = 1; i <= limite; i++) {
  			salida += `${base} * ${i} = ${base*i}\n`
    		salidaLog += `${chalk.green(base)} ${chalk.red("*")} ${chalk.green(i)} = ${chalk.blue(base*i)}\n`
		}
  
  		fs.writeFileSync(`./output/tabla-${base}.txt`, salida)

  		if(listar) console.log(salidaLog);
  		return `tabla-${base}.txt`
  		
	} catch (err) {
		throw err
	}
};
