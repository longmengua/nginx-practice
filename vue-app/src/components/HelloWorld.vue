<template>
  <div>
    <h1>WebSocket Example</h1>
    <p v-if="connected">Connected to WebSocket server!</p>
    <p v-else>Not connected to WebSocket server.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      connected: false,
      socket: null
    };
  },
  mounted() {
    // Establish WebSocket connection
    this.socket = new WebSocket("ws://" + window.location.host + "/websocket");

    this.socket.onopen = () => {
      console.log("WebSocket connected");
      this.connected = true;
    };

    this.socket.onclose = () => {
      console.log("WebSocket closed");
      this.connected = false;
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.connected = false;
    };
  },
  beforeUnmount() {
    // Close WebSocket connection before component is unmounted
    if (this.socket) {
      this.socket.close();
    }
  }
};
</script>
