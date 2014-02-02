var dtable = require('data-table')
var bcsv = require('binary-csv')
var concat = require('concat-stream')

module.exports = function(cb) {
  var csv = bcsv({json: true})
  csv.on('error', cb)
  csv.pipe(concat(function(data) {
    var table = dtable(data).render()
    var css = dtable.css
    var doc = "<!DOCTYPE html><html><head><style type='text/css'>" + css + "</style></head>"
    doc += "<body>" + table + "</body></html>"
    cb(null, doc)
  }))
  return csv
}