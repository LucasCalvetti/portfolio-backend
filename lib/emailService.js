const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(email, name, description) {
  const msg = {
    to: "l.calvetti.dev@gmail.com",
    from: "lucas.calvetti.testing@gmail.com",
    subject: `Email de tu portfolio!`,
    text: `Tenes un mail desde tu portfolio. ${name} escribió lo siguiente: " ${description} ". Podés ponerte en contacto con ${name} a través del siguiente email: ${email} `,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #ff6f61;">Tenes un mail desde tu portfolio</h1>
        <h2>${name} escribió lo siguiente:</h2>
        <p>
          "${description}"
        </p>
        <p>Puedes ponerte en contacto con ${name} a través del siguiente email:</p>
        <p style="font-size: 18px; font-weight: bold;">${email}</p>
      </div>
    `,
  };

  try {
    const sentEmail = await sgMail.send(msg);
    const sendgridEmail = `Email sent to: l.calvetti.dev@gmail.com`;
    return { sendgridEmail, sentEmail };
  } catch (e) {
    console.log(e);
    return { e };
  }
}

module.exports = { sendEmail };
