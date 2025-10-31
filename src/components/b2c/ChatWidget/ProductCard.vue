<template>
  <div class="product-card">
    <img :src="product.image_url" :alt="product.name" class="product-image" />

    <div class="product-info">
      <h4>{{ product.name }}</h4>
      <p class="product-price">{{ formatPrice(product.price) }}</p>
      <a :href="product.link" target="_blank" class="product-link">
        Xem chi tiết →
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);
    }
  }
};
</script>

<style scoped>
.product-card {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-info h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #333;
}

.product-price {
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  color: #e74c3c;
}

.product-link {
  color: #3498db;
  text-decoration: none;
  font-size: 0.85rem;
}

.product-link:hover {
  text-decoration: underline;
}
</style>