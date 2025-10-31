<template>
  <div class="customer-list">
    <h3>Kết quả: {{ emails.length }} khách hàng</h3>

    <div class="list-container">
      <div v-for="(email, index) in emails" :key="index" class="email-item">
        <span>{{ email }}</span>
      </div>
    </div>

    <button @click="exportEmails" class="btn btn-primary">
      Xuất danh sách
    </button>
  </div>
</template>

<script>
export default {
  name: 'CustomerList',
  props: {
    emails: {
      type: Array,
      required: true
    }
  },
  methods: {
    exportEmails() {
      const csvContent = this.emails.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'customers.csv';
      a.click();
    }
  }
};
</script>

<style scoped>
.customer-list {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.list-container {
  max-height: 300px;
  overflow-y: auto;
  margin: 1rem 0;
  padding: 1rem;
  background: white;
  border-radius: 4px;
}

.email-item {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.email-item:last-child {
  border-bottom: none;
}
</style>