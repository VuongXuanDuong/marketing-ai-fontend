<template>
  <div class="chat-input">
    <input
      v-model="message"
      @keyup.enter="sendMessage"
      type="text"
      placeholder="Nhập tin nhắn..."
      :disabled="disabled"
      class="input-field"
    />
    <button
      @click="sendMessage"
      :disabled="disabled || !message.trim()"
      class="send-btn"
    >
      ➤
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ChatInput',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['send'],
  setup(props, { emit }) {
    const message = ref('');

    const sendMessage = () => {
      if (message.value.trim() && !props.disabled) {
        emit('send', message.value);
        message.value = '';
      }
    };

    return {
      message,
      sendMessage
    };
  }
};
</script>

<style scoped>
.chat-input {
  display: flex;
  padding: 1rem;
  background: white;
  border-top: 1px solid #e0e0e0;
  border-radius: 0 0 12px 12px;
}

.input-field {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  font-size: 0.9rem;
  outline: none;
}

.input-field:focus {
  border-color: #3498db;
}

.input-field:disabled {
  background: #f0f0f0;
  cursor: not-allowed;
}

.send-btn {
  margin-left: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1.2rem;
}

.send-btn:hover:not(:disabled) {
  background: #2980b9;
}

.send-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}
</style>