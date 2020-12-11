const express = require("express");  // v4.17.x as of Apr 2020
const app = express();
var https = require("https");
var request = require("request")
var convert = require('xml-js');
const cors = require('cors');

const port = 5000;

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {

  if (!req.query.q) {
    res.status(400).send({ "response": 'Bad Request' })
    return
  }

  callBookApi(req.query.q).then(response => {

    console.log("function get called : ", response)
    res.status(200).send({ "results": response })
  })


});


function callBookApi(query) {

  return new Promise((resolve, reject) => {
    var options = {
      url: `https://www.goodreads.com/search.xml?key=RDfV4oPehM6jNhxfNQzzQ&q=${query}`,
      method: 'GET'
    }

    request(options, (error, response, data) => {
      if (error) {
        console.log("Errror calling API ", error)
        return reject(error)
      }
      else {
        //console.log("You get an answer",data)
        let convertedOutput = convert.xml2json(response.body, { compact: true, spaces: 4 });

        let jsonoutput = JSON.parse(convertedOutput)

        let topFiveBooks = []
        topFiveBooks = jsonoutput.GoodreadsResponse.search.results.work
        let sliceResponse = topFiveBooks.slice(0, 5)

        console.log("top 5 books from search result is : ", JSON.stringify(sliceResponse))

        let top5Result = []
        for (let i = 0; i < sliceResponse.length; i++) {
          top5Result.push({
            "bookTitle": sliceResponse[i].best_book.title._text,
            "bookImage": sliceResponse[i].best_book.image_url._text,
            "bookAuthor": sliceResponse[i].best_book.author.name._text,
          })
        }

        console.log("Final Object for response  ???", top5Result)

        return resolve(top5Result)

      }
    })
  })
}

console.log(`Listening Server on port Number ${port}`)

app.listen(port);