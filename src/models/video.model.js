import mongoose , {Schema} from 'mongoose';
import mongooseAggregate from 'mongoose-aggregate-paginate-v2';
import { mongoose } from 'mongoose';
const videoSchema = new Schema(
    {
    video_file: {type: String, required: true},
    thumbnail: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    views: {type: Number, default:0, required: true},
    isPublic: {type: Boolean, default: true, required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // user id
    // owner : {type: String, required: true},
    // category: {type: String, required: true},
    // tags: {type: String, required: true},
    // likes: {type: Number, required: true},
    // dislikes: {type: Number, required: true},
    // comments: {type: Array, required: true},


    }, 
{timestamps: true});

videoSchema.plugin(mongooseAggregate);

export const Video = mongoose.model('Video' , videoSchema); //Video is the name of the collection