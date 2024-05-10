"use server";
import * as sgMail from "@sendgrid/mail";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string({ invalid_type_error: "Invalid email" }),
});

export async function mailingListSignup(sendObject) {
  "use server";
const email = sendObject.email;

  const validatedFields = emailSchema.safeParse({
    email: email
  });

  // Return early if the email address is invalid
  if (!validatedFields.success) {
    return {
      joined: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid email",
    };
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "hello@striverevolution.com",
    cc: "tamara.buckland@gmail.com ",
    from: "hello@striverevolution.com",
    subject: "Someone Joined the Compost Waitlist ✔",
    text: `Hello. Hope you're having a good day. The email address ${validatedFields.data.email} would like to join the mailing list. Please send them a confirmation email.`,
    html: `<h2><b>Hello.</b></h2><p>Hope you're having a good day.</p><p>The email address ${validatedFields.data.email} would like to join the mailing list</p><p>Please send them a confirmation email.</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log(`Mailing List email sent to ${msg.to}`);
    return {
      joined: true,
    };
  } catch (error) {
    return {
      joined: false,
      message: "Error joining the mailing list",
    };
  }
}
