import apiClient from './api';

export default {
  // Customer Segmentation
  segmentCustomers(rules) {
    return apiClient.post('/b2b/segment', { rules });
  },

  // Content Generation
  generateContent(productId, targetAudience, tone) {
    return apiClient.post('/b2b/generate-content', {
      product_id: productId,
      target_audience: targetAudience,
      tone: tone
    });
  },

  // Email Campaign
  sendEmailCampaign(emails, subject, content) {
    return apiClient.post('/b2b/send-email', {
      emails,
      subject,
      content
    });
  }
};