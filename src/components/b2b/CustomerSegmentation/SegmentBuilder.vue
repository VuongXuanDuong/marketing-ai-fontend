<template>
  <div class="segment-builder">
    <h2>Phân khúc Khách hàng</h2>

    <div class="rules-container">
      <FilterRule
        v-for="(rule, index) in rules"
        :key="index"
        :rule="rule"
        @update="updateRule(index, $event)"
        @remove="removeRule(index)"
      />
    </div>

    <button @click="addRule" class="btn btn-secondary">
      + Thêm Điều kiện
    </button>

    <div class="actions">
      <button
        @click="segment"
        class="btn btn-primary"
        :disabled="loading || rules.length === 0"
      >
        {{ loading ? 'Đang xử lý...' : 'Phân khúc' }}
      </button>
    </div>

    <CustomerList
      v-if="emails.length > 0"
      :emails="emails"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import FilterRule from './FilterRule.vue';
import CustomerList from './CustomerList.vue';

export default {
  name: 'SegmentBuilder',
  components: {
    FilterRule,
    CustomerList
  },
  setup() {
    const store = useStore();

    const rules = ref([
      { field: 'category', operator: 'equals', value: '' }
    ]);

    const loading = computed(() => store.state.b2b.loading);
    const emails = computed(() => store.state.b2b.segmentedEmails);

    const addRule = () => {
      rules.value.push({ field: 'category', operator: 'equals', value: '' });
    };

    const updateRule = (index, updatedRule) => {
      rules.value[index] = updatedRule;
    };

    const removeRule = (index) => {
      rules.value.splice(index, 1);
    };

    const segment = async () => {
      try {
        await store.dispatch('b2b/segmentCustomers', rules.value);
      } catch (error) {
        alert('Lỗi: ' + error.message);
      }
    };

    return {
      rules,
      loading,
      emails,
      addRule,
      updateRule,
      removeRule,
      segment
    };
  }
};
</script>

<style scoped>
.segment-builder {
  padding: 2rem;
}

.rules-container {
  margin: 2rem 0;
}

.actions {
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 1rem;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2980b9;
}

.btn-primary:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
}
</style>