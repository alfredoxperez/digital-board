# digital-board
'digital-board' is a simple web app to share text to anyone connected to the app.  It is meant to be placed behind a home router as a local network digital board where anyone connected to the network can write on the board and read its contents.  If a note is completed or no longer needed a user can double click on it and the text will become crossed out.

---
# Digital Board UI:
```
http://localhost:3000/
```
![](doc/console.jpeg?raw=true)

---
# Lastest Environment Versions Used:
- npm: 5.6.0
- node: v9.4.0

---
# Setup 
see package.json for all.

Install:
```
  npm install
  npm install -g --save flow
```

Run tests:
```
  npm test
```

Run in dev mode:
```
  npm run dev
```
  
Run in production mode:
```
  npm start
```

Run "forever"
```
./node_modules/.bin/forever start -c "npm start" ./
```

Stop "forever"

Currently "forever" has a bug where the stop action does not work.  In order to truly stop the application you'll have to kill all node processes.
```
ps -ef | grep node
sudo kill -9 <NODE_PIDs> 
```

---
# Logging
Logging output can be directed to either log files in ```./logs```, or the console, or both. Running in dev mode will log to both. Running in production mode will log to files only.  This can be configured at:
```
./config/development.json.logging
./config/production.json.logging
```

There is also a CLI for pretty-printing these log files:
https://www.npmjs.com/package/bunyan#cli-usage

Note records may get lost when processing large files through the CLI.

Example Usage:
```
tail -f ./logs/digital-board.log | ./node_modules/.bin/bunyan
```


---
# API Manual Examples
GET data (all board entries)
```
http://localhost:3000/digital-board/api/1.0/text
```


POST data (board entry):
```
curl -v -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"inputText":"myText}' 'http://localhost:3000/digital-board/api/1.0/text'
```


