const { User } = require("../../models/user");

const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");

const resendEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw RequestError(400, "Missing required field email")
    }

    if (user.verify) {
        throw RequestError(400, "Verification has already been passed")
    }

    const mail = createVerifyEmail(email, user.verificationToken)

    await sendEmail(mail);

    res.json({
        message: "Verification email send"
    })
}

module.exports = resendEmail;