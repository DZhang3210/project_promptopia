import {Schema, model, models} from 'mongoose'

const LikeSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref:'Prompt'
    },
    liked:{
        type: Boolean
    }
})

const Like = models.Prompt || model('Like', LikeSchema)

export default Like