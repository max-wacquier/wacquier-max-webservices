import skillsService from '#src/services/skillsService'

const exposeController = {
    allSkills: async (req, res) => {
        const allSkills = await skillsService.findAllSkills()
        return res.json(allSkills)
    },
    oneSkill: async (req, res) => {
        const {params:{id}} = req
        const oneSkill = await skillsService.findOneSkill({id})
        if(!oneSkill) return res.sendStatus(404)
        return res.json(oneSkill)
    },
    createSkill: async (req ,res) => {
        // Le body de ma requete est également undefined et je ne sais pas pourquoi
        const {body}  = req
        // const body = {
        //     name: "Python"
        // }
        try {
            const registeredSkill = await skillsService.createSkill(body)     
            return res.json(registeredSkill)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    updateSkill: async (req ,res) => {
        const {body} = req
        const {id} = req.params
        try {
            const updatedSkill = await skillsService.updateSkill({id, body})     
            return res.json(updatedSkill)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    deleteSkill: async (req ,res) => {
        const {id} = req.params
        try {
            const deletedSkill = await skillsService.deleteSkill({id})     
            return res.json(deletedSkill)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
}

export default exposeController