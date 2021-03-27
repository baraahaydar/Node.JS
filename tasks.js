
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

 var tasks = ['HTML', 'JS', 'REACT', 'CSS'];
 function startApp(name){
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
function onDataReceived(text) {
  text= text.replace('\n','').trim();
  var arrText = text.split(' ');
  console.log(arrText);
  if (arrText[0] === 'quit' || arrText[0] === 'exit') {
    quit();
  }
  
  else if (arrText[0] === 'help'){
    help(); 
}
else if (arrText[0] === 'list'){
  list();
}
 else if(arrText[0] === 'hello'){
  hello(arrText[1]);
}
else if (arrText[0] === 'add'){
  add(arrText);
}

else if (arrText[0] === 'remove'){
  remove(arrText);
}
  else{
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
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
 function hello(text){
  if (!text) {
    console.log('hello!')}
    else{
      console.log("hello" + " " +text+'!')
    }
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}
/**
 * help command that lists all possible commands
 */
function help(){
  console.log('below are the possible commands: \n', '\n', 'quit/exit: Quits the application\n', 'hello:If no arguments were passed it outputs hello!, otherwise it will output hello (arguments passed)!\n', 'help:Shows available commands\n')
}
/**
 * list command 
 */
 function list() {
  if (tasks.length > 0) {
    tasks.forEach((task, index) => {
      console.log(`Task ${index + 1}: ${task}`);
    })
  }
  
  else {
    console.log('Tasks list is empty!');
  }
}
function add(arrText) {
  if (arrText[1] != undefined) {
     let newTask = "";
    arrText.forEach(text => {
      if (text == "") return
      newTask += `${text} `;
    })
    newTask = newTask.trim();
    tasks.push(newTask);
    console.log(`Task '${newTask}' was added`);
   
  }
  else {
    console.log("Error: no tasks were given");
  }
}
function remove(arrText){
  if (arrText[1] === undefined){
    tasks.pop();
  } else if (arrText[1]-1 >tasks.length){
    console.log(" This task number does not exist!")
  }
  else {
    tasks.splice(arrText[1]-1, 1)
  }
}


// The following line starts the application
startApp("Baraa Haydar")
