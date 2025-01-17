import  mongoose, {Schema}  from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const userSchema = new Schema(
    {
        username: {type: String, required: true, unique: true, trim: true,index: true},
        email: {type: String, required: true, unique:true , trim: true, },
        fullname: {type: String, required: true, trim: true, index: true},
        avatar: {type: String, required: true},// cloudinary url
        cover_image: {type: String},
        watch_list: [{type: Schema.Types.ObjectId, ref: 'video'}], // array of video ids
        password: {type: String, required: [true, 'password is required']},
        refreshToken: {type: String,}, // jwt refresh token    
    }, 
    {timestamps: true});

    userSchema.pre('save', async function(next){
        const user = this;
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password, 8);
        }
        next();
    }); 

    userSchema.methods.isPassword= async function(password){
       return await  bcrypt.compare(password, this.password);
        // const user = this;
        // const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        // return token;
    }
    userSchema.methods.generateAccessToken = async function()
    {
      return  jwt.sign
        (
            {_id: this._id,
             email: this.email, 
             username: this.username, 
             fullname: this.fullname, 
             avatar: this.avatar, 
             cover_image: this.cover_image, 
             watch_list: this.watch_list
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
        
    }
    userSchema.methods.generateRefreshToken = async function(){
        return  jwt.sign
        (
            {_id: this._id,
            //  email: this.email, 
            //  username: this.username, 
            //  fullname: this.fullname, 
            //  avatar: this.avatar, 
            //  cover_image: this.cover_image, 
            //  watch_list: this.watch_list
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    }
export const User = mongoose.model("User", userSchema);