import {Schema, model, models} from 'mongoose'

const LikeSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Prompt',
        required: true,
    },
    liked: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Like = models.Like || model('Like', LikeSchema);

export default Like;
