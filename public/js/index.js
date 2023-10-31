
const socket = io();
let username;

document.getElementById('form-message').addEventListener('submit', (event) => {
    event.preventDefault();

    const input = document.getElementById('input-message');
    const newMessage = {
        username,
        body: input.value,
    }

    socket.emit('new-message', newMessage);
    input.value = ''
    input.focus();
})

socket.on('update-conversation', (conversation) => {
    console.log('conversation', conversation);

    const messages = document.getElementById('messages');
    messages.innerText= ''
    conversation.forEach((msg) => {
        const p = document.createElement('p');
        p.innerText = `${msg.username}: ${msg.body}`;
        messages.appendChild(p);
    });
})

Swal.fire({
    title:  'Identificate por favor',
    input: 'text',
    allowOutsideClick: false,
    inputValidator: (value) => {
        if (!value) return 'Por favor, ingrese su username'
    }
})
.then((result) => {
    username = result.value.trim();
    console.log(username);
})
.catch((err) => {
    console.error("Ocurrio un error: " + err);
})