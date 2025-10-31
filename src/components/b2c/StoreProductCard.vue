<template>
  <div class="store-product-card" @click="goToProduct">
    <div class="product-image-wrapper">
      <img :src="product.image_url" :alt="product.name" class="product-image" />
      <div class="product-overlay">
        <button class="quick-view-btn">Xem chi tiết</button>
      </div>
    </div>

    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-category">{{ product.category || 'Thời trang' }}</p>
      <div class="product-footer">
        <span class="product-price">{{ formatPrice(product.price) }}</span>
        <span class="product-arrow">→</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreProductCard',
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
    },
    goToProduct() {
      this.$router.push(`/store/product/${this.product.product_id}`);
    }
  }
};
</script>

<style scoped>
.store-product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.store-product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 125%; /* 4:5 aspect ratio */
  overflow: hidden;
  background: #f8f9fa;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.store-product-card:hover .product-image {
  transform: scale(1.05);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.store-product-card:hover .product-overlay {
  opacity: 1;
}

.quick-view-btn {
  padding: 12px 24px;
  background: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  color: #2c3e50;
  cursor: pointer;
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

.store-product-card:hover .quick-view-btn {
  transform: translateY(0);
}

.product-info {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.8em;
}

.product-category {
  margin: 0 0 0.75rem 0;
  font-size: 0.85rem;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid #ecf0f1;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #e74c3c;
}

.product-arrow {
  font-size: 1.25rem;
  color: #3498db;
  transition: transform 0.3s ease;
}

.store-product-card:hover .product-arrow {
  transform: translateX(4px);
}
</style>
