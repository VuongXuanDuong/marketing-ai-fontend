<template>
  <div class="store-front">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">FashionAI Store</h1>
        <p class="hero-subtitle">
          Khám phá bộ sưu tập thời trang độc đáo được tuyển chọn bởi AI
        </p>
        <p class="hero-description">
          Chúng tôi mang đến trải nghiệm mua sắm thông minh với công nghệ AI,
          giúp bạn tìm thấy những sản phẩm phù hợp nhất với phong cách của mình.
        </p>
        <button class="cta-button" @click="scrollToProducts">
          Khám phá ngay
          <span class="cta-arrow">↓</span>
        </button>
      </div>
    </section>

    <!-- Shop Introduction -->
    <section class="intro-section">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-card">
            <div class="intro-icon">🤖</div>
            <h3>AI Thông Minh</h3>
            <p>Chatbot AI giúp tư vấn sản phẩm phù hợp với nhu cầu của bạn</p>
          </div>
          <div class="intro-card">
            <div class="intro-icon">✨</div>
            <h3>Chất Lượng Cao</h3>
            <p>Sản phẩm được tuyển chọn kỹ lưỡng từ các thương hiệu uy tín</p>
          </div>
          <div class="intro-card">
            <div class="intro-icon">🚚</div>
            <h3>Giao Hàng Nhanh</h3>
            <p>Giao hàng tận nơi trên toàn quốc, đảm bảo thời gian</p>
          </div>
          <div class="intro-card">
            <div class="intro-icon">💝</div>
            <h3>Ưu Đãi Hấp Dẫn</h3>
            <p>Chương trình khuyến mãi và ưu đãi độc quyền cho khách hàng</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="products-section" ref="productsSection">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Sản Phẩm Nổi Bật</h2>
          <p class="section-subtitle">Bộ sưu tập thời trang mới nhất</p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Đang tải sản phẩm...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <p>{{ error }}</p>
          <button @click="loadProducts" class="retry-button">Thử lại</button>
        </div>

        <!-- Products Grid -->
        <div v-else-if="products.length > 0" class="products-grid">
          <StoreProductCard
            v-for="product in products"
            :key="product.product_id"
            :product="product"
          />
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <p>Chưa có sản phẩm nào</p>
        </div>
      </div>
    </section>

    <!-- Chat Widget -->
    <ChatButton @toggle="toggleChat" :is-open="isChatOpen" />
    <ChatWindow :is-open="isChatOpen" @close="toggleChat" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ChatButton from '@/components/b2c/ChatButton.vue';
import ChatWindow from '@/components/b2c/ChatWidget/ChatWindow.vue';
import StoreProductCard from '@/components/b2c/StoreProductCard.vue';
import b2cService from '@/services/b2cService';

export default {
  name: 'StoreFront',
  components: {
    ChatButton,
    ChatWindow,
    StoreProductCard
  },
  setup() {
    const isChatOpen = ref(false);
    const products = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const productsSection = ref(null);

    const toggleChat = () => {
      isChatOpen.value = !isChatOpen.value;
    };

    const scrollToProducts = () => {
      productsSection.value?.scrollIntoView({ behavior: 'smooth' });
    };

    const loadProducts = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await b2cService.getAllProducts();
        products.value = response.data;
      } catch (err) {
        error.value = 'Không thể tải sản phẩm. Vui lòng thử lại sau.';
        console.error('Error loading products:', err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      loadProducts();
    });

    return {
      isChatOpen,
      products,
      loading,
      error,
      productsSection,
      toggleChat,
      scrollToProducts,
      loadProducts
    };
  }
};
</script>

<style scoped>
.store-front {
  min-height: 100vh;
  background: #ffffff;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 600px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  position: relative;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 2rem;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.8s ease-out;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 1.5rem 0;
  opacity: 0.95;
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0 0 2rem 0;
  opacity: 0.9;
  animation: fadeInUp 0.8s ease-out 0.4s backwards;
}

.cta-button {
  padding: 16px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #667eea;
  background: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease-out 0.6s backwards;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.cta-arrow {
  display: inline-block;
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.cta-button:hover .cta-arrow {
  transform: translateY(3px);
}

/* Intro Section */
.intro-section {
  padding: 5rem 0;
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.intro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.intro-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.intro-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.intro-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.intro-card h3 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  color: #2c3e50;
}

.intro-card p {
  margin: 0;
  color: #7f8c8d;
  line-height: 1.6;
}

/* Products Section */
.products-section {
  padding: 5rem 0;
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 1rem 0;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #7f8c8d;
  margin: 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 4rem 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

/* Error State */
.error-state {
  text-align: center;
  padding: 4rem 0;
}

.error-state p {
  color: #e74c3c;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.retry-button {
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: #667eea;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 0;
  color: #7f8c8d;
  font-size: 1.1rem;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .intro-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 500px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .intro-grid {
    grid-template-columns: 1fr;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>