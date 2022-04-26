import type { NextApiRequest, NextApiResponse } from 'next'
import { decodeToken } from "@services/encryptPass"
import { getUserById } from "@controllers/userController"
import { getAllProjTasks, updateProjTask, deleteProjTask, getProjectsByUserId } from "@controllers/projectController"
import { httpConstants } from "@config/constants/httpConstants"


export default async function apiResponse(request: NextApiRequest, response: NextApiResponse): Promise<void> {
	const { method, query, body } = request

	try {
		const userData = decodeToken(query.user_id)?.decoded
		const userToManipulateProjTask = await getUserById(userData.user_id)
		const projectsToManipulateProjTask = await getProjectsByUserId(Number(userToManipulateProjTask?.id))
		const projectToManipulateProjTask = projectsToManipulateProjTask.find(project => project.id == Number(query.project_id))
		const allProjTasks = await getAllProjTasks()

		switch (request.method) {
			case "PUT":
				const projTaskToUpdate = allProjTasks.find(projTask => projTask.id == Number(query.proj_task_id))
				let hasProjTaskUpdated = false
				if (userToManipulateProjTask?.id == projectToManipulateProjTask?.user_id) {
					hasProjTaskUpdated = await updateProjTask(
						projTaskToUpdate, Number(projTaskToUpdate?.proj_id),
						body.new_task_num, body.new_name,
						body.new_description, body.new_deadline,
						body.new_situation, body.new_was_finished
					)
				}

				return response.status(httpConstants.status.OK).json(
					{
						success: !!hasProjTaskUpdated,
						query: query,
						method: method,
						message: !!hasProjTaskUpdated
							? httpConstants.messages.updated("Project task")
							: httpConstants.messages.notUpdated("project task")
					}
				)

			case "DELETE":
				const projTaskToDelete = allProjTasks.find(projTask => projTask.id == Number(query.proj_task_id))
				let hasProjTaskDeleted = false
				if (userToManipulateProjTask?.id == projectToManipulateProjTask?.user_id) {
					hasProjTaskDeleted = await deleteProjTask(projTaskToDelete)
				}

				return response.status(httpConstants.status.OK).json(
					{
						success: !!hasProjTaskDeleted,
						query: query,
						method: method,
						message: !!hasProjTaskDeleted
							? httpConstants.messages.deleted("Project task")
							: httpConstants.messages.notDeleted("project task")
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
