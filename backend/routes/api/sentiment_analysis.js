var express = require('express');
var router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator/check');
const fs = require('fs');

const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const discovery = new DiscoveryV1({
  version: '2019-02-01'
});

// DISCOVERY_IAM_APIKEY=18Byo1mG23FQhlyqRMrRFMIVY4vxT1djV2wKMmxIaSkZ
// DISCOVERY_URL=https://gateway-fra.watsonplatform.net/discovery/api

//@route GET api/search_mask_sentiment_analysis
//@desc  GET the Query Search from api/search_mask_sentiment_analysis
//@acces Private
router.get('/search_mask_sentiment_analysis', function(req, res) {});

//@route GET api/Result_page_sentiment_analysis
//@desc  GET the Result_page_sentiment_analysis
//@acces Private
router.get('/', function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { search } = req.body;

  console.log('Your query is : ' + search);

  var jsonContents = fs.readFileSync(
    '/Users/selmanehabib/Documents/mern-todo-app/output.json'
  );
  var results = JSON.parse(jsonContents);
  console.log(results);
  res.send(results);
  // res.send({
  //   results: results
  // });
  // const params = {
  //   environment_id: 'system',
  //   collection_id: 'news-en',
  //   query: 'BMW',
  //   count: 50,
  //   return: 'title,url,host,crawl_date'
  // };
  // // // __________discovery.query starts________________________________________
  // discovery.query(params, (error, results) => {
  //   if (error) {
  //     console.error(error.message);
  //     res.status(500).send('Server Error: From fct discovery query');
  //   } else {
  //     var jsonContent = JSON.stringify(results, null, 2);
  //     // var jsonContents = JSON.parse(jsonContent);

  //     // console.log('jsonContents ' + jsonContents);
  //     console.log('jsonContent = ' + jsonContent);

  //     res.json({
  //       jsonContents: jsonContents
  //     });
  //     //res.status(200).json(results);
  //   }
  // });
});

module.exports = router;
