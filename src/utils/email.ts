import nodemailer, { TransportOptions } from "nodemailer";
import { google } from "googleapis";

import config from "../config";
import { bufferFile } from "./files";
import { IUser } from "./interfaces";
var sprintf = require("sprintf-js").sprintf;

// const emailTemplate = `Dear %(name)s,\n We received a request to reset your Media Analytics password. \n Click here to change your password ${config.reset_password_url}?token=%{token} \n Alternatively, you can enter the following passsword reset code: \n %(token)s \n Reset Password`

const getParams = (user: IUser) => {
  return {
    name: user.name,
    company: config.companyName,
    website: config.webSite,
    product_name: config.productName,
    action_url: `${config.resetPasswordUrl}?token=${user.reset_password_token}`,
  };
};

export const sendPasswordResetEmail = (user: IUser) => {
  const emailHtmlTemplate = bufferFile(
    `src/templates/emails/reset_password.html`
  );
  const emailTextTemplate = bufferFile(
    `src/templates/emails/reset_password.txt`
  );

  const params = getParams(user);
  const text = sprintf(emailTextTemplate, params);
  const html = sprintf(emailHtmlTemplate, params);
  return sendEmail(user.email, "Reset de votre mot de passe", text, html);
};

export const sendResetCountEmail = (user: IUser) => {
  const emailHtmlTemplate = bufferFile(`src/templates/emails/reset_count.html`);
  const emailTextTemplate = bufferFile(`src/templates/emails/reset_count.txt`);

  const params = getParams(user);
  const text = sprintf(emailTextTemplate, {
    ...params,
    action_url1: `${config.resetPasswordUrl}?token=${user.reset_password_token}&refClient=true`,
    action_url2: `${config.resetPasswordUrl}?token=${user.reset_password_token}&resetCount=true`,
  });
  const html = sprintf(emailHtmlTemplate, {
    ...params,
    action_url1: `${config.resetPasswordUrl}?token=${user.reset_password_token}&refClient=true`,
    action_url2: `${config.resetPasswordUrl}?token=${user.reset_password_token}&resetCount=true`,
  });
  return sendEmail(user.email, "Reactivation de votre compte", text, html);
};

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  // create reusable transporter object using the default SMTP transport

  // setup google oAuth2
  const oAuth2Client = new google.auth.OAuth2(
    config.CLIENT_ID,
    config.CLIENT_SECRET,
    config.REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: config.REFRESH_TOKEN });

  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
      type: "OAuth2",
      user: config.email.user,
      clientId: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      refreshToken: config.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  } as TransportOptions);

  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: config.email.user, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (err) {
    console.error("Message sent error: %s", err);
    return Promise.reject(new Error("EMAIL_SEND_ERROR"));
  }
};

export const sendAccountActivationEmail = (user: IUser) => {
  const emailHtmlTemplate = bufferFile(
    `src/templates/emails/activate_account.html`
  );
  const emailTextTemplate = bufferFile(
    `src/templates/emails/activate_account.txt`
  );

  const params = getParams(user);
  const text = sprintf(emailTextTemplate, params);
  const html = sprintf(emailHtmlTemplate, params);
  return sendEmail(user.email, "Activation de votre compte", text, html);
};
