<template>
  <div class="filter-rule">
    <select v-model="localRule.field" @change="emitUpdate" class="form-select">
      <option value="category">Danh mục</option>
      <option value="order_date">Ngày mua hàng</option>
      <option value="total_spent">Tổng chi tiêu</option>
    </select>

    <select v-model="localRule.operator" @change="emitUpdate" class="form-select">
      <option v-if="localRule.field === 'category'" value="equals">Bằng</option>
      <option v-if="localRule.field === 'order_date'" value="last_n_days">Trong N ngày qua</option>
      <option v-if="localRule.field === 'total_spent'" value="greater_than">Lớn hơn</option>
    </select>

    <input
      v-model="localRule.value"
      @input="emitUpdate"
      type="text"
      class="form-input"
      :placeholder="getPlaceholder()"
    />

    <button @click="$emit('remove')" class="btn-remove">✕</button>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'FilterRule',
  props: {
    rule: {
      type: Object,
      required: true
    }
  },
  emits: ['update', 'remove'],
  setup(props, { emit }) {
    const localRule = ref({ ...props.rule });

    watch(() => props.rule, (newRule) => {
      localRule.value = { ...newRule };
    }, { deep: true });

    const emitUpdate = () => {
      emit('update', { ...localRule.value });
    };

    const getPlaceholder = () => {
      switch (localRule.value.field) {
        case 'category':
          return 'Ví dụ: Áo Lụa';
        case 'order_date':
          return 'Số ngày, ví dụ: 30';
        case 'total_spent':
          return 'Số tiền, ví dụ: 1000000';
        default:
          return '';
      }
    };

    return {
      localRule,
      emitUpdate,
      getPlaceholder
    };
  }
};
</script>

<style scoped>
.filter-rule {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

.form-select, .form-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.form-select {
  min-width: 150px;
}

.form-input {
  flex: 1;
}

.btn-remove {
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-remove:hover {
  background: #c0392b;
}
</style>