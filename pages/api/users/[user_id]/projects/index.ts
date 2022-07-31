import type { NextApiRequest, NextApiResponse } from 'next'
import { decodeToken } from "@services/encryptPass"
import { getUserById } from "@controllers/userController"
import { getProjectIdByName, getProjectsByUserId, getAllProjTasks, createProject, createProjTask } from "@controllers/projectController"
import { httpConstants } from "@config/constants/httpConstants"


export default async function apiResponse(request: NextApiRequest, response: NextApiResponse): Promise<void> {
	const { method, query, body } = request

	try {
		const userData = decodeToken(query?.user_id)?.decoded
		const userToManipulateProject = await getUserById(userData.user_id)
		const allProjTasks = await getAllProjTasks()

		switch (request?.method) {
			case "GET":
				const projectsToGet = await getProjectsByUserId(Number(userToManipulateProject?.id))
				const projList = []
				for (let i = 0; i < projectsToGet.length; i++) {
					const projTasksList = allProjTasks?.filter(projTask => projTask.proj_id == (projectsToGet[i]).id)
					projList.push({
						project: projectsToGet[i],
						proj_tasks: projTasksList
					})
				}

				return response.status(httpConstants.status.OK).json(
					{
						success: !!projectsToGet,
						query: query,
						method: method,
						data: projList
					}
				)

			case "POST":
				let projId: number | boolean | null = await getProjectIdByName(body?.proj_name)
				let hasCreatedProject = false
				if (!!userToManipulateProject && !projId) {
					projId = await createProject(
						userToManipulateProject?.id,
						body?.proj_name
					)
					hasCreatedProject = true
				}
				let hasCreatedProjTask: boolean | number = false
				if (!!userToManipulateProject && !allProjTasks.find(projTask => projTask.task_num == body?.task_num)) {
					hasCreatedProjTask = await createProjTask(
						Number(projId),
						body?.task_num, body?.task_name,
						body?.description, body?.deadline,
						body?.situation, body?.was_finished,
						false
					)
				}
				const hasCreated = !!hasCreatedProject || !!hasCreatedProjTask

				return response.status(httpConstants.status.CREATED).json(
					{
						success: hasCreated,
						query: query,
						method: method,
						message: hasCreated
							? httpConstants.messages.created("Project or project task")
							: httpConstants.messages.notCreated("project or project task")
					}
				)

			default:
				// ? Unauthorized
				return response.status(httpConstants.status.OK).json(
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
		return response.status(httpConstants.status.OK).json(
			{
				success: false,
				message: message
			}
		)
	}
}
