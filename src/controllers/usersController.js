import usersService from '#src/services/usersService'

const exposeController = {
    allUsers: async (req, res) => {
        const allUsers = await usersService.findAllUsers()
        return res.json(allUsers)
    },
    oneUser: async (req, res) => {
        const {params:{id}} = req
        const oneUser = await usersService.findOneUser({id})
        if(!oneUser) return res.sendStatus(404)
        return res.json(oneUser)
    },
    createUser: async (req ,res) => {
        console.log(req)
        const {body}  = req
        console.log(body)
        // Le body de ma requete est undefined au lieu d'etre un json, cela fonctionne avec les données statiques en commentaire
        // const body = {
        //     lastName: "le roi du gateau",
        //     firstName: "Pepito",
        //     email: "pepito.leroidugateau@gmail.com",
        //     password: "pepito"
        // }
        try {
            const registeredUser = await usersService.createUser(body)     
            return res.json(registeredUser)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    updateUser: async (req ,res) => {
        const {body} = req
        const {id} = req.params
        try {
            const updatedUser = await usersService.updateUser({id, body})     
            return res.json(updatedUser)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    deleteUser: async (req ,res) => {
        const {id} = req.params
        try {
            const deletedUser = await usersService.deleteUser({id})     
            return res.json(deletedUser)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
}

export default exposeController