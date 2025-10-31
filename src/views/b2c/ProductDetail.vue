<template>
  <div class="product-detail">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Đang tải thông tin sản phẩm...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <div class="error-content">
        <h2>Không thể tải sản phẩm</h2>
        <p>{{ error }}</p>
        <button @click="loadProduct" class="retry-button">Thử lại</button>
        <button @click="goBack" class="back-button">Quay lại</button>
      </div>
    </div>

    <!-- Product Content -->
    <div v-else-if="product" class="product-content">
      <!-- Breadcrumb -->
      <div class="container">
        <nav class="breadcrumb">
          <router-link to="/store">Trang chủ</router-link>
          <span class="separator">›</span>
          <span class="current">{{ product.name }}</span>
        </nav>
      </div>

      <!-- Product Main Section -->
      <section class="product-main">
        <div class="container">
          <div class="product-grid">
            <!-- Product Image -->
            <div class="product-image-section">
              <div class="main-image">
                <img :src="product.image_url" :alt="product.name" />
              </div>
            </div>

            <!-- Product Info -->
            <div class="product-info-section">
              <h1 class="product-title">{{ product.name }}</h1>

              <div class="product-category-badge">
                <span>{{ product.category || 'Thời trang' }}</span>
              </div>

              <div class="product-price-section">
                <span class="price">{{ formatPrice(product.price) }}</span>
              </div>

              <div class="product-description" v-if="product.description">
                <h3>Mô tả sản phẩm</h3>
                <p>{{ product.description }}</p>
              </div>

              <div class="product-actions">
                <button class="add-to-cart-btn">
                  <span class="icon">🛒</span>
                  Thêm vào giỏ hàng
                </button>
                <button class="buy-now-btn" @click="openExternalLink">
                  Mua ngay
                </button>
              </div>

              <div class="product-features">
                <div class="feature">
                  <span class="feature-icon">✓</span>
                  <span>Miễn phí giao hàng cho đơn từ 500k</span>
                </div>
                <div class="feature">
                  <span class="feature-icon">✓</span>
                  <span>Đổi trả trong 7 ngày</span>
                </div>
                <div class="feature">
                  <span class="feature-icon">✓</span>
                  <span>Kiểm tra hàng trước khi nhận</span>
                </div>
                <div class="feature">
                  <span class="feature-icon">✓</span>
                  <span>Thanh toán khi nhận hàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Promotions Section -->
      <section v-if="promotions && promotions.length > 0" class="promotions-section">
        <div class="container">
          <h2 class="section-title">Ưu đãi đặc biệt</h2>
          <div class="promotions-grid">
            <div v-for="promo in promotions" :key="promo.promotion_id" class="promo-card">
              <div class="promo-icon">🎁</div>
              <div class="promo-content">
                <h4>{{ promo.description }}</h4>
                <p class="promo-discount">Giảm {{ promo.discount_percentage }}%</p>
                <p class="promo-date" v-if="promo.valid_until">
                  Có hiệu lực đến: {{ formatDate(promo.valid_until) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Products Section -->
      <section v-if="relatedProducts && relatedProducts.length > 0" class="related-section">
        <div class="container">
          <h2 class="section-title">Sản phẩm liên quan</h2>
          <div class="related-grid">
            <StoreProductCard
              v-for="relatedProduct in relatedProducts"
              :key="relatedProduct.product_id"
              :product="relatedProduct"
            />
          </div>
        </div>
      </section>
    </div>

    <!-- Chat Widget -->
    <ChatButton @toggle="toggleChat" :is-open="isChatOpen" />
    <ChatWindow :is-open="isChatOpen" @close="toggleChat" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ChatButton from '@/components/b2c/ChatButton.vue';
import ChatWindow from '@/components/b2c/ChatWidget/ChatWindow.vue';
import StoreProductCard from '@/components/b2c/StoreProductCard.vue';
import b2cService from '@/services/b2cService';

export default {
  name: 'ProductDetail',
  components: {
    ChatButton,
    ChatWindow,
    StoreProductCard
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = ref(null);
    const relatedProducts = ref([]);
    const promotions = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const isChatOpen = ref(false);

    const productId = computed(() => route.params.id);

    const toggleChat = () => {
      isChatOpen.value = !isChatOpen.value;
    };

    const formatPrice = (price) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const loadProduct = async () => {
      loading.value = true;
      error.value = null;
      try {
        // Load product details
        const response = await b2cService.getProductById(productId.value);
        product.value = response.data;

        // Load related products
        try {
          const relatedResponse = await b2cService.getRelatedProducts(productId.value);
          relatedProducts.value = relatedResponse.data;
        } catch (err) {
          console.warn('Could not load related products:', err);
        }

        // Check for promotions (if the API exists)
        // This is optional - you can remove this if not implemented
        try {
          // Placeholder for promotion check
          // const promoResponse = await b2cService.getPromotions(productId.value);
          // promotions.value = promoResponse.data;
        } catch (err) {
          console.warn('Could not load promotions:', err);
        }
      } catch (err) {
        error.value = 'Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.';
        console.error('Error loading product:', err);
      } finally {
        loading.value = false;
      }
    };

    const openExternalLink = () => {
      if (product.value?.link) {
        window.open(product.value.link, '_blank');
      }
    };

    const goBack = () => {
      router.push('/store');
    };

    onMounted(() => {
      loadProduct();
    });

    return {
      product,
      relatedProducts,
      promotions,
      loading,
      error,
      isChatOpen,
      toggleChat,
      formatPrice,
      formatDate,
      loadProduct,
      openExternalLink,
      goBack
    };
  }
};
</script>

<style scoped>
.product-detail {
  min-height: 100vh;
  background: #ffffff;
}

/* Loading and Error States */
.loading-container,
.error-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-container {
  flex-direction: column;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #667eea;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.error-content {
  text-align: center;
  padding: 2rem;
}

.error-content h2 {
  color: #e74c3c;
  margin-bottom: 1rem;
}

.error-content p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.retry-button,
.back-button {
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 0.5rem;
}

.retry-button {
  background: #667eea;
  color: white;
}

.retry-button:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

.back-button {
  background: #ecf0f1;
  color: #2c3e50;
}

.back-button:hover {
  background: #d5dbdb;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Breadcrumb */
.breadcrumb {
  padding: 2rem 0 1rem;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.breadcrumb a {
  color: #667eea;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb a:hover {
  color: #5568d3;
}

.breadcrumb .separator {
  margin: 0 0.5rem;
}

.breadcrumb .current {
  color: #2c3e50;
}

/* Product Main Section */
.product-main {
  padding: 2rem 0 4rem;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

/* Product Image */
.product-image-section {
  position: sticky;
  top: 2rem;
}

.main-image {
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: 16px;
  overflow: hidden;
  background: #f8f9fa;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Info */
.product-info-section {
  padding: 1rem 0;
}

.product-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  line-height: 1.3;
}

.product-category-badge {
  display: inline-block;
  margin-bottom: 1.5rem;
}

.product-category-badge span {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-price-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ecf0f1 100%);
  border-radius: 12px;
}

.price {
  font-size: 2.5rem;
  font-weight: 800;
  color: #e74c3c;
}

.product-description {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #ecf0f1;
}

.product-description h3 {
  font-size: 1.25rem;
  color: #2c3e50;
  margin: 0 0 1rem 0;
}

.product-description p {
  color: #7f8c8d;
  line-height: 1.8;
  font-size: 1rem;
}

/* Product Actions */
.product-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.add-to-cart-btn,
.buy-now-btn {
  flex: 1;
  padding: 16px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.add-to-cart-btn {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.add-to-cart-btn:hover {
  background: #667eea;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.buy-now-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.buy-now-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.icon {
  font-size: 1.25rem;
}

/* Product Features */
.product-features {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  color: #2c3e50;
}

.feature:not(:last-child) {
  border-bottom: 1px solid #ecf0f1;
}

.feature-icon {
  color: #27ae60;
  font-weight: 700;
  font-size: 1.1rem;
}

/* Promotions Section */
.promotions-section {
  padding: 4rem 0;
  background: linear-gradient(to bottom, #fff5f5, #ffffff);
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 2rem 0;
  text-align: center;
}

.promotions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.promo-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.1);
  border: 2px solid #ffe5e5;
  transition: all 0.3s ease;
}

.promo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(231, 76, 60, 0.2);
}

.promo-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.promo-content h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.promo-discount {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #e74c3c;
}

.promo-date {
  margin: 0;
  font-size: 0.85rem;
  color: #7f8c8d;
}

/* Related Products Section */
.related-section {
  padding: 4rem 0;
  background: #f8f9fa;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

/* Responsive Design */
@media (max-width: 968px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .product-image-section {
    position: static;
  }

  .product-title {
    font-size: 2rem;
  }

  .price {
    font-size: 2rem;
  }
}

@media (max-width: 640px) {
  .product-actions {
    flex-direction: column;
  }

  .product-title {
    font-size: 1.75rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
