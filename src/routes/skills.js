import express from 'express'
import skillsController from '#src/controllers/skillsController'
const router = express.Router()

router.get('/', skillsController.allSkills)

router.get('/:id', skillsController.oneSkill)

router.post('/', skillsController.createSkill)

router.put('/:id', skillsController.updateSkill)

router.delete('/:id', skillsController.deleteSkill)

export default router