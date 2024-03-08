import express from 'express'
import projectsController from '#src/controllers/projectsController'
const router = express.Router()

router.get('/', projectsController.allProjects)

router.get('/:id', projectsController.oneProject)

router.post('/', projectsController.createProject)

router.put('/:id', projectsController.updateProject)

router.delete('/:id', projectsController.deleteProject)

export default router