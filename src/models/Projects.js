import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
    name : String,
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ]
},
{ timestamps: true }
)

const userModel = mongoose.model('projects', userSchema)

export default userModel