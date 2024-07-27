const dotenv = require('dotenv');
const traineeModel = require('../models/user'); // Adjust the path as necessary

dotenv.config();

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Use environment variable
const authToken = process.env.TWILIO_AUTH_TOKEN; // Use environment variable

const client = require('twilio')(accountSid, authToken);

// Function to send a message
const sendMessage = (to, from, body) => {
  client.messages
    .create({
      to: to, // The destination phone number
      from: from, // The Twilio phone number you're sending from
      body: body, // The message text you want to send
    })
    .then((message) =>
      console.log(`Message sent successfully to ${to} with SID: ${message.sid}`)
    )
    .catch((error) =>
      console.error(`Failed to send message to ${to}: ${error.message}`)
    );
};

// Function to send reminders to trainees
const sendRemindersToTrainees = async () => {
  try {
    // Fetch trainees with sessions scheduled on the calculated date
    const traineesWithUpcomingSessions = await traineeModel.findAll();

    if (traineesWithUpcomingSessions.length === 0) {
      console.log('No trainees found.');
      return;
    }

    // Twilio phone number (ensure this is a valid Twilio number)
    const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Use environment variable
    
    let link = 'https://forms.gle/25pSobGZ4Tz6eGmb9';
    // Message body
    const messageBody =
      `REMINDER: Please fill the survey for the training session you attended. 
      ${link}`;

    // Send message to each trainee
    traineesWithUpcomingSessions.forEach((trainee) => {
      const toPhoneNumber = trainee.phone; // Ensure 'phone' is the correct field
      if (toPhoneNumber) {
        sendMessage(toPhoneNumber, fromPhoneNumber, messageBody);
      } else {
        console.log(`Trainee ${trainee.name} does not have a phone number.`);
      }
    });
  } catch (error) {
    console.error('Error fetching trainees:', error);
  }
};

// Call the function to send reminders
sendRemindersToTrainees();
