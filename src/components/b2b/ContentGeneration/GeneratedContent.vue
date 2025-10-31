<template>
  <div v-if="content" class="generated-content">
    <h3>Nội dung đã tạo</h3>

    <div class="content-display">
      <pre>{{ content }}</pre>
    </div>

    <div class="actions">
      <button @click="copyToClipboard" class="btn btn-secondary">
        📋 Sao chép
      </button>
      <button @click="$emit('use-content', content)" class="btn btn-primary">
        Sử dụng cho chiến dịch
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeneratedContent',
  props: {
    content: {
      type: String,
      required: true
    }
  },
  emits: ['use-content'],
  methods: {
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.content);
        alert('Đã sao chép vào clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  }
};
</script>

<style scoped>
.generated-content {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.content-display {
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  margin: 1rem 0;
  max-height: 400px;
  overflow-y: auto;
}

.content-display pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
  font-family: inherit;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style>