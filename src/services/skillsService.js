
import Skill from "#src/models/Skills";

const exposeServices = {
    findAllSkills: async () => {
        try {
            const allSkills = await Skill.find()
            return allSkills
        } catch (error) {
            throw error
        }
    },
    findOneSkill: async ({id:_id}) => {
        try {
            const oneSkill = await Skill.findOne({_id})
            return oneSkill
        } catch (error) {
            throw error
        }
    },
    createSkill: async (rawData) => {
        console.log(rawData);
        try {
            const toSave = new Skill(rawData)
            const newSkill = toSave.save()
            return newSkill
        } catch (error) {
            throw error
        }
    },
    updateSkill: async ({id, body}) => {
        try {
            const updatedSkill = await Skill.findOneAndUpdate({_id:id}, body, {new:true})
            return updatedSkill
        } catch (error) {
            throw error
        }
    },
    deleteSkill: async ({id}) => {
        try {
            const deletedSkill = await Skill.findOneAndDelete({_id:id})
            return deletedSkill
        } catch (error) {
            throw error
        }
    }
}

export default exposeServices