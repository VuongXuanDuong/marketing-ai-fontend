<template>
  <button @click="$emit('toggle')" class="chat-button">
    <span v-if="!isOpen">💬</span>
    <span v-else>✕</span>
  </button>
</template>

<script>
export default {
  name: 'ChatButton',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle']
};
</script>

<style scoped>
.chat-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #3498db;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
  z-index: 999;
}

.chat-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}
</style>