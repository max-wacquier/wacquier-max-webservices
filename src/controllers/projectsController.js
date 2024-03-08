import projectsService from '#src/services/projectsService'

const exposeController = {
    allProjects: async (req, res) => {
        const allProjects = await projectsService.findAllProjects()
        return res.json(allProjects)
    },
    oneProject: async (req, res) => {
        const {params:{id}} = req
        const oneProject = await projectsService.findOneProject({id})
        if(!oneProject) return res.sendStatus(404)
        return res.json(oneProject)
    },
    createProject: async (req ,res) => {
        // Le body de ma requete est également undefined et je ne sais pas pourquoi
        const {body}  = req
        // const body = {
        //     name: "Super projet",
        //     users: ["65eb26b4b13e36552075cb0d"]
        // }
        try {
            const registeredProject = await projectsService.createProject(body)     
            return res.json(registeredProject)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    updateProject: async (req ,res) => {
        const {body} = req
        const {id} = req.params
        try {
            const updatedProject = await projectsService.updateProject({id, body})     
            return res.json(updatedProject)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    deleteProject: async (req ,res) => {
        const {id} = req.params
        try {
            const deletedProject = await projectsService.deleteProject({id})     
            return res.json(deletedProject)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
}

export default exposeController