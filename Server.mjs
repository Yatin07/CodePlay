import express from "express";
import { Resend } from "resend";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path"; // Import the path module

// Simulating reading a template file (forgot-password_template.html) from the file system
// const emailTemplate = fs.readFileSync("EmailTemp.html", "utf-8");
const emailTemplate = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">

    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">


    <!--[if !mso]><!-->

    <link rel="preload" as="style"
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap">
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap">

    <style type="text/css">
        // TODO: fix me!
        @import url(https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap);
    </style>

    <!--<![endif]-->

    <!--[if mso]>
          <style>
              // TODO: fix me!
              * {
                  font-family: sans-serif !important;
              }
          </style>
        <![endif]-->


    <!-- NOTE: the title is processed in the backend during the campaign dispatch -->
    <title></title>

    <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->

    <style>
        :root {
            color-scheme: light;
            supported-color-schemes: light;
        }

        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;

            overflow-wrap: break-word;
            -ms-word-break: break-all;
            -ms-word-break: break-word;
            word-break: break-all;
            word-break: break-word;
        }






        center,
        #body_table {}

        ul,
        ol {
            padding: 0;
            margin-top: 0;
            margin-bottom: 0;
        }

        li {
            margin-bottom: 0;
        }



        .list-block-list-outside-left li {
            margin-left: 20px !important;
        }

        .list-block-list-outside-right li {
            margin-right: 20px !important;
        }


        .paragraph {
            font-size: 15px;
            font-family: Montserrat, sans-serif;
            font-weight: normal;
            font-style: normal;
            text-align: start;
            line-height: 1;
            text-decoration: none;
            color: #262626;

        }


        .heading1 {
            font-size: 30px;
            font-family: Montserrat, sans-serif;
            font-weight: normal;
            font-style: normal;
            text-align: start;
            line-height: 1.5;
            text-decoration: none;
            color: #333333;

        }


        .heading2 {
            font-size: 21px;
            font-family: Montserrat, sans-serif;
            font-weight: normal;
            font-style: normal;
            text-align: start;
            line-height: 1;
            text-decoration: none;
            color: #333333;

        }


        .heading3 {
            font-size: 19px;
            font-family: Montserrat, sans-serif;
            font-weight: normal;
            font-style: normal;
            text-align: start;
            line-height: 1;
            text-decoration: none;
            color: #333333;

        }


        .list {
            font-size: 15px;
            font-family: Montserrat, sans-serif;
            font-weight: normal;
            font-style: normal;
            text-align: start;
            line-height: 1;
            text-decoration: none;
            color: #5f5f5f;

        }


        p a,
        li a {

            color: #333333;
            text-decoration: underline;
            font-style: normal;
            font-weight: normal;

        }

        .button-table a {
            text-decoration: none;
            font-style: normal;
            font-weight: normal;
        }

        .paragraph>span {
            text-decoration: none;
        }

        .heading1>span {
            text-decoration: none;
        }

        .heading2>span {
            text-decoration: none;
        }

        .heading3>span {
            text-decoration: none;
        }

        .list>span {
            text-decoration: none;
        }


        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }

        #MessageViewBody,
        #MessageWebViewDiv {
            width: 100% !important;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        table:not(.button-table) {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }

        th {
            font-weight: normal;
        }

        tr td p {
            margin: 0;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        a[x-apple-data-detectors],

        .unstyle-auto-detected-links a,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        .im {
            color: inherit !important;
        }

        .a6S {
            display: none !important;
            opacity: 0.01 !important;
        }

        img.g-img+div {
            display: none !important;
        }

        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            u~div .contentMainTable {
                min-width: 320px !important;
            }
        }

        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            u~div .contentMainTable {
                min-width: 375px !important;
            }
        }

        @media only screen and (min-device-width: 414px) {
            u~div .contentMainTable {
                min-width: 414px !important;
            }
        }
    </style>

    <style>
        @media only screen and (max-device-width: 640px) {
            .contentMainTable {
                width: 100% !important;
                margin: auto !important;
            }

            .single-column {
                width: 100% !important;
                margin: auto !important;
            }

            .multi-column {
                width: 100% !important;
                margin: auto !important;
            }

            .imageBlockWrapper {
                width: 100% !important;
                margin: auto !important;
            }
        }

        @media only screen and (max-width: 640px) {
            .contentMainTable {
                width: 100% !important;
                margin: auto !important;
            }

            .single-column {
                width: 100% !important;
                margin: auto !important;
            }

            .multi-column {
                width: 100% !important;
                margin: auto !important;
            }

            .imageBlockWrapper {
                width: 100% !important;
                margin: auto !important;
            }
        }
    </style>


    <!--[if mso | IE]>
    <style>
        .list-block-outlook-outside-left {
            margin-left: -18px;
        }
    
        .list-block-outlook-outside-right {
            margin-right: -18px;
        }

        a:link, span.MsoHyperlink {
            mso-style-priority:99;
            
    color: #333333;
    text-decoration: underline;
    font-style: normal;
    font-weight: normal;

        }
    </style>
