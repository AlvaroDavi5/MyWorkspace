import { decodeToken } from "../../../../../../../services/encryptPass"
import { getUserById } from "../../../../../../../controllers/userController"
import { getAllProjTasks, updateProjTask, deleteProjTask, getProjectsByUserId } from "../../../../../../../controllers/projectController"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		const userData = decodeToken(query.user_id).decoded
		const userToManipulateProjTask = await getUserById(userData.user_id)
		const projectsToManipulateProjTask = await getProjectsByUserId(userToManipulateProjTask.id)
		const projectToManipulateProjTask = projectsToManipulateProjTask.find(project => project.id == query.project_id)
		const allProjTasks = await getAllProjTasks()

		switch (request.method) {
			case "PUT":
				const projTaskToUpdate = allProjTasks.find(projTask => projTask.id == query.proj_task_id)
				let hasProjTaskUpdated = false
				if (userToManipulateProjTask.id == projectToManipulateProjTask.user_id) {
					hasProjTaskUpdated = await updateProjTask(
						projTaskToUpdate, projTaskToUpdate.proj_id,
						body.new_task_num, body.new_name,
						body.new_description, body.new_deadline,
						body.new_situation, body.new_was_finished
					)
				}

				// ? OK
				return response.status(200).json(
					{
						success: !!hasProjTaskUpdated,
						query: query,
						method: method,
						message: !!hasProjTaskUpdated ? "Project task updated successfully" : "Error to update project task!"
					}
				)

			case "DELETE":
				const projTaskToDelete = allProjTasks.find(projTask => projTask.id == query.proj_task_id)
				let hasProjTaskDeleted = false
				if (userToManipulateProjTask.id == projectToManipulateProjTask.user_id) {
					hasProjTaskDeleted = await deleteProjTask(projTaskToDelete)
				}

				// ? OK
				return response.status(200).json(
					{
						success: !!hasProjTaskDeleted,
						query: query,
						method: method,
						message: !!hasProjTaskDeleted ? "Project task deleted successfully!" : "Error to delete project task!"
					}
				)

			default:
				// ? Unauthorized
				return response.status(401).json(
					{
						success: false,
						query: query,
						method: method,
						message: "Unauthorized"
					}
				)
		}
	}
	catch ({ message }) {
		// ? Not found
		return response.status(404).json(
			{
				success: false,
				message: message
			}
		)
	}
}
