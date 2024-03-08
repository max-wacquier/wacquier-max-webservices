import User  from "#src/models/Users";
import bcrypt from "bcryptjs"

const exposeServices = {
    findAllUsers: async () => {
        try {
            const allUsers = await User.find()
            return allUsers
        } catch (error) {
            throw error
        }
    },
    findOneUser: async ({id:_id})=>{
        try {
            const oneUser = await User.findOne({_id})
            return  oneUser
        } catch (error) {
            throw error
        }
    },
    createUser: async (rawData)=>{
        const {password} = rawData
        const salt = bcrypt.genSaltSync(4)
        const hash = bcrypt.hashSync(password, salt)
        const newUserData = {
            ...rawData,
            password:hash
        }
        console.log(newUserData);
        try {
            const toSave  = new User(newUserData)
            console.log(toSave);
            const newUser = toSave.save()   
            return newUser
        } catch (error) {
            throw error
        }
    },
    updateUser: async ({id, body}) => {
        try {
            const updatedUser = await User.findOneAndUpdate({_id:id}, body, {new:true})
            return updatedUser
        } catch (error) {
            throw error
        }
    },
    deleteUser: async ({id}) => {
        try {
            const deletedUser = await User.findOneAndDelete({_id:id})
            return deletedUser
        } catch (error) {
            throw error
        }
    },
    findOneUserByEmail: async ({email}) => {
        try {
            const findUser = await User.findOne({email})
            return findUser
        } catch (error) {
            throw error
        }
    },
    updateUserToken: async ({id, refreshToken}) => {
        const query = {
            _id:id
        }
        const updateQ = {
            $set:{
                refreshToken
            }
        }
        try {
            const toUpdate = await User.findOneAndUpdate(query, updateQ, {new:true})
            return toUpdate
        } catch (error) {
            throw error
        }
    }
}

export default exposeServices