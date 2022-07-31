import type { NextApiRequest, NextApiResponse } from 'next'
import { decodeToken } from "@services/encryptPass"
import { getUserById } from "@controllers/userController"
import { getProjectsByUserId, getProjTasksByProjId, updateProject, deleteProject, deleteProjTask } from "@controllers/projectController"
import { httpConstants } from "@config/constants/httpConstants"


export default async function apiResponse(request: NextApiRequest, response: NextApiResponse): Promise<void> {
	const { method, query, body } = request

	try {
		const userData = decodeToken(query?.user_id)?.decoded
		const userToManipulateProject = await getUserById(userData.user_id)

		switch (request?.method) {
			case "GET":
				const projectsToGet = await getProjectsByUserId(Number(userToManipulateProject?.id))
				const projectToGet = projectsToGet.find(project => project.id == Number(query?.project_id))
				const projTasksToGet = await getProjTasksByProjId(Number(projectToGet?.id))

				return response.status(httpConstants.status.OK).json(
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
				const projectsToUpdate = await getProjectsByUserId(Number(userToManipulateProject?.id))
				const projectToUpdate = projectsToUpdate.find(project => project.id == Number(query?.project_id))
				const hasProjectUpdated = await updateProject(
					projectToUpdate,
					Number(userToManipulateProject?.id), body?.new_name
				)

				return response.status(httpConstants.status.OK).json(
					{
						success: !!hasProjectUpdated,
						query: query,
						method: method,
						message: !!hasProjectUpdated
							? httpConstants.messages.updated("Project")
							: httpConstants.messages.notUpdated("project")
					}
				)

			case "DELETE":
				const projectsToDelete = await getProjectsByUserId(Number(userToManipulateProject?.id))
				const projectToDelete = projectsToDelete.find(project => project.id == Number(query?.project_id))
				let hasProjDeleted = false
				if (userToManipulateProject?.id == projectToDelete?.user_id) {
					const projTasksToDelete = await getProjTasksByProjId(Number(projectToDelete?.id))
					projTasksToDelete.forEach(async (projTask) => {
						await deleteProjTask(projTask)
					})
					hasProjDeleted = await deleteProject(projectToDelete)
				}

				return response.status(httpConstants.status.OK).json(
					{
						success: !!hasProjDeleted,
						query: query,
						method: method,
						message: !!hasProjDeleted
							? httpConstants.messages.deleted("Project")
							: httpConstants.messages.notDeleted("project")
					}
				)

			default:
				return response.status(httpConstants.status.UNAUTHORIZED).json(
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
		return response.status(httpConstants.status.NOT_FOUND).json(
			{
				success: false,
				message: message
			}
		)
	}
}
