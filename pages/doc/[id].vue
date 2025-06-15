<template>
  <div class="min-h-screen">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-96">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
        </div>
        <p class="ml-4 text-gray-600 font-medium">Loading document...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white border border-red-200 rounded-2xl shadow-xl p-8">
        <div class="flex items-center justify-center mb-6">
          <div class="bg-red-100 rounded-full p-3">
            <svg class="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 text-center mb-4">Oops! Something went wrong</h3>
        <p class="text-gray-600 text-center mb-8">{{ error }}</p>
        <div class="flex justify-center">
          <button 
            @click="fetchDocument" 
            class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Try Again
          </button>
        </div>
      </div>

      <!-- Document Content -->
      <div v-else-if="document" class="space-y-8">
        <!-- Hero Header -->
        <div class="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl overflow-hidden">
          <div class="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 px-8 py-12 text-white relative overflow-hidden">
            <!-- Decorative Elements -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div class="relative z-10">
              <!-- Document ID Badge -->
              <div class="flex items-center justify-between mb-6">
                <span class="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                  </svg>
                  ID: {{ document.id }}
                </span>
                
                <!-- External Link Button -->
                <button 
                  v-if="document.url"
                  @click="viewOriginalSource"
                  class="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30 hover:bg-white/30 transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  Visit Source
                </button>
              </div>
              
              <!-- Institution/Journal Name -->
              <h1 class="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white">
                {{ document.name }}
              </h1>
              
              <!-- Institution Info -->
              <div v-if="document.institution" class="mb-6">
                <div class="flex flex-wrap gap-3">
                  <div class="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                      <span class="text-sm font-medium">{{ document.institution }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Subject Area -->
              <div v-if="document.subjectArea" class="text-white/80 text-sm mb-4">
                <span class="inline-flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                  Subject Area: {{ document.subjectArea }}
                </span>
              </div>

              <!-- Accreditation -->
              <div v-if="document.accreditation" class="text-white/80 text-sm">
                <span class="inline-flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                  Accreditation: {{ document.accreditation }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Sections -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Institution Image -->
            <div v-if="document.imageUrl" class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                <h2 class="text-xl font-bold text-gray-900 flex items-center">
                  <div class="bg-blue-100 rounded-lg p-2 mr-3">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  Institution Image
                </h2>
              </div>
              <div class="p-6">
                <img 
                  :src="document.imageUrl" 
                  :alt="document.name"
                  class="w-full h-64 object-cover rounded-lg shadow-md"
                  @error="handleImageError"
                />
              </div>
            </div>

            <!-- Articles Section -->
            <div v-if="document.articles && document.articles.length > 0" class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
                <h2 class="text-xl font-bold text-gray-900 flex items-center">
                  <div class="bg-green-100 rounded-lg p-2 mr-3">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                    </svg>
                  </div>
                  Published Articles ({{ document.articles.length }})
                </h2>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <div 
                    v-for="(article, index) in document.articles" 
                    :key="index"
                    class="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div class="flex-1">
                        <h3 class="font-semibold text-gray-900 mb-2">{{ article.title }}</h3>
                        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                            </svg>
                            {{ article.institution }}
                          </span>
                          <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            {{ article.year }}
                          </span>
                        </div>
                      </div>
                      <div class="flex items-center">
                        <a 
                          v-if="article.url"
                          :href="article.url" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                        >
                          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                          </svg>
                          View Article
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Document Information -->
            <div class="space-y-4">
              <!-- Print ISSN -->
              <div v-if="document.pIssn" class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div class="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                  <h3 class="font-bold text-gray-900 flex items-center">
                    <div class="bg-purple-100 rounded-lg p-2 mr-3">
                      <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                      </svg>
                    </div>
                    Print ISSN
                  </h3>
                </div>
                <div class="p-6">
                  <p class="text-gray-800 font-medium font-mono">{{ document.pIssn }}</p>
                </div>
              </div>

              <!-- Electronic ISSN -->
              <div v-if="document.eIssn" class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div class="bg-gradient-to-r from-teal-50 to-cyan-50 px-6 py-4 border-b border-gray-100">
                  <h3 class="font-bold text-gray-900 flex items-center">
                    <div class="bg-teal-100 rounded-lg p-2 mr-3">
                      <svg class="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    Electronic ISSN
                  </h3>
                </div>
                <div class="p-6">
                  <p class="text-gray-800 font-medium font-mono">{{ document.eIssn }}</p>
                </div>
              </div>

              <!-- Actions -->
              <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div class="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4 border-b border-gray-100">
                  <h3 class="font-bold text-gray-900 flex items-center">
                    <div class="bg-orange-100 rounded-lg p-2 mr-3">
                      <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
                      </svg>
                    </div>
                    Quick Actions
                  </h3>
                </div>
                <div class="p-6 space-y-3">
                  <button 
                    @click="copyLink"
                    class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-center pt-8">
          <button 
            @click="$router.go(-1)"
            class="inline-flex items-center bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to Search
          </button>
        </div>
      </div>

      <!-- Not Found State -->
      <div v-else class="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 text-center">
        <div class="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-8 flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <h3 class="text-3xl font-bold text-gray-900 mb-4">Document Not Found</h3>
        <p class="text-gray-600 mb-8 text-lg">We couldn't find the document with ID "{{ $route.params.id }}".</p>
        <button 
          @click="$router.go(-1)"
          class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Go Back
        </button>
      </div>

      <!-- Toast Notification -->
      <div 
        v-if="showToast" 
        class="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl transform transition-all duration-300 flex items-center z-50"
        :class="{ 'translate-x-full opacity-0': !showToast }"
      >
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        {{ toastMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
const { getPaperDetail } = usePapers()

// Types
interface DocumentData {
  id: number
  name: string
  institution: string
  imageUrl: string
  url: string
  accreditation: string
  subjectArea: string
  pIssn: string
  eIssn: string
  articles: Article[]
}

interface Article {
  title: string
  institution: string
  url: string
  year: number
}

// Composables
const route = useRoute()

// Reactive data
const document = ref<DocumentData | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const showToast = ref(false)
const toastMessage = ref('')

// Page meta
definePageMeta({
  layout: 'global',
})

// Methods
const fetchDocument = async () => {
  try {
    loading.value = true
    error.value = null
    
    const documentId = route.params.id as string
    console.log('Fetching document with ID:', documentId)
    
    const response = await getPaperDetail(documentId)
    console.log('Fetched document:', response)
    
    // Handle Nuxt reactive response
    if (response.data.value) {
      document.value = response.data.value as DocumentData
    } else if (response.error.value) {
      error.value = response.error.value.message || 'Failed to fetch document'
    } else {
      document.value = null
    }
  } catch (err) {
    console.error('Error fetching document:', err)
    error.value = err instanceof Error ? err.message : 'Failed to fetch document'
  } finally {
    loading.value = false
  }
}

const viewOriginalSource = () => {
  if (document.value?.url) {
    window.open(document.value.url, '_blank')
  }
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    showToastMessage('Link copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy link:', err)
    showToastMessage('Failed to copy link')
  }
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
  console.warn('Failed to load image:', target.src)
}

const showToastMessage = (message: string) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Lifecycle
onMounted(() => {
  fetchDocument()
})

// SEO
useHead({
  title: computed(() => document.value?.name || `Document ${route.params.id}`),
  meta: [
    {
      name: 'description',
      content: computed(() => `${document.value?.name || 'Document'} - ${document.value?.institution || 'Academic Institution'}`)
    }
  ]
})
</script>

<style scoped>
/* Custom styles for highlighted text */
:deep(.highlight) {
  background-color: #fef3c7;
  padding: 2px 4px;
  border-radius: 4px;
  font-weight: 500;
}

/* Smooth animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive design improvements */
@media (max-width: 640px) {
  h1 {
    font-size: 2rem;
    line-height: 2.5rem;
  }
  
  .hero-decorations {
    display: none;
  }
}

/* Glass morphism effect */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Hover animations */
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

/* Button pulse animation */
@keyframes pulse-subtle {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
  }
}

.btn-pulse:hover {
  animation: pulse-subtle 2s infinite;
}

/* Loading animation enhancement */
.loading-dots::after {
  content: '';
  animation: loading-dots 1.5s infinite;
}

@keyframes loading-dots {
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75% { content: '...'; }
  100% { content: ''; }
}

/* Text gradient */
.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced shadows */
.shadow-glow {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.shadow-glow-purple {
  box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
}

/* Animated background */
.bg-animated {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>