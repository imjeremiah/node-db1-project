const Account = require('./accounts-model');
const yup = require('yup');

const accountSchema = yup.object({
  name: yup.string().trim()
    .min(3, "name of account must be between 3 and 100")
    .max(100, "name of account must be between 3 and 100")
    .required("name and budget are required"),
  budget: yup.number("budget of account must be a number")
    .positive("budget of account is too large or too small")
    .max(1000000, "budget of account is too large or too small")
    .required("name and budget are required"),

})

const checkAccountPayload = async (req, res, next) => {
  try {
    const validatedAccount = await accountSchema.validate(req.body, {
      stripUnknown: true,
    });
    req.body = validatedAccount;
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const checkAccountNameUnique = (req, res, next) => {
  req.body.name.trim() ? res.status(400).json({ message: "that name is taken" }) : next();
}

const checkAccountId = (req, res, next) => {
  Account.getById(req.params.id)
    .then(possibleAccount => {
      possibleAccount ? (req.account = possibleAccount, next()) : res.status(404).json({ message: "account not found" });
    })
    .catch(next);
}

module.exports = { checkAccountPayload, checkAccountNameUnique, checkAccountId };