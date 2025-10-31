<template>
  <div class="audience-form">
    <div class="form-group">
      <label class="form-label">Đối tượng mục tiêu</label>
      <input
        v-model="audience"
        @input="emitUpdate"
        type="text"
        class="form-input"
        placeholder="Ví dụ: Nữ trẻ, 20-25 tuổi"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Giọng văn</label>
      <select v-model="tone" @change="emitUpdate" class="form-select">
        <option value="Vui vẻ, trẻ trung">Vui vẻ, trẻ trung</option>
        <option value="Chuyên nghiệp, lịch lãm">Chuyên nghiệp, lịch lãm</option>
        <option value="Sang trọng, cao cấp">Sang trọng, cao cấp</option>
        <option value="Thân thiện, gần gũi">Thân thiện, gần gũi</option>
      </select>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'AudienceForm',
  props: {
    modelValue: {
      type: Object,
      default: () => ({ audience: '', tone: 'Vui vẻ, trẻ trung' })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const audience = ref(props.modelValue.audience);
    const tone = ref(props.modelValue.tone);

    const emitUpdate = () => {
      emit('update:modelValue', {
        audience: audience.value,
        tone: tone.value
      });
    };

    return {
      audience,
      tone,
      emitUpdate
    };
  }
};
</script>

<style scoped>
.audience-form {
  margin-bottom: 2rem;
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
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}
</style>