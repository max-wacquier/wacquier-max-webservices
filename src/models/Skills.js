import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
    name : String
},
{ timestamps: true }
)

const userModel = mongoose.model('skills', userSchema)

export default userModel