import Mailgen from "mailgen";
import nodemailer from "nodemailer"
import 'dotenv/config'; // loads .env into process.env


const sendEmail = async(options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagelink.com"
    }
  })

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)

  const emailHtml = mailGenerator.generate(options.mailgenContent)

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS
    }
  })

  // const transporter = nodemailer.createTransport({
  //   host: 'sandbox.smtp.mailtrap.io',
  //   port: 2525,
  //   secure: false,
  //   authMethod: 'LOGIN',
  //   auth: {
  //     user: '062125ea495162',
  //     pass: '6178bc9b653886'
  //   }
  // })

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml // browser picks html if it supports if not automatically use textual
  }

  try{
    await transporter.sendMail(mail);
  }catch(err){
    console.error(
      "email service failed silently. Make sure that you have provided your MAILTRAP credentials in the .env file"
    );
    console.error("Error: ", err);
  }
}

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome!!",
      action: {
        instructions: "To verify your email, please click on the following button",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl
        },
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help"
    }, 
  };
}

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to resest the password of your account",
      action: {
        instructions: "To reset your password, click on the following button",
        button: {
          color: "#22BC66",
          text: "Reset password",
          link: passwordResetUrl
        },
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help"
    }, 
  };
}

export{
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent, sendEmail
};

// so these emailVerificationMailgenContent and forgotPasswordMailgenContent can be imported and generate email content based on this and will be passed on as options to sendEmail function