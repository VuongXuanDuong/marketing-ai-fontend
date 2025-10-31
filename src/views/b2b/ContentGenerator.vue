<template>
  <div class="content-generator-page">
    <Navbar />
    <div class="container">
      <h2>Tạo Nội dung Marketing với AI</h2>

      <div class="generator-form">
        <ProductSelector v-model="productId" />

        <AudienceForm v-model="audienceData" />

        <button
            @click="generate"
            class="btn btn-primary"
            :disabled="loading || !productId"
        >
          {{ loading ? 'Đang tạo...' : '✨ Tạo nội dung' }}
        </button>

        <LoadingSpinner v-if="loading" message="AI đang sáng tạo nội dung..." />

        <GeneratedContent
            v-if="generatedContent"
            :content="generatedContent"
            @use-content="useContent"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Navbar from '@/components/common/Navbar.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import ProductSelector from '@/components/b2b/ContentGeneration/ProductSelector.vue';
import AudienceForm from '@/components/b2b/ContentGeneration/AudienceForm.vue';
import GeneratedContent from '@/components/b2b/ContentGeneration/GeneratedContent.vue';

export default {
  name: 'ContentGenerator',
  components: {
    Navbar,
    LoadingSpinner,
    ProductSelector,
    AudienceForm,
    GeneratedContent
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const productId = ref('');
    const audienceData = ref({
      audience: '',
      tone: 'Vui vẻ, trẻ trung'
    });

    const loading = computed(() => store.state.b2b.loading);
    const generatedContent = computed(() => store.state.b2b.generatedContent);

    const generate = async () => {
      try {
        await store.dispatch('b2b/generateContent', {
          productId: productId.value,
          targetAudience: audienceData.value.audience,
          tone: audienceData.value.tone
        });
      } catch (error) {
        alert('Lỗi: ' + error.message);
      }
    };

    const useContent = (content) => {
      // Navigate to campaigns page with content using state
      router.push({
        name: 'Campaigns',
        state: { prefilledContent: content }
      });
    };

    return {
      productId,
      audienceData,
      loading,
      generatedContent,
      generate,
      useContent
    };
  }
};
</script>

<style scoped>
.content-generator-page {
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

.generator-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
</style>