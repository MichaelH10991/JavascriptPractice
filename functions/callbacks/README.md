# What is a callback?

**Simply Put:** A callback is a function to be executed **after** another function has finished executing - hence the name _'call back'_

**More Complexly Put:** In Javascript, functions are objects. Because of this, functions can take functions as arguments, and can be returned by other functions. Functions that do this are called **higher-order functions.** Any function that is passed as an argument is called a **callback function**

# Why Do we need Callbacks?!?

For one very important reason - Javascript is an event driven language. This means that instead of waiting for a response before moving on, JavaScript will keep executing while listening for other events. Lets look at a basic example.

```javascript
function first() {
  console.log(1)
}

function second() {
  console.log(2)
}

first()
second()
```

As you would expect, the function `first()` is executed first, and the function `second()` is executed second - logging the following in the console

```javascript
// 1
// 2
```

All good so far

But what if function `first()` contains some sort of code that cant be executed immediately? for exampkle, an API request where we have to send the request thern wait for a response? To simulate this action, were going to use `setTimeout` which is a JavaScript function that calls a function after a set amount of time. We'll delay our function for 500 milliseconds to simulate an API request. Our new code will look like this.

```javascript
function first() {
  // simulate a code delay
  setTimeout(() => {
    console.log(1)
  }, 500)
}

function second() {
  console.log(2)
}
first()
second()
```

Its not important that you understand how `setTimeout()` works right now. All that matters is that you see we've moved out `console.log(1);` inside of our 500 millisecond delay. so what happens now when we invoke our functions?

```javascript
first()
second()

// 2
// 1
```

Even though we invoked the `first()` function first, we logged out the result of that function after the `second()` function.

Its not that JavaScript didn't execute our functions in the order we wanted it to, it's instead that **JavaScript didn't wait for a response from `first()` before moving on to execute `second()`.**

So why show you this? Because you can't call one function after another and hope they execute in the right order. Callbacks are a way to make sure certain code doesn't execute until other code has already finished execution.

# Create a Callback!!

Alright, enough talk, lets create a callback!!

Write this...

```javascript
function doHomework(subject) {
  alert(`Starting my ${subject} homework.`)
}
```

Above, we’ve created the function `doHomework` . Our function takes one variable, the subject that we are working on. Call your function by typing the following into your console:

```
doHomework('math');
// Alerts: Starting my math homework.
```

Now lets add in our callback — as our last parameter in the `doHomework()` function we can pass in `callback`. The callback function is then defined in the second argument of our call to `doHomework()`.

```javascript
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`)
  callback()
}

doHomework("math", function() {
  alert("Finished my homework")
})
```

As you’ll see, if you type the above code into your console you will get two alerts back to back: Your ‘starting homework’ alert, followed by your ‘finished homework’ alert.

But callback functions don’t always have to be defined in our function call. They can be defined elsewhere in our code like this:

```javascript
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`)
  callback()
}
function alertFinished() {
  alert("Finished my homework")
}
doHomework("math", alertFinished)
```

The result of this example is exactly the same as the previous example, but the setup is a little different. as you can see, we've passed the `alertFinished` function definition as an argument during our `doHomework()` function call!

# A real world example

Twitters API is a good example of a callback. When you make a request you have to wait for a response before you can act on the response. It's a wonderful example of a real world callback. Here's what it looks like.

```javascript
T.get("search/tweets", params, function(err, data, response) {
  if (!err) {
    // This is where the magic will happen
  } else {
    console.log(err)
  }
})
```

- T.get simply means we are making a get request to Twitter
- There are three parameters in this request: ‘search/tweets’, which is the route of our request, params which are our search parameters, and then an anonymous function which is our callback.

A callback is important here because we need to wait for a response from the server before we can move forward in our code. We don’t know if our API request is going to be successful or not so after sending our parameters to search/tweets via a get request, we wait. Once Twitter responds, our callback function is invoked. Twitter will either send an `err` (error) object or a `response` object back to us. In our callback function we can use an `if()` statement to determine if our request was successful or not, and then act upon the new data accordingly.

# We Made It

[a doc on callbacks](https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced)
