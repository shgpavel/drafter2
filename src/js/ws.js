const socket = new WebSocket('ws://localhost:7681');

socket.onopen = function() {
    console.log('WebSocket connection established');
    socket.send('Connected');
};

socket.onmessage = function(event) {
    console.log('Received message from C server:', event.data);
    socket.send('Received');
};

socket.onclose = function() {
    console.log('WebSocket connection closed');
};
