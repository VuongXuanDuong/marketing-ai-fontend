<template>
  <div class="message-item" :class="`message-${message.role}`">
    <div class="message-content">
      <p>{{ message.content }}</p>

      <div v-if="message.products && message.products.length > 0" class="products-grid">
        <ProductCard
          v-for="product in message.products"
          :key="product.product_id"
          :product="product"
        />
      </div>
    </div>

    <span class="message-time">{{ formatTime(message.timestamp) }}</span>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  name: 'MessageItem',
  components: {
    ProductCard
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
};
</script>

<style scoped>
.message-item {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.message-user {
  align-items: flex-end;
}

.message-ai {
  align-items: flex-start;
}

.message-content {
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  word-wrap: break-word;
  white-space: pre-line;
}

.message-user .message-content {
  background: #3498db;
  color: white;
}

.message-ai .message-content {
  background: white;
  color: #333;
  border: 1px solid #e0e0e0;
}

.message-content p {
  margin: 0;
  line-height: 1.5;
}

.products-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-top: 1rem;
}

.message-time {
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.25rem;
}
</style>