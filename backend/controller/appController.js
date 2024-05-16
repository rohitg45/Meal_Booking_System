const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('../env.js')

/** send mail from gmail account */
const getmail = (req, res) => {

    const { userEmail } = req.body;

    let config = {
        service : 'gmail',
        auth : {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : "User",
            intro: "To set your new password click on below link",
            // link: "https://www.w3schools.com/",
            // table : {
            //     data : [
            //         {
            //             item : "Nodemailer Stack Book",
            //             description: "A Backend application",
            //             price : "$10.99",
            //         }
            //     ]
            // },
            outro: `https://www.w3schools.com/`
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : EMAIL,
        to : userEmail,
        subject: "Forgot Password",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })
}


module.exports = {
    getmail
}