const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts').where('id', id).first();
}

const create = account => {
  const [id] = db('accounts').insert(account);
  return getById(id); 
}

const updateById = (id, account) => {
  return db('accounts').where('id', id).update(account)
    .then(() => {
      return getById(id)
    })
}

const deleteById = id => {
  const deletedAccount = getById(id);
  db('accounts').where('id', id).del();
  return deletedAccount;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
