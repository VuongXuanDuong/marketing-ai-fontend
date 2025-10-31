<template>
  <div class="product-selector">
    <label class="form-label">Chọn Sản phẩm</label>
    <select
      v-model="selectedProductId"
      @change="emitChange"
      class="form-select"
      :disabled="loading"
    >
      <option value="">
        {{ loading ? 'Đang tải sản phẩm...' : '-- Chọn sản phẩm --' }}
      </option>
      <option v-for="product in products" :key="product.product_id" :value="product.product_id">
        {{ product.name }} - {{ formatPrice(product.price) }}
      </option>
    </select>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import b2cService from '@/services/b2cService';

export default {
  name: 'ProductSelector',
  props: {
    modelValue: {
      type: [Number, String],
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectedProductId = ref(props.modelValue);
    const products = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchProducts = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await b2cService.getAllProducts();
        products.value = response.data;
      } catch (err) {
        error.value = 'Không thể tải danh sách sản phẩm';
        console.error('Error fetching products:', err);
      } finally {
        loading.value = false;
      }
    };

    const emitChange = () => {
      emit('update:modelValue', selectedProductId.value);
    };

    const formatPrice = (price) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);
    };

    onMounted(() => {
      fetchProducts();
    });

    return {
      selectedProductId,
      products,
      loading,
      error,
      emitChange,
      formatPrice
    };
  }
};
</script>

<style scoped>
.product-selector {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-select:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error-message {
  margin-top: 0.5rem;
  color: #e74c3c;
  font-size: 0.875rem;
}
</style>