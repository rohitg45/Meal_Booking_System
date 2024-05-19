import nodemailer from "nodemailer";
import Mailgen from 'mailgen';

import {configDotenv} from "dotenv";
configDotenv();

const { EMAIL, PASSWORD } = process.env;

/** send mail from gmail account */
const sendMail = (userEmail, subject,body) => {

    // const { userEmail } = req.body;

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
            // name : "User",
            // intro: "To set your new password click on below link",
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
            outro: body
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : EMAIL,
        to : userEmail,
        subject: subject,
        html: mail
    }

    transporter.sendMail(message)
    .then(() => {
       console.log("You should receive an email");
    }).catch(error => {
        console.log("Error: ", error);
    })
}


export {
    sendMail
}