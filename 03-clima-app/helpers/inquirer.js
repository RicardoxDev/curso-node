import chalk from "chalk"
import inquirer from "inquirer"

const preguntas = [
	{
		type: "list",
		name: "opcion",
		message: "¿Qué desea hacer?",
		choices: [
			{
				value: 1,
				name: chalk.blue("1.") + " Buscar Ciudad"
			},
			{
				value: 2,
				name: chalk.blue("2.") + " Ver Historial"
			},
			{
				value: 0,
				name: chalk.blue("0.") + " Salir"
			}]
		}
	]

export const inquirerMenu = async() => {
				
	console.clear()
	console.log(chalk.cyan("========================="))
	console.log(chalk.blue("  Seleccione una opción"))
	console.log(chalk.cyan("========================="))

	const { opcion } = await inquirer.prompt(preguntas);
	return opcion
}

export const pause = async () => {
	const question = [
		{
			type: "input",
			name: "enter",
			message: "\nPresione " + chalk.blue("ENTER") + " para continuar\n"
		}
	]

	console.log("\n")
	const { enter } = await inquirer.prompt(question)
	return enter
}

export const readInput = async(message) => {
	const question = [{
		type: "input",
		name: "desc",
		message,
		validate( value ) {
			if(value.length === 0) {
				return "Por favor ingrese un valor"
			}
			return true
		}
	}]

	const { desc } = await inquirer.prompt(question)
	return desc
}

export const confirmar = async (message) => {
	const question = [
		{
			type: "confirm",
			name: "ok",
			message
		}
	]

	const { ok } = await inquirer.prompt(question)
	return ok
}

export const listarLugares = async(lugares = []) => {
	const choices = lugares.map( (lugar, i) => {
		const idx = chalk.blue((i + 1) + ".")
		return {
			value: lugar.id,
			name: `${idx} ${lugar.name}`
		}
	})

	choices.push({
		value: "0",
		name: `${chalk.blue("0.")} Cancelar`
	})
	const preguntas = [
		{
			type: "list",
			name: "id",
			message: "Seleccione el lugar:",
			choices
		}
	]
	const { id } = await inquirer.prompt(preguntas)
	return id
}

export const mostrarListadoChecklist = async(tareas = []) => {
	const choices = tareas.map( (tarea, i) => {
		const idx = chalk.blue((i + 1) + ".")
		return {
			value: tarea.id,
			name: `${idx} ${tarea.desc}`,
			checked: Boolean(tarea.completadoEn)
		}
	})

	const pregunta = [
		{
			type: "checkbox",
			name: "ids",
			message: "Seleccione",
			choices
		}
	]
	const { ids } = await inquirer.prompt(pregunta)
	return ids
}

