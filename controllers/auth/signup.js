const bcrypt = require("bcryptjs")
const gravatar = require("gravatar")
const {nanoid} = require("nanoid")

const { User } = require("../../models/user")

const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers")


const signup = async (req, res) => {
    const { subscription, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw RequestError(409, "Email in use")
    }
    
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    await User.create({ subscription, email, password: hashPassword, avatarURL, verificationToken });
    
    const mail = createVerifyEmail(email, verificationToken)

    await sendEmail(mail);

    res.status(201).json({
        email,
        subscription,
    })
}

module.exports = signup;