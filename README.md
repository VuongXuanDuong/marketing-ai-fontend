# FashionAI Marketing Suite - Frontend

Vue.js 3 frontend with Vuex state management.

## Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

Create `.env.local`:

```env
VUE_APP_API_URL=http://localhost:8000/api
```

### 3. Run Development Server

```bash
npm run serve
```

App will be available at: `http://localhost:8080`

## Build for Production

```bash
npm run build
```

## Project Structure

### Components

#### Common Components
- `Navbar.vue` - Navigation bar
- `LoadingSpinner.vue` - Loading indicator
- `ErrorAlert.vue` - Error messages

#### B2B Components
- `CustomerSegmentation/` - Customer segmentation UI
    - `SegmentBuilder.vue` - Main segmentation interface
    - `FilterRule.vue` - Individual filter rule
    - `CustomerList.vue` - Display segmented customers
- `ContentGeneration/` - AI content generation UI
    - `ProductSelector.vue` - Select product
    - `AudienceForm.vue` - Define target audience
    - `GeneratedContent.vue` - Display generated content
- `CampaignSender/` - Email campaign UI
    - `EmailComposer.vue` - Compose email
    - `CampaignPreview.vue` - Preview before sending

#### B2C Components
- `ChatWidget/` - Customer chat interface
    - `ChatWindow.vue` - Main chat container
    - `MessageList.vue` - List of messages
    - `MessageItem.vue` - Individual message
    - `ChatInput.vue` - Input field
    - `ProductCard.vue` - Product display in chat
- `ChatButton.vue` - Floating chat button

### Views

#### B2B Views
- `Dashboard.vue` - Main dashboard
- `Segmentation.vue` - Customer segmentation page
- `ContentGenerator.vue` - Content generation page
- `Campaigns.vue` - Campaign management page

#### B2C Views
- `StoreFront.vue` - Customer-facing store with chat

### Services
- `api.js` - Axios configuration
- `b2bService.js` - B2B API calls
- `b2cService.js` - B2C API calls

### Store (Vuex)
- `modules/b2b.js` - B2B state management
- `modules/b2c.js` - B2C state management with chat history

## Features

### B2B Features
✅ Customer Segmentation with dynamic filters
✅ AI-powered content generation
✅ Email campaign management
✅ Real-time feedback and loading states

### B2C Features
✅ AI chatbot with conversational memory
✅ RAG-powered product search
✅ Product recommendations
✅ Promotion lookup
✅ Session management with localStorage

## Technology Stack

- Vue 3 (Composition API)
- Vue Router
- Vuex
- Axios
- UUID (for session management)
```