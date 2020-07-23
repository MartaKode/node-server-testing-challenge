const express = require("express");

const Hobbits = require("../hobbits/hobbitsModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

//``````````````````````````````````````````
server.use('/hobbits/:id', validateHobbitID)
//````````GET```````````````
server.get("/hobbits", (req, res) => {
  Hobbits.getAll()
    .then(hobbits => {
      res.status(200).json(hobbits);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/hobbits/:id", (req, res) => {
  Hobbits.findById(req.params.id)
    .then(hobbit => {
      res.status(200).json(hobbit);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//`````````POST````````````
server.post('/hobbits', (req, res) => {
  Hobbits.insert(req.body)
  .then( newHobbit => {
    res.status(201).json(newHobbit)
  })
  .catch(error => {
    res.status(500).json(error);
  });
})

//`````````DELETE`````````````
server.delete('/hobbits/:id', (req, res) => {
  Hobbits.remove(req.params.id)
  .then( deletedHobbit => {
    // console.log(deletedHobbit)
    // if(!Object.keys(deletedHobbit).length){
      // res.status(404).json({message: 'id doesnt exist'})
    // } else {
      res.json(deletedHobbit)
    // }
  
  })
  .catch(error => {
    res.status(500).json(error);
  })
})

//```````````PUT`````````````
server.put('/hobbits/:id', (req, res) => {
  Hobbits.update(req.params.id, req.body)
  .then( updatedHobbit => {
    console.log(updatedHobbit)
    res.json(updatedHobbit)
  })
  .catch(error => {
    res.status(500).json(error);
  })
})

//`````````custom middleware``````

function validateHobbitID(req, res, next) {
  Hobbits.findById(req.params.id)
  .then(hobbit => {
    // console.log('validatehobbitId:', hobbit)
    if (!hobbit) {
        res.status(404).json({ message: 'invalid hobbit id' })
    } else {
        req.hobbit = hobbit
        next()
    }
})
.catch(err => {
    console.log(err)
    res.status(500).json({ error: 'error validating  id' })
})
}

module.exports = server;
