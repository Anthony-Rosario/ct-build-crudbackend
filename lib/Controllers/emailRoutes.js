const { Router } = require('express');
const EmailService = require('../services/services.js');



module.exports = Router()
  .post('/', async (req, res, next) => {
    debugger;
    try {
      const emails = await EmailService.create(req.body);
      res.send(emails);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
        const emails = await EmailService.getAllEmails();
        res.send(emails);
    } catch (error) {
        next(error);
    }
})

.get('/:id', async (req, res, next) => {
  try {
      const emails = await EmailService.getEmailById(req.params.id);
      res.send(emails);
  } catch (error) {
      next(error);
  }
})

.put('/:id', async (req, res, next) => {
  try {
      const updatedEmail = await EmailService.updateEmail({ 
        id: req.params.id, 
        message: req.body.message 
      });

      res.send(updatedEmail)
  } catch (error) {
      next(error);
  }
})

.delete('/:id', async (req, res, next) => {
  try {
      const deletedEmail = await EmailService.deleteEmail(req.params.id);
      res.send(deletedEmail);
  } catch (error) {
      next(error)
  }
})
