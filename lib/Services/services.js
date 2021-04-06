const Email = require('../Models/emailModel.js');
const { sendEmail } = require('../utils/SES.js');

module.exports = class EmailService {
  static async create({ message }) {
    await sendEmail('anthonymrosario225@gmail.com', 
    `Suh dude ${message}`);

    const email = await Email.insert({ message });

    return email;
  }

  static async getAllEmails() {
    const email = await Email.getAll();

    return email;
  }

  static async getEmailById(id) {
    const email = await Email.getEmailById(id);

    return email;
  }

  static async updateEmail({ id, message }) {
    const email = await Email.updateEmail({ id, message });

    await sendEmailTo('anthonymrosario225@gmail.com',
    `You said ${message}`);

    return email;
  }

  static async deleteEmail(id) {
    const email = await Email.deleteEmail(id);

    return email;
  }
};