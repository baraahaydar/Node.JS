/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
 var elements = ['quit', 'exit', 'hello', 'help', 'list', 'add', 'remove', 'check', 'uncheck'];
 var fs = require('fs');
 var data = fs.readFileSync('database.json', 'utf-8');
 try {
   if (data == "") throw "Empty"
 }
 catch { data = '[{ "name": "coffe", "done": true }] ' }
 var Elts = JSON.parse(data);
 
 const process = require('process');
 var proce = process.argv;
 
 //I did it from the start add & remove 
 // sorry
 function startApp(name) {
   process.stdin.resume();
   process.stdin.setEncoding('utf8');
   process.stdin.on('data', onDataReceived);
   console.log(`Welcome to ${name}'s application!`)
   console.log("--------------------")
 }
 
 
 /**
  * Decides what to do depending on the data that was received
  * This function receives the input sent by the user.
  * 
  * For example, if the user entered 
  * ```
  * node tasks.js batata
  * ```
  * 
  * The text received would be "batata"
  * This function  then directs to other functions
  * 
  * @param  {string} text data typed by the user
  * @returns {void}
  */
 console.log('write hello & your name :');
 function onDataReceived(text) {
   if (text.trim() === 'quit' || text.trim() === 'exit') {
     quit(proce);
   }
   else if (text.trim() == 'list') {
     list(Elts);
   }
   else if (text.trim().split(" ", 1) == 'add') {
     add(Elts, text);
   }
   else if (text.trim().split(" ", 1) == 'remove') {
     remove(Elts, text);
   }
   else if (text.trim().split(" ", 1) == 'edit') {
     edit(Elts, text);
   }
   else if (text.trim().split(" ", 1) == 'hello') {
     var UserName = text.trim().split(" ").pop();
     hello(UserName);
   }
   else if (text.trim() === 'help' || text.trim().split(" ", 1) == 'help') {
     help(elements);
   }
   else if (text.trim().split(" ", 1) == 'check') {
     check(Elts, text);
   }
   else if (text.trim().split(" ", 1) == 'uncheck') {
     uncheck(Elts, text);
   }
   else {
     unknownCommand(text);
   }
 }
 
 
 /**
  * prints "unknown command"
  * This function is supposed to run when all other commands have failed
  *
  * @param  {string} c the text received
  * @returns {void}
  */
 function unknownCommand(c) {
   console.log('unknown command: "' + c.trim() + '"')
 }
 
 
 /**
  * Says hello
  *
  * @returns {void}
  */
 function hello(UserName) {
   if (UserName === "hello") {
     console.log('hello!');
   }
   else {
     console.log('hello ' + UserName + '!')
   }
 }
 
 
 /**
  * * lists all the possible commands
  * 
  * @returns {void}
  */
 function list(Elts) {
   console.log('List of commands :')
   for (var i = 0; i < Elts.length; i++) {
     if (Elts[i].done) {
       console.log("[✓] " + Elts[i].name)
     }
     else {
       console.log("[ ] " + Elts[i].name)
     }
   }
 }
 
 
 /**
  * * add
  * 
  * @returns {void}
  */
 function add(Elts, text) {
   var task = text.trim().split(" ").pop();
   if (text.trim().split(" ").length == 1) {
     console.log('"error" no tasks to add!')
   } else {
     Elts = Elts.push({ name: task, done: false });
     console.log(task + ' has been added to list successfully.')
   }
 }
 
 
 /**
  * * edit
  * 
  * @returns {void}
  */
 function edit(Elts, text) {
   var tasks = text.trim().split(" ");
   if (tasks.length == 1) {
     console.log('"error" no task to edit!')
   } else if (tasks.length == 2) {
     Elts[Elts.length - 1].name = tasks[1];
     console.log('the task ' + Elts.length + ' change to ' + tasks[1])
   } else {
     Elts[tasks[1] - 1].name = tasks[2];
     console.log('the task ' + tasks[1] + ' change to ' + tasks[2])
   }
 }
 
 
 /**
  * check
  * 
  * @returns {void}
  */
 function check(Elts, text) {
   var tasks = text.trim().split(" ");
   if (tasks.length == 1) {
     console.log("Error");
   }
   else if (tasks[1] > Elts.length) {
     console.log("Error");
   }
   else {
     Elts[tasks[1] - 1].done = true;
     console.log('checked successfully')
   }
 }
 
 
 /**
  * uncheck
  * 
  * @returns {void}
  */
 function uncheck(Elts, text) {
   var tasks = text.trim().split(" ");
   if (tasks.length == 1) {
     console.log("Error");
   }
   else if (tasks[1] > Elts.length) {
     console.log("Error");
   }
   else {
     Elts[tasks[1] - 1].done = false;
     console.log('unchecked successfully')
   }
 }
 
 
 /**
  * * remove
  * 
  * @returns {void}
  */
 function remove(Elts, text) {
   var task = text.trim().split(" ").pop();
   if (text.trim().split(" ").length == 1) {
     Elts.pop();
     console.log('task ' + Elts.length + ' has been removed from list successfully.')
   } else if (task > Elts.length) {
     console.log('this task number is not exist! ')
   } else {
     Elts.splice(task - 1, 1);
     console.log('task ' + task + ' has been removed from list successfully.')
   }
 }
 
 
 /**
  * * Command to list all tasks
  * 
  * @returns {void}
  */
 function help(elements) {
   console.log('The possible commands : \n     ' + elements + '.')
 }
 
 
 /**
  * Exits the application
  *
  * @returns {void}
  */
 function quit(proce) {
   var fs = require('fs');
   var data = JSON.stringify(Elts);
   fs.writeFileSync('database.json', data);
   if (proce.length > 2) {
     fs.writeFile('./' + proce[2], data, (err) => {
       if (!err) {
         console.log('done');
       }
     });
     fs.writeFileSync(proce[2], data);
   }
   console.log('data saved successfully')
   console.log('Quitting now, goodbye!')
   process.exit();
 }
 
 // The following line starts the application
 startApp("Baraa haydar")