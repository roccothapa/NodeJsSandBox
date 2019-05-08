import bcrypt from "bcrypt-nodejs"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    token: {
        accessToken: String,
        refreshToken: String,
        expiresAt: Date
    },
    role: {
        type: String,
        enum: ["admin", "project_manager", "client"],
        required: true,
    },
    designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "designation",
        required: true
    }
}, { 
    timestamps: true
})

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) { return next() }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err) }
        bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
            if (err) { return next(err) }
            user.password = hash
            next()
        })
    })
})

/**
 * Compare password function type
 * 
 * @param  {string} plainPassword
 * @param  {(err:any,isMatch:any)=>{}} cb
 */
type comparePasswordFunction = (plainPassword: string, cb: (err: any, isMatch: any) => {}) => void


/**
 * Compare password
 * 
 * @param  {} plainPassword
 * @param  {} cb
 */
const comparePassword: comparePasswordFunction = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch)
    })
}
userSchema.methods.comparePassword = comparePassword;

export default mongoose.model("user", userSchema)