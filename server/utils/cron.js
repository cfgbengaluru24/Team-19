const dotenv = require("dotenv");
const trainerModel = require("../models/trainer"); // Adjust the path as necessary

dotenv.config();

// Twilio configuration
const accountSid = ''; // Your Account SID from Twilio
const authToken = ''; // Your Auth Token from Twilio

const client = require("twilio")(accountSid, authToken);

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

// Function to send reminders to trainers
const sendRemindersToTrainers = async () => {
  try {
    // Calculate the date 3 days from now
    const today = new Date();
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);

    // Format the date to 'YYYY-MM-DD' to match database format
    const formattedDate = threeDaysFromNow;
    console.log(formattedDate);
    // Fetch trainers with sessions scheduled on the calculated date
    const trainersWithUpcomingSessions = await trainerModel.find({
      scheduleDate: formattedDate, // Adjust the field name to match your database schema
    });

    if (trainersWithUpcomingSessions.length === 0) {
      console.log("No trainers with sessions scheduled 3 days from now.");
      return;
    }

    // Twilio phone number (ensure this is a valid Twilio number)
    const fromPhoneNumber = "+18126377194"; // Replace with your Twilio phone number

    // Message body
    const messageBody =
      "Reminder: Your training session is scheduled 3 days from now. Please be on time.";

    // Send message to each trainer
    trainersWithUpcomingSessions.forEach((trainer) => {
      const toPhoneNumber = trainer.phone; // Assume each trainer document has a 'phone' field
      if (toPhoneNumber) {
        sendMessage(toPhoneNumber, fromPhoneNumber, messageBody);
      } else {
        console.log(`Trainer ${trainer.name} does not have a phone number.`);
      }
    });
  } catch (error) {
    console.error("Error fetching trainers:", error);
  }
};

// Call the function to send reminders
sendRemindersToTrainers();
