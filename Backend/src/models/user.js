import { Schema, model } from "mongoose";
import { genSaltSync, hashSync } from "bcrypt";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            isEmail: true, //checks for email format
            trim: true,
        },
        avatar: {
            type: String,
            default:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        },
        password: {
            type: String,
            minLength: 5,
            required: true,
            match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    const user = this;
    const salt = genSaltSync(9);
    const encryptedPassword = hashSync(user.password, salt);
    user.password = encryptedPassword;
    next();
});

const User = model("User", userSchema);

export default User;
