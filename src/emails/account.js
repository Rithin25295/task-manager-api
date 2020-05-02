const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

//Specify where to and from emails..email config
const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to: email,
        from:'rithinsai6@gmail.com',
        subject:'Thanks for joining in',
        //ES6 template string (``)
        text:`Welcome to the App, ${name}. Let me know how you get along with the app.`
    })
}
const goodByeMessage = "See you soon"

const sendCancelEmail = (email,name) => {
    sgMail.send({
        to:email,
        from:'rithinsai6@gmail.com',
        subject:`${goodByeMessage}`,
        text:`Sorry for the inconvinience team ${name}. We would appreciate for you valuable feedback to improve our APP.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}