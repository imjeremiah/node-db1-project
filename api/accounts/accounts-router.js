const router = require('express').Router();

const Account = require('./accounts-model');

const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  Account.getAll()
    .then(accounts => res.json(accounts))
    .catch(next);
});

router.get('/:id', checkAccountId, (req, res) => {
  res.json(req.account);
})

router.post('/', checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  Account.create(req.body)
    .then(account => res.json(account))
    .catch(next)
})

router.put('/:id', checkAccountId, checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  Account.updateById(req.params.id, req.body)
    .then(account => res.json(account))
    .catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Account.deleteById(req.params.id)
    .then(() => res.json(req.account))
    .catch(next);
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({ 
    note: "something went wrong inside the accounts router",
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;
