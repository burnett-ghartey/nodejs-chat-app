const socket = io()

const message = document.getElementById("message"),
      handle  = document.getElementById("handle"),
      output  = document.getElementById("output"),
      typing  = document.getElementById("typing"),
      button  = document.getElementById("button")

      // send message click event
     button.addEventListener("click", (e) => {
        e.preventDefault()
        socket.emit('userMessage', {
            handle: handle.value,
            message: message.value
        })
        message.value = ""
     }) 

     message.addEventListener('keypress', () => {
        socket.emit('userTyping', handle.value)
     })


     // displaying message from server
     socket.on('userMessage', (data) => {
        typing.innerHTML = ""
        output.innerHTML += "<p> <strong>"+ data.handle + "</strong>:" + data.message + "</p>"
     })

     socket.on('userTyping', (data) => {
        typing.innerHTML = "<P><em>" + data + " is typing...</em></P>"
     })


