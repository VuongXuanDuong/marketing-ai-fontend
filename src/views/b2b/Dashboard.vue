<template>
  <div class="dashboard-page">
    <Navbar />
    <div class="container">
      <h1>Dashboard - FashionAI Marketing Suite</h1>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>Tổng Khách hàng</h3>
          <p class="stat-number">1,234</p>
        </div>

        <div class="stat-card">
          <h3>Chiến dịch Đang chạy</h3>
          <p class="stat-number">5</p>
        </div>

        <div class="stat-card">
          <h3>Tỷ lệ Mở Email</h3>
          <p class="stat-number">24.5%</p>
        </div>

        <div class="stat-card">
          <h3>Doanh thu Tháng này</h3>
          <p class="stat-number">125M VND</p>
        </div>
      </div>

      <div class="quick-actions">
        <h2>Thao tác Nhanh</h2>
        <div class="actions-grid">
          <router-link to="/segmentation" class="action-card">
            <span class="icon">👥</span>
            <h3>Phân khúc Khách hàng</h3>
            <p>Tạo nhóm khách hàng mục tiêu</p>
          </router-link>

          <router-link to="/content-generator" class="action-card">
            <span class="icon">✨</span>
            <h3>Tạo Nội dung AI</h3>
            <p>Tự động tạo email marketing</p>
          </router-link>

          <router-link to="/campaigns" class="action-card">
            <span class="icon">📧</span>
            <h3>Gửi Chiến dịch</h3>
            <p>Gửi email đến khách hàng</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue';

export default {
  name: 'Dashboard',
  components: {
    Navbar
  }
};
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.container h1 {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
}

.stat-number {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
  color: #3498db;
}

.quick-actions {
  margin-top: 3rem;
}

.quick-actions h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-card .icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.action-card h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.action-card p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}
</style>