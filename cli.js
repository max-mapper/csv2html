#!/usr/bin/env node

var fs = require('fs')

var csv2html = require('./')
var arg = process.argv[2]
var input

if (!process.stdin.isTTY || arg === '-') {
  input = process.stdin
} else {
  input = fs.createReadStream(arg)
}

input.pipe(csv2html(function(err, html) {
  if (err) return console.error(err)
  console.log(html)
}))