<![endif]-->


</head>

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #F6F5F1;">
    <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #F6F5F1;">
        <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" id="body_table" width="100%" style="background-color: #F6F5F1;">
            <tbody>    
                <tr>
                    <td>
                    <![endif]-->
        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="640"
            style="margin: auto;" class="contentMainTable">
            <tr class="wp-block-editor-spacerblock-v1">
                <td style="background-color:#F6F5F1;line-height:33px;font-size:33px;width:100%;min-width:100%">&nbsp;
                </td>
            </tr>
            <tr class="wp-block-editor-imageblock-v1">
                <td style="background-color:#F6F5F1;padding-top:32px;padding-bottom:32px;padding-left:32px;padding-right:32px"
                    align="center">
                    <table align="center" width="100%" class="imageBlockWrapper"
                        style="width:100%;border-spacing:0;border-collapse:collapse" role="presentation">
                        <tbody>
                            <tr align="center">
                                <td style="padding:0"><img
                                        src="https://api.smtprelay.co/userfile/5c6d5b74-08f1-4dc4-9ffe-8d259c7b2c4f/n_default-logo2023-09-21T15_01_01_(1).png"
                                        width="230.4" height="" alt=""
                                        style="border-radius:0px;display:block;height:auto;width:40%;max-width:100%;border:0"
                                        class="g-img"></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr class="wp-block-editor-headingblock-v1">
                <td valign="top"
                    style="background-color:#f6f5f1;display:block;padding-top:30px;padding-right:32px;padding-bottom:25px;padding-left:32px;text-align:center">
                    <p style="font-family:Montserrat, sans-serif;text-align:center;line-height:39.00px;letter-spacing:1px;font-size:30px;background-color:#f6f5f1;color:#333333;margin:0;word-break:normal"
                        class="heading1">Welcome to Health Sphere! 🌟</p>
                </td>
            </tr>
            <tr class="wp-block-editor-paragraphblock-v1">
                <td valign="top" style="padding:25px 50px 0px 50px;background-color:#f6f5f1">
                    <p class="paragraph"
                        style="font-family:Montserrat, sans-serif;text-align:center;line-height:30.00px;font-size:15px;margin:0;color:#262626;word-break:normal">
                        Hey {recipient},<br><br>Welcome to <span style="font-weight: bold" class="bold">Health
                            Sphere!</span> <span style="font-weight: bold" class="bold">🎉</span> We’re so excited to
                        have you as part of our community. By joining, you’re now in the loop for all the latest health
                        tips, exclusive content, and behind-the-scenes looks at our wellness journey.<br><br><br>Thank
                        you for being here, and I can’t wait to share more with you!<br></p>
                </td>
            </tr>
            <tr class="wp-block-editor-socialiconsblock-v1" role="article" aria-roledescription="social-icons"
                style="display:table-row;background-color:#F6F5F1">
                <td style="width:100%">
                    <table
                        style="background-color:#F6F5F1;width:100%;padding-top:15px;padding-bottom:15px;padding-left:32px;padding-right:32px;border-collapse:separate !important"
                        cellpadding="0" cellspacing="0" role="presentation">
                        <tbody>
                            <tr>
                                <td align="center" valign="top">
                                    <div style="max-width:576px">
                                        <table role="presentation" style="width:100%" cellpadding="0" cellspacing="0"
                                            width="100%">
                                            <tbody>
                                                <tr>
                                                    <td valign="top">
                                                        <div
                                                            style="margin-left:auto;margin-right:auto;margin-top:-2.5px;margin-bottom:-2.5px;width:100%;max-width:132px">
                                                            <table role="presentation" style="padding-left:222"
                                                                width="100%" cellpadding="0" cellspacing="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <table role="presentation" align="left"
                                                                                style="float:left"
                                                                                class="single-social-icon"
                                                                                cellpadding="0" cellspacing="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td valign="top"
                                                                                            style="padding-top:2.5px;padding-bottom:2.5px;padding-left:5px;padding-right:5px;border-collapse:collapse !important;border-spacing:0;font-size:0">
                                                                                            <a class="social-icon--link"
                                                                                                href="https://instagram.com"
                                                                                                target="_blank"
                                                                                                rel="noreferrer"><img
                                                                                                    src="https://d2u6lzrmbvw8bs.cloudfront.net/assets/social-icons/instagram/instagram-round-solid-dark.png"
                                                                                                    width="23"
                                                                                                    height="23"
                                                                                                    style="max-width:23px;display:block;border:0"
                                                                                                    alt="Instagram"></a>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <table role="presentation" align="left"
                                                                                style="float:left"
                                                                                class="single-social-icon"
                                                                                cellpadding="0" cellspacing="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td valign="top"
                                                                                            style="padding-top:2.5px;padding-bottom:2.5px;padding-left:5px;padding-right:5px;border-collapse:collapse !important;border-spacing:0;font-size:0">
                                                                                            <a class="social-icon--link"
                                                                                                href="https://pinterest.com"
                                                                                                target="_blank"
                                                                                                rel="noreferrer"><img
                                                                                                    src="https://d2u6lzrmbvw8bs.cloudfront.net/assets/social-icons/pinterest/pinterest-round-solid-dark.png"
                                                                                                    width="23"
                                                                                                    height="23"
                                                                                                    style="max-width:23px;display:block;border:0"
                                                                                                    alt="Pinterest"></a>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <table role="presentation" align="left"
                                                                                style="float:left"
                                                                                class="single-social-icon"
                                                                                cellpadding="0" cellspacing="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td valign="top"
                                                                                            style="padding-top:2.5px;padding-bottom:2.5px;padding-left:5px;padding-right:5px;border-collapse:collapse !important;border-spacing:0;font-size:0">
                                                                                            <a class="social-icon--link"
                                                                                                href="https://youtube.com"
                                                                                                target="_blank"
                                                                                                rel="noreferrer"><img
                                                                                                    src="https://d2u6lzrmbvw8bs.cloudfront.net/assets/social-icons/youtube/youtube-round-solid-dark.png"
                                                                                                    width="23"
                                                                                                    height="23"
                                                                                                    style="max-width:23px;display:block;border:0"
                                                                                                    alt="Youtube"></a>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <table role="presentation" align="left"
                                                                                style="float:left"
                                                                                class="single-social-icon"
                                                                                cellpadding="0" cellspacing="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td valign="top"
                                                                                            style="padding-top:2.5px;padding-bottom:2.5px;padding-left:5px;padding-right:5px;border-collapse:collapse !important;border-spacing:0;font-size:0">
                                                                                            <a class="social-icon--link"
                                                                                                href="https://tiktok.com"
                                                                                                target="_blank"
                                                                                                rel="noreferrer"><img
                                                                                                    src="https://d2u6lzrmbvw8bs.cloudfront.net/assets/social-icons/tiktok/tiktok-round-solid-dark.png"
                                                                                                    width="23"
                                                                                                    height="23"
                                                                                                    style="max-width:23px;display:block;border:0"
                                                                                                    alt="Tiktok"></a>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </table>
        <!--[if mso | IE]>
                    </td>
                </tr>
            </tbody>
            </table>
            <![endif]-->
    </center>
</body>

</html>`;
// Get the absolute path to EmailTemp.html

// Initialize express and resend client
const app = express();
const resend = new Resend("re_Nye3Zph2_9983RDXa6TBQf3DKpZoJJWMX");

// Enable CORS to allow requests from different origins
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());

// POST route to handle email sending
app.post("/send-email", async (req, res) => {
  const { username, email } = req.body;

  // Validate that username and email are present
  if (!username || !email) {
    return res.status(400).json({ error: "Username and email are required" });
  }
  const personalizedTemplate = emailTemplate.replace("{recipient}", username);
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "thebunny2225@gmail.com",
      subject: `Welcome, ${username}!`,
      html: personalizedTemplate
    });

    // Check for errors while sending the email
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Return a successful response
    res.status(200).json({ message: "Email sent successfully", data });
  } catch (error) {
    // Handle unexpected errors
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email" });
  }
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
