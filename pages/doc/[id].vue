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
        <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div class="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 px-8 py-12 text-white relative overflow-hidden">
            <!-- Decorative Elements -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div class="relative z-10">
              <!-- Document ID Badge -->
              <div class="flex items-center justify-between mb-6">
                <span class="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  arXiv:{{ $route.params.id }}
                </span>
                
                <!-- Quick Actions -->
                <div class="flex space-x-3">
                  <button 
                    @click="downloadPDF"
                    class="inline-flex items-center bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30 transition-all duration-300 transform hover:scale-105"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    PDF
                  </button>
                  <button 
                    @click="copyLink"
                    class="inline-flex items-center bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30 transition-all duration-300 transform hover:scale-105"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                    </svg>
                    Share
                  </button>
                </div>
              </div>
              
              <!-- Title -->
              <h1 class="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white">
                {{ document.title }}
              </h1>
              
              <!-- Authors -->
              <div v-if="document.authors" class="mb-6">
                <div class="flex flex-wrap gap-3">
                  <div class="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      <span class="text-sm font-medium">{{ document.authors }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Submitter -->
              <div v-if="document.submitter" class="text-white/80 text-sm">
                <span class="inline-flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                  Submitted by: {{ document.submitter }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Sections -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Abstract -->
            <div v-if="document.abstract" class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                <h2 class="text-xl font-bold text-gray-900 flex items-center">
                  <div class="bg-blue-100 rounded-lg p-2 mr-3">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  Abstract
                </h2>
              </div>
              <div class="p-6">
                <p class="text-gray-700 leading-relaxed text-lg">{{ document.abstract }}</p>
              </div>
            </div>

            <!-- Highlights -->
            <div v-if="document.highlight && Object.keys(document.highlight).length > 0" class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div class="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-4 border-b border-gray-100">
                <h2 class="text-xl font-bold text-gray-900 flex items-center">
                  <div class="bg-yellow-100 rounded-lg p-2 mr-3">
                    <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                  </div>
                  Key Highlights
                </h2>
              </div>
              <div class="p-6">
                <div v-for="(highlights, field) in document.highlight" :key="field" class="mb-6 last:mb-0">
                  <h3 class="font-semibold text-gray-900 capitalize mb-3 text-sm uppercase tracking-wide">{{ field }}:</h3>
                  <div class="space-y-3">
                    <div 
                      v-for="(highlight, index) in highlights" 
                      :key="index"
                      class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg"
                    >
                      <p class="text-gray-700" v-html="highlight"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Download Actions -->
            <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
                <h3 class="font-bold text-gray-900 flex items-center">
                  <div class="bg-green-100 rounded-lg p-2 mr-3">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  Download Options
                </h3>
              </div>
              <div class="p-6 space-y-4">
                <button 
                  @click="downloadPDF"
                  class="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Download PDF
                </button>
                
                <button 
                  @click="viewOnArxiv"
                  class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  View on arXiv
                </button>
              </div>
            </div>

            <!-- Document Information -->
            <div class="space-y-4">
              <!-- Journal Information -->
              <div v-if="document.journal" class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div class="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                  <h3 class="font-bold text-gray-900 flex items-center">
                    <div class="bg-purple-100 rounded-lg p-2 mr-3">
                      <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                      </svg>
                    </div>
                    Journal Reference
                  </h3>
                </div>
                <div class="p-6">
                  <p class="text-gray-800 font-medium">{{ document.journal }}</p>
                </div>
              </div>

              <!-- Update Date -->
              <div v-if="document.update_date" class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div class="bg-gradient-to-r from-teal-50 to-cyan-50 px-6 py-4 border-b border-gray-100">
                  <h3 class="font-bold text-gray-900 flex items-center">
                    <div class="bg-teal-100 rounded-lg p-2 mr-3">
                      <svg class="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    Last Updated
                  </h3>
                </div>
                <div class="p-6">
                  <p class="text-gray-800 font-medium">{{ formatDate(document.update_date) }}</p>
                </div>
              </div>

              <!-- DOI -->
              <div v-if="document.doi" class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div class="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4 border-b border-gray-100">
                  <h3 class="font-bold text-gray-900 flex items-center">
                    <div class="bg-orange-100 rounded-lg p-2 mr-3">
                      <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                      </svg>
                    </div>
                    DOI Reference
                  </h3>
                </div>
                <div class="p-6">
                  <a 
                    :href="document.doi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-blue-600 hover:text-blue-800 font-medium underline decoration-2 underline-offset-2 hover:decoration-blue-800 transition-colors"
                  >
                    View DOI Link
                  </a>
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
  id: string
  title: string
  abstract: string
  authors: string
  submitter?: string
  doi?: string | null
  update_date: string
  journal?: string
  highlight?: Record<string, string[]>
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

// Computed properties
const arxivId = computed(() => route.params.id as string)
const arxivUrl = computed(() => `https://arxiv.org/abs/${arxivId.value}`)
const pdfUrl = computed(() => `https://arxiv.org/pdf/${arxivId.value}.pdf`)

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
      document.value = response.data.value
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

const downloadPDF = () => {
  window.open(pdfUrl.value, '_blank')
  showToastMessage('Download started!')
}

const viewOnArxiv = () => {
  window.open(arxivUrl.value, '_blank')
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

const showToastMessage = (message: string) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

// Lifecycle
onMounted(() => {
  fetchDocument()
})

// SEO
useHead({
  title: computed(() => document.value?.title || `arXiv:${route.params.id}`),
  meta: [
    {
      name: 'description',
      content: computed(() => document.value?.abstract || 'Academic paper from arXiv')
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