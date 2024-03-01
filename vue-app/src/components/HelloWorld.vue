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
import { io } from 'socket.io-client'

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
    this.socket = io('http://localhost:8000');
        
    this.socket.on('connect', () => {
      this.connected = true
      console.log('WebSocket connection established');
    });
    
    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
    
    this.socket.on('message', (message) => {
      this.messages.push({ id: Date.now(), text: message });
    });
  },
  beforeUnmount() {
    // Close WebSocket connection before component is unmounted
    if (this.socket && this.socket.connected) {
      this.socket.close();
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() === '') return;
      this.socket.emit('message', this.newMessage);
      this.newMessage = '';
    }
  }
};
</script>
