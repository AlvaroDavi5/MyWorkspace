import { decodeToken } from "../../../../../../services/encryptPass"
import { getUserById } from "../../../../../../controllers/userController"
import { getProjectsByUserId, getProjTasksByProjId, updateProject, deleteProject, deleteProjTask } from "../../../../../../controllers/projectController"


export default async function apiResponse(request, response) {
	const { method, query, body } = request

	try {
		const userData = decodeToken(query.user_id).decoded
		const userToManipulateProject = await getUserById(userData.user_id)

		switch (request.method) {
			case "GET":
				const projectsToGet = await getProjectsByUserId(userToManipulateProject.id)
				const projectToGet = projectsToGet.find(project => project.id == query.project_id)
				const projTasksToGet = await getProjTasksByProjId(projectToGet.id)

				// ? OK
				return response.status(200).json(
					{
						success: !!projectToGet,
						query: query,
						method: method,
						data: {
							project: projectToGet,
							project_tasks: projTasksToGet
						}
					}
				)

			case "PUT":
				const projectsToUpdate = await getProjectsByUserId(userToManipulateProject.id)
				const projectToUpdate = projectsToUpdate.find(project => project.id == query.project_id)
				const hasProjectUpdated = await updateProject(
					projectToUpdate,
					userToManipulateProject.id, body.new_name
				)

				// ? OK
				return response.status(200).json(
					{
						success: !!hasProjectUpdated,
						query: query,
						method: method,
						message: !!hasProjectUpdated ? "Project updated successfully" : "Error to update project!"
					}
				)

			case "DELETE":
				const projectsToDelete = await getProjectsByUserId(userToManipulateProject.id)
				const projectToDelete = projectsToDelete.find(project => project.id == query.project_id)
				let hasProjDeleted = false
				if (userToManipulateProject.id == projectToDelete.user_id) {
					const projTasksToDelete = await getProjTasksByProjId(projectToDelete.id)
					projTasksToDelete.forEach(async (projTask) => {
						await deleteProjTask(projTask)
					})
					hasProjDeleted = await deleteProject(projectToDelete)
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
