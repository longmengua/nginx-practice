<template>
  <div>
    <h1>WebSocket Example</h1>
    <p v-if="connected">Connected to WebSocket server!</p>
    <p v-else>Not connected to WebSocket server.</p>
    <div id="app">
      <div id="messages">
        <div v-for="message in messages" :key="message.id">{{ message.text }}</div>
      </div>
      <input type="text" v-model="newMessage" placeholder="Type your message...">
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      connected: false,
      socket: null,
      messages: [],
      newMessage: '',
    };
  },
  mounted() {
    // Establish WebSocket connection
    this.socket = new WebSocket('ws://localhost:8000');

    // Event listener for when the WebSocket connection is established
    this.socket.addEventListener('open', () => {
      this.connected = true;
      console.log('WebSocket connection established');
    });

    // Event listener for incoming messages
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      this.messages.push({ id: Date.now(), text: message });
    });

    // Event listener for WebSocket errors
    this.socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
    });
  },
  beforeUnmount() {
    // Close WebSocket connection before component is unmounted
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() === '') return;
      this.socket.send(JSON.stringify({ message: this.newMessage }));
      this.newMessage = '';
    }
  }
};
</script>
