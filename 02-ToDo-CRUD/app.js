import chalk from "chalk"
import { 
	inquirerMenu,
	pause,
  readInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
   } from "./helpers/inquirer.js"
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js"
import { Tarea } from "./models/tarea.js"
import { Tareas } from "./models/tareas.js"

const main = async() => {
	let opt = ""
	const tareas = new Tareas()
	const readDB = leerDB()

	if(readDB) {
		tareas.cargarTareasDB(readDB)	
	}
	
	do {
		opt = await inquirerMenu();

		switch(opt) {
			case "1": // Crear Tarea
				const desc = await readInput("Descripción:")
				tareas.crearTarea( desc )
			break;
			case "2": // Listar Tareas
			  tareas.listadoCompleto()
			break;
			case "3": // Listar Tareas Completadas
			  tareas.listarPendientesCompletadas()
		  break;
		  case "4": // Listar Tareas Pendientes
		  	tareas.listarPendientesCompletadas(false)
		  break;
		  case "5": // Completar Tarea(s)
		  			const ids = await mostrarListadoChecklist(tareas.listadoArr)
		  			tareas.toggleCompletadas(ids)
		  			
		  break;
		  case "6": // Borrar Tarea
		  	const id = await listadoTareasBorrar(tareas.listadoArr)
		  	if(id !== "0") {
		  		const ok = await confirmar("¿Está seguro?")
				  if( ok ) {
	  		  	tareas.borrarTarea( id )
	  			 	console.log("Tarea Borrada")
	  	  	}
		  	}
		  break;
		  case "0":
		  		  			
		  break;
			
		}
		
		guardarDB(tareas.listadoArr)
		
		await pause()

	} while(opt !== "0")
	
}

main()
