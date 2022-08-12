const router = require('express').Router();
let Feature = require('../models/feature.model');
  
//endpoint which handles the http get requests on /tasks URL path
router.route('/').get((req, res) => {
    Feature.find()
    .then(features => res.json(features))
    .catch(err => res.status(400).json('Error: ' + err));
});

//endpoint which handles the http post requests
router.route('/add').post((req, res) => {
  const featurename = req.body.featurename;
  const description = req.body.description;
  const status = req.body.status;
  const devname = req.body.devname;

  const newFeature = new Feature({
    featurename,
    description,
    status,
    devname
    });

  newFeature.save()
    .then(() => res.json('Task added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//
router.route('/:id').get((req, res) => {
    Feature.findById(req.params.id)
      .then(features => res.json(features))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Feature.findByIdAndDelete(req.params.id)
      .then(() => res.json('Task deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    Feature.findById(req.params.id)
      .then(feature => {
        feature.featurename = req.body.featurename;
        feature.description = req.body.description;
        feature.status = req.body.status;
        feature.devname = req.body.devname;
  
        feature.save()
          .then(() => res.json('Task updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;