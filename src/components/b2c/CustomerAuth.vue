<template>
  <div class="auth-overlay" @click.self="$emit('close')">
    <div class="auth-modal">
      <div class="auth-header">
        <h2>{{ isLogin ? 'Đăng nhập' : 'Đăng ký' }}</h2>
        <button @click="$emit('close')" class="close-btn">✕</button>
      </div>

      <div class="auth-body">
        <form @submit.prevent="handleSubmit">
          <div v-if="!isLogin" class="form-group">
            <label for="name">Họ tên</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              placeholder="Nhập họ tên của bạn"
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              placeholder="Nhập email của bạn"
            />
          </div>

          <div class="form-group">
            <label for="password">Mật khẩu</label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              placeholder="Nhập mật khẩu"
              :minlength="6"
            />
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký') }}
          </button>
        </form>

        <div class="auth-footer">
          <p>
            {{ isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?' }}
            <a href="#" @click.prevent="toggleMode">
              {{ isLogin ? 'Đăng ký ngay' : 'Đăng nhập' }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'CustomerAuth',
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const store = useStore();
    const isLogin = ref(true);
    const loading = ref(false);
    const error = ref('');

    const formData = reactive({
      name: '',
      email: '',
      password: ''
    });

    const toggleMode = () => {
      isLogin.value = !isLogin.value;
      error.value = '';
      // Reset form
      formData.name = '';
      formData.email = '';
      formData.password = '';
    };

    const handleSubmit = async () => {
      loading.value = true;
      error.value = '';

      try {
        if (isLogin.value) {
          await store.dispatch('b2c/login', {
            email: formData.email,
            password: formData.password
          });
        } else {
          await store.dispatch('b2c/register', {
            email: formData.email,
            name: formData.name,
            password: formData.password
          });
        }

        emit('success');
        emit('close');
      } catch (err) {
        error.value = err.response?.data?.detail || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      } finally {
        loading.value = false;
      }
    };

    return {
      isLogin,
      loading,
      error,
      formData,
      toggleMode,
      handleSubmit
    };
  }
};
</script>

<style scoped>
.auth-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.auth-modal {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.auth-header {
  background: #3498db;
  color: white;
  padding: 1.25rem;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.auth-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
}

.close-btn:hover {
  opacity: 0.8;
}

.auth-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #3498db;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.submit-btn {
  width: 100%;
  padding: 0.875rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background: #2980b9;
}

.submit-btn:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
  color: #666;
}

.auth-footer a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>
