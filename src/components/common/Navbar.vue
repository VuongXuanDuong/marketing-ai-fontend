<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <router-link to="/">
          <h1>FashionAI</h1>
        </router-link>
      </div>

      <div class="navbar-menu">
        <router-link to="/dashboard" class="nav-item">
          Dashboard
        </router-link>
        <router-link to="/segmentation" class="nav-item">
          Phân khúc KH
        </router-link>
        <router-link to="/content-generator" class="nav-item">
          Tạo Nội dung
        </router-link>
        <router-link to="/campaigns" class="nav-item">
          Chiến dịch
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
};
</script>

<style scoped>
.navbar {
  background: #2c3e50;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand h1 {
  margin: 0;
  font-size: 1.5rem;
}

.navbar-brand a {
  color: white;
  text-decoration: none;
}

.navbar-menu {
  display: flex;
  gap: 2rem;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-item.router-link-active {
  background: rgba(255, 255, 255, 0.2);
}
</style>