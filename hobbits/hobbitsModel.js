const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(hobbit) {
  return db('hobbits')
  .insert(hobbit, 'id')
  .then( ([id]) => {
      return findById(id)
  })
}

async function update(id, changes) {
  return db('hobbits')
  .where({id})
  .update(changes)
  .then(() => {
    return findById(id)
  })
}

function remove(id) {
  return findById(id)
  .then(deletedHobbit => {
      return db('hobbits')
      .where({id})
      .del()
      .then( () => {
          return deletedHobbit
      })
  })
}

function getAll() {
  return db('hobbits');
}

function findById(id) {
  return db('hobbits').where({id}).first()
}
