import { decodeToken } from "../../../../../../services/encryptPass.js"
import { getUserById } from "../../../../../../services/userController.js"
import { getProjectById, getProjTasksByProjId, updateProject, deleteProject, deleteProjTask } from "../../../../../../services/projectController.js"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		switch (request.method) {
			case "GET":
				const projectReq = await getProjectById(parseInt(query.project_id))
				const projTasksReq = await getProjTasksByProjId(parseInt(query.project_id))

				// ? OK
				return response.status(200).json(
					{
						success: !!projectReq,
						query: query,
						method: method,
						data: {
							project: projectReq,
							project_tasks: projTasksReq
						}
					}
				)

			case "PUT":
				const userId = decodeToken(query.user_id)
				const userToUpdateProj = await getUserById(userId.user_id)
				const projToUpdate = await getProjectById(parseInt(query.project_id))
				const projectUpdated = await updateProject(
					projToUpdate,
					userToUpdateProj.id, body.new_name
				)

				// ? OK
				return response.status(200).json(
					{
						success: !!projectUpdated,
						query: query,
						method: method,
						message: !!projectUpdated ? "Project updated successfully" : "Error to update project!"
					}
				)

			case "DELETE":
				const userIdReq = decodeToken(query.user_id)
				const userToDeleteProj = await getUserById(userIdReq.user_id)
				const projToDelete = await getProjectById(parseInt(query.project_id))
				let hasProjDeleted = false
				if ( userToDeleteProj.id === projToDelete.user_id ) {
					const projTasksToDelete = await getProjTasksByProjId(projToDelete.id)
					projTasksToDelete.forEach(async (projTask) => {
						await deleteProjTask(projTask)
					})
					hasProjDeleted = await deleteProject(projToDelete)
				}

				// ? OK
				return response.status(200).json(
					{
						success: !!hasProjDeleted,
						query: query,
						method: method,
						message: !!hasProjDeleted ? "Project deleted successfully!" : "Error to delete project!"
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
