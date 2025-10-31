<template>
  <div class="segmentation-page">
    <Navbar />
    <div class="container">
      <SegmentBuilder />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue';
import SegmentBuilder from '@/components/b2b/CustomerSegmentation/SegmentBuilder.vue';

export default {
  name: 'Segmentation',
  components: {
    Navbar,
    SegmentBuilder
  }
};
</script>

<style scoped>
.segmentation-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>