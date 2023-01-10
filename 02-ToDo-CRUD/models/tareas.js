import chalk from "chalk"
import { Tarea } from "./tarea.js"

export class Tareas {
	_listado = {}

	get listadoArr() {
		const listado = [];
		Object.keys(this._listado).forEach( key => {
			const tarea = this._listado[key]
			listado.push(tarea)
		})

		return listado
	}

	constructor() {
		this._listado = {}
	}

	cargarTareasDB( tareas=[]) {
		tareas.forEach( task => {
			this._listado[task.id] = task
		})
	}

	crearTarea( desc = "") {
		const tarea = new Tarea(desc)
		this._listado[tarea.id] = tarea
	}

	listadoCompleto() {
		console.log()
		this.listadoArr.forEach((task, idx) => {
		  const { desc, completadoEn } = task
			const taskStatus = completadoEn !== null 
													? chalk.green("Completada") 
													: chalk.red("Pendiente")
		  console.log(`${chalk.blue((idx + 1) + ".")} ${desc} :: ${taskStatus}`)
		})
	}

	listarPendientesCompletadas( listarCompletadas = true) {
		console.log()
		this.listadoArr.filter((task, idx) => {
		  const { completadoEn } = task
			return Boolean(completadoEn) === listarCompletadas
		}).forEach((task, idx) => {
				  const { desc, completadoEn } = task
					const taskStatus = listarCompletadas
															? chalk.green(completadoEn) 
															: chalk.red("Pendiente")
				  console.log(`${chalk.blue((idx + 1) + ".")} ${desc} :: ${taskStatus}`)
				})
	}

	borrarTarea(id = "") {
		if(this._listado[id]) {
			delete this._listado[id]
		}
	}

	toggleCompletadas( ids = []) {
		ids.forEach(id => {
			const tarea = this._listado[id]
			if(!tarea.completadoEn) {
				tarea.completadoEn = new Date().toLocaleString()
			}
		})

		this.listadoArr.forEach( tarea => {
			if(!ids.includes(tarea.id)) {
				this._listado[tarea.id].completadoEn = null
			}
		})
	}
	
}
