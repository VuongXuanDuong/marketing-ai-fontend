<template>
  <div class="campaigns-page">
    <Navbar />
    <div class="container">
      <h2>Quản lý Chiến dịch Email</h2>

      <div class="campaign-form">
        <div class="form-group">
          <label class="form-label">Danh sách Email</label>
          <textarea
              v-model="emailList"
              class="form-textarea"
              rows="5"
              placeholder="Nhập email, mỗi email một dòng hoặc phân cách bằng dấu phẩy"
          ></textarea>
          <p class="help-text">{{ emailCount }} email</p>
        </div>

        <div class="form-group">
          <label class="form-label">Tiêu đề Email</label>
          <input
              v-model="subject"
              type="text"
              class="form-input"
              placeholder="Nhập tiêu đề email"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Nội dung Email</label>
          <textarea
              v-model="content"
              class="form-textarea"
              rows="10"
              placeholder="Nhập nội dung email (hỗ trợ HTML)"
          ></textarea>
        </div>

        <div class="preview-section">
          <h3>Xem trước Email</h3>
          <div class="email-preview" v-html="content"></div>
        </div>

        <button
            @click="sendCampaign"
            class="btn btn-primary"
            :disabled="loading || !canSend"
        >
          {{ loading ? 'Đang gửi...' : '📧 Gửi Chiến dịch' }}
        </button>

        <div v-if="campaignResult" class="result-message" :class="resultClass">
          <p><strong>Kết quả gửi:</strong></p>
          <p>✅ Thành công: {{ campaignResult.sent_count }}</p>
          <p>❌ Thất bại: {{ campaignResult.failed_count }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Navbar from '@/components/common/Navbar.vue';

export default {
  name: 'Campaigns',
  components: {
    Navbar
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const emailList = ref('');
    const subject = ref('');
    const content = ref('');
    const campaignResult = ref(null);

    const loading = computed(() => store.state.b2b.loading);

    const emailCount = computed(() => {
      const emails = emailList.value
          .split(/[\n,]/)
          .map(e => e.trim())
          .filter(e => e.length > 0);
      return emails.length;
    });

    const canSend = computed(() => {
      return emailCount.value > 0 && subject.value.trim() && content.value.trim();
    });

    const resultClass = computed(() => {
      if (!campaignResult.value) return '';
      return campaignResult.value.failed_count === 0 ? 'success' : 'warning';
    });

    const sendCampaign = async () => {
      const emails = emailList.value
          .split(/[\n,]/)
          .map(e => e.trim())
          .filter(e => e.length > 0);

      try {
        const result = await store.dispatch('b2b/sendCampaign', {
          emails,
          subject: subject.value,
          content: content.value
        });

        campaignResult.value = result;

        if (result.failed_count === 0) {
          alert('Chiến dịch đã được gửi thành công!');
        }
      } catch (error) {
        alert('Lỗi: ' + error.message);
      }
    };

    // Populate content from router state if provided
    onMounted(() => {
      // Check for prefilled content from router state
      const state = window.history.state;
      if (state && state.prefilledContent) {
        content.value = state.prefilledContent;
      }
    });

    return {
      emailList,
      subject,
      content,
      campaignResult,
      loading,
      emailCount,
      canSend,
      resultClass,
      sendCampaign
    };
  }
};
</script>

<style scoped>
.campaigns-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.container h2 {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.campaign-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-textarea {
  resize: vertical;
}

.help-text {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #666;
}

.preview-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.preview-section h3 {
  margin-top: 0;
  color: #2c3e50;
}

.email-preview {
  background: white;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 150px;
}

.btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
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

.result-message {
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 4px;
}

.result-message.success {
  background: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
}

.result-message.warning {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  color: #856404;
}

.result-message p {
  margin: 0.5rem 0;
}
</style>