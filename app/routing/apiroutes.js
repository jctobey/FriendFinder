// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/survey", function(req, res) {
    res.json(friendData);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
  app.post("/api/survey", function(req, res) {
    let questionDiff=[];

    for( let i=0; i<friendData.length; i++){
      let questionDiffSum=0;
      for( let j=0; j<req.body.Scores; j++){
       questionDiffSum +=Math.abs(parseInt(req.body.Scores[j])-friendData[i].Scores[j])
      }
      questionDiff.push(questionDiffSum)
    }
      let lowestNumber=100000;
      let lowestIndex=0;
    for( let k=0; k<questionDiff.length; k++){
      if(questionDiff[k]<lowestNumber){
        lowestNumber=questionDiff[k];
        lowestIndex=k;
      }
    }
  console.log(req.body)
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
    friendData.push(req.body);
      res.json(friendData[lowestIndex]);
    
  });

}
