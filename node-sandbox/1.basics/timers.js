/*
This script executes a function wich takes a certain ammount of time which executes a callback which does nothing for 10 ms
The delay is started streight after the first function is called so returns with a delay of how long the function took to
execute
*/

const fs = require("fs")

function someAsyncFunction(callback) {
  fs.readFile("resources/hello.txt", callback)
}

// the timer starts
const timeoutScheduled = Date.now()

// this is triggered when there are no more callbacks on the poll queue the timer phase starts
setTimeout(() => {
  const delay = Date.now() - timeoutScheduled
  console.log(`${delay}ms have passed since i was scheduled`)
}, 100)

// do someAsyncOperation which takes 95 ms to complete
someAsyncFunction(() => {
  const startCallback = Date.now()

  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
})

/*
When the event loop enters the poll phase, it has an empty queue (fs.readFile() has not completed), 
so it will wait for the number of ms remaining until the soonest timer's threshold is reached. 
While it is waiting 95 ms pass, fs.readFile() finishes reading the file and its callback which takes
10 ms to complete is added to the poll queue and executed. When the callback finishes, there are 
no more callbacks in the queue, so the event loop will see that the threshold of the soonest timer 
has been reached then wrap back to the timers phase to execute the timer's callback. In this example,
you will see that the total delay between the timer being scheduled and its callback being executed 
will be 105ms.
*/
