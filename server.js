const express = require('express')
    , app = express()
    , months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', (err) => {
    if (err) throw err;
  });
});

app.get('/:input', (req, res) => {
  const { input } = req.params
      , json = parseDate(input);
  res.json(json);
});

var port = app.get('port') || 8000;

app.listen(port, () => {
  console.log('Listening on port ' + port);
});


function parseDate(str) {
  const millisec = isNaN(str) ? Date.parse(str) : +str * 1000
      , d = new Date(millisec)
      , offset = isNaN(str) ? d.getTimezoneOffset() * 60 : 0;

  if (d.toString() === 'Invalid Date') {
    return {unix: null, natural: null};
  }
  const unix = Math.round(d.getTime() / 1000) - offset
      , natural = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  return {unix, natural};
}
