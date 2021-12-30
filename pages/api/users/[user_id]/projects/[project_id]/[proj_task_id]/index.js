import { decodeToken } from "../../../../../../../services/encryptPass.js"
import { getUserById } from "../../../../../../../services/userController.js"
import { getProjectById, getProjTaskById, updateProjTask, deleteProjTask } from "../../../../../../../services/projectController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "PUT":
				const userId = decodeToken(query.user_id)
				const userToUpdateProjTask = await getUserById(userId.user_id)
				const projTaskToUpdate = await getProjTaskById(parseInt(query.proj_task_id))
				const projToUpdateProjTask = await getProjectById(projTaskToUpdate.proj_id)
				let hasProjTaskUpdated = false
				if (userToUpdateProjTask.id === projToUpdateProjTask.user_id) {
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
				const userIdReq = decodeToken(query.user_id)
				const userToDeleteProjTask = await getUserById(userIdReq.user_id)
				const projTaskToDelete = await getProjTaskById(parseInt(query.proj_task_id))
				const projToDeleteProjTask = await getProjectById(projTaskToDelete.proj_id)
				let hasProjTaskDeleted = false
				if ( userToDeleteProjTask.id === projToDeleteProjTask.user_id ) {
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
