<template>
  <section class="relative min-h-screen overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      <!-- Floating Particles -->
      <div class="absolute inset-0">
        <div 
          v-for="i in 50" 
          :key="i"
          class="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-float"
          :style="getParticleStyle(i)"
        ></div>
      </div>
      
      <!-- Gradient Orbs -->
      <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-2xl animate-pulse animation-delay-4000"></div>
    </div>

    <div class="relative z-10 container mx-auto px-6 py-8">
      <!-- Navigation -->
      <nav class="flex items-center justify-between mb-20 text-white">
        <div class="flex items-center space-x-3">
          <div class="relative group">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
          </div>
          <span class="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            DocuSearch
          </span>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <a @click="gotoPage()" class="text-gray-300 hover:text-blue-300 transition-all duration-300 font-medium relative group cursor-pointer">
            Cek Dokumen
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <button class="relative group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full overflow-hidden">
            <span class="relative z-10 font-medium">Mulai Sekarang</span>
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
          </button>
        </div>
      </nav>

      <!-- Hero Content -->
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left Content -->
        <div class="space-y-10 text-white">
          <!-- Badge -->
          <div class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm text-blue-300 rounded-full text-sm font-medium border border-blue-800/30 hover:border-blue-600/50 transition-all duration-300">
            <svg class="w-5 h-5 mr-3 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
            </svg>
            ✨ Revolusi Pencarian Dokumen Powered
          </div>

          <!-- Main Heading -->
          <div class="space-y-6">
            <h1 class="text-6xl lg:text-7xl font-black leading-tight">
              <span class="text-gray-100 block animate-fade-in-up">Analisis</span>
              <span class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block animate-fade-in-up animation-delay-300">
                Dokumen Cerdas
              </span>
              <span class="text-gray-100 block animate-fade-in-up animation-delay-600">dalam Sekejap</span>
            </h1>

            <p class="text-xl text-gray-300 leading-relaxed max-w-2xl animate-fade-in-up animation-delay-900">
              Temukan, bandingkan, dan analisis dokumen dengan kecerdasan buatan. 
              <span class="text-blue-400 font-semibold">DocuSearch</span> menggunakan teknologi 
              <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">BM25 + Elasticsearch</span> 
              untuk memberikan hasil pencarian yang akurat dan relevan.
            </p>
          </div>

          <!-- Search Section -->
          <div class="space-y-6 animate-fade-in-up animation-delay-1200">
            <div class="relative group">
              <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div class="relative flex flex-col sm:flex-row gap-4 p-2 bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-gray-700/50">
                <div class="relative flex-1">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Cari jurnal, paper"
                    class="w-full px-6 py-4 bg-transparent text-gray-200 placeholder-gray-400 font-medium focus:outline-none text-lg"
                  />
                </div>

                <button
                  @click="performSearch"
                  class="relative group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-2xl font-bold text-lg overflow-hidden"
                >
                  <span class="relative z-10 flex items-center justify-center">
                    <svg v-if="!loading" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    <svg v-else class="animate-spin w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="4" stroke-linecap="round"></path>
                    </svg>
                    Cari Sekarang
                  </span>
                  <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Content - Dashboard Preview -->
        <div class="relative animate-fade-in-left animation-delay-800">
          <!-- Main Dashboard Card -->
          <div class="relative z-10 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-700/50">
            <!-- Dashboard Header -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-3">
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div class="text-xs text-gray-400 font-mono">dashboard.docusearch.ai</div>
            </div>

            <!-- Search Results Preview -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-200">Hasil Pencarian</h3>
                <span class="text-sm text-blue-400">{{ totalDocuments.toLocaleString() }} dokumen ditemukan</span>
              </div>
              
              <!-- Results -->
              <div class="space-y-3 mb-4">
                <div 
                  v-for="(result, index) in currentPageResults" 
                  :key="result.id || index"
                  class="p-4 bg-slate-700/50 hover:bg-slate-700/70 rounded-xl border border-gray-600/30 hover:border-blue-500/50 transition-all duration-200 cursor-pointer group"
                >
                  <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="font-medium text-gray-200 text-sm group-hover:text-blue-300 transition-colors truncate">
                        {{ result.title }}
                      </h4>
                      <p class="text-xs text-gray-400 mt-1">
                        {{ result.authors }} • {{ result.update_date ? result.update_date.substring(0, 4) : 'Unknown Year' }}
                      </p>
                      <div class="flex items-center mt-2 space-x-2">
                        <span class="px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs">
                          {{ result.score < 0 || typeof result.score === 'undefined' ? 'Cari Sekarang' : (result.score)+'% match' }}
                        </span>
                        <span v-if="result.journal" class="px-2 py-1 bg-green-900/50 text-green-300 rounded text-xs">
                          {{ result.journal }}
                        </span>
                      </div>
                      <!-- add button for  view detail -->
                    </div>
                    <button
                      @click="gotoDocument(result.id)"
                      class="mt-2 text-blue-400 hover:text-blue-300 transition-colors text-xs font-medium rounded-full px-4 py-1 border border-blue-500/50 hover:border-blue-500/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-white cursor-pointer" 
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </div>

              <!-- Pagination -->
              <div v-if="totalPages > 1" class="flex items-center justify-between pt-4 border-t border-gray-600/30">
                <div class="text-xs text-gray-400">
                  Halaman {{ currentPage }} dari {{ totalPages }}
                </div>
                
                <div class="flex items-center space-x-2">
                  <!-- Previous Button -->
                  <button
                    @click="goToPage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    :class="[
                      'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200',
                      currentPage === 1 
                        ? 'bg-slate-700/30 text-gray-500 cursor-not-allowed'
                        : 'bg-slate-700/50 text-gray-300 hover:bg-blue-600/50 hover:text-white'
                    ]"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>

                  <!-- Page Numbers -->
                  <div class="flex items-center space-x-1">
                    <button
                      v-for="page in visiblePages"
                      :key="page"
                      @click="goToPage(page)"
                      :class="[
                        'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-200',
                        page === currentPage
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'bg-slate-700/50 text-gray-300 hover:bg-blue-600/30 hover:text-white'
                      ]"
                    >
                      {{ page }}
                    </button>
                  </div>

                  <!-- Next Button -->
                  <button
                    @click="goToPage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    :class="[
                      'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200',
                      currentPage === totalPages 
                        ? 'bg-slate-700/30 text-gray-500 cursor-not-allowed'
                        : 'bg-slate-700/50 text-gray-300 hover:bg-blue-600/50 hover:text-white'
                    ]"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Feature Cards -->
            <div class="grid grid-cols-2 gap-4 mt-6">
              <div class="bg-gradient-to-br from-blue-900/50 to-blue-800/30 p-4 rounded-xl border border-blue-700/30 hover:border-blue-500/50 transition-all duration-200 group cursor-pointer">
                <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-100 text-sm mb-1">Powered Search</h3>
                <p class="text-xs text-gray-300">Pencarian semantik dengan teknologi BM25 + Elasticsearch</p>
              </div>

              <div class="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-4 rounded-xl border border-purple-700/30 hover:border-purple-500/50 transition-all duration-200 group cursor-pointer">
                <div class="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-100 text-sm mb-1">Smart Analytics</h3>
                <p class="text-xs text-gray-300">Analisis mendalam dokumen akademik</p>
              </div>
            </div>
          </div>

          <!-- Floating Elements -->
          <div class="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 animate-float"></div>
          <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-15 animate-float animation-delay-2000"></div>
          <div class="absolute top-1/2 -right-4 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-25 animate-float animation-delay-4000"></div>
        </div>
      </div>

      <!-- Trusted By Section -->
      <div class="mt-32 text-center animate-fade-in-up animation-delay-1800">
        <p class="text-gray-400 font-medium mb-10 text-lg">Dipercaya oleh institusi akademik terkemuka</p>
        <div class="flex items-center justify-center space-x-16 opacity-60">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
            <span class="text-gray-400 font-semibold">Universitas Indonesia</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
            <span class="text-gray-400 font-semibold">Institut Teknologi Bandung</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg"></div>
            <span class="text-gray-400 font-semibold">Universitas Gadjah Mada</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePapers } from '@/composables/usePapers'
const { getAllPapers, getTotalDocuments } = usePapers()

// Reactive data
const searchQuery = ref('')
const totalDocuments = ref(1247) // Default value for demo
const results = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const itemsPerPage = 4

const gotoPage = () => {
  useRouter().push('/cekDokumen')
}

const gotoDocument = (id: string) => {
  useRouter().push(`/doc/${id}`)
}

// Computed properties for pagination
const totalPages = computed(() => Math.ceil(results.value.length / itemsPerPage))

const currentPageResults = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return results.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 5) {
      // Show all pages if total is 5 or less
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
      // Show smart pagination for more than 5 pages
      if (current <= 3) {
          pages.push(1, 2, 3, 4, 5)
        } else if (current >= total - 2) {
      pages.push(total - 4, total - 3, total - 2, total - 1, total)
    } else {
      pages.push(current - 2, current - 1, current, current + 1, current + 2)
    }
}
  
  return pages
})

// Generate sample data for demo
const generateSampleData = () => {
    const sampleTitles = [
    "Machine Learning Applications in Healthcare Systems",
    "Deep Learning for Natural Language Processing",
    "Artificial Intelligence in Computer Vision",
    "Blockchain Technology and Cryptocurrency",
    "Quantum Computing: Theory and Applications",
    "Internet of Things: Security and Privacy",
    "Big Data Analytics in Business Intelligence",
    "Cloud Computing Architecture and Security",
    "Cybersecurity in Modern Networks",
    "Data Mining Techniques and Applications",
    "Software Engineering Best Practices",
    "Mobile Application Development Trends",
    "Web Development with Modern Frameworks",
    "Database Management Systems Optimization",
    "Network Protocol Design and Implementation",
    "Human-Computer Interaction Principles",
    "Computer Graphics and Visualization",
    "Robotics and Autonomous Systems",
    "Bioinformatics and Computational Biology",
    "Digital Signal Processing Applications"
  ]
  
  const sampleAuthors = [
    "Dr. Ahmad Budi, Prof. Siti Nurhaliza",
    "Prof. John Smith, Dr. Maria Garcia",
    "Dr. Chen Wei, Prof. Yamamoto Hiroshi",
    "Prof. Sarah Johnson, Dr. Michael Brown",
    "Dr. Kumar Patel, Prof. Elena Rossi"
]

const sampleJournals = [
    "IEEE Computer Society",
    "ACM Computing Surveys",
    "Nature Machine Intelligence",
    "Science Robotics",
    "Communications of the ACM"
  ]
  
  const data = []
  for (let i = 1; i <= 20; i++) {
      data.push({
      id: i,
      title: sampleTitles[Math.floor(Math.random() * sampleTitles.length)],
      authors: sampleAuthors[Math.floor(Math.random() * sampleAuthors.length)],
      update_date: `202${Math.floor(Math.random() * 4)}-0${Math.floor(Math.random() * 9 + 1)}-15`,
      score: Math.floor(Math.random() * 40 + 60),
      journal: sampleJournals[Math.floor(Math.random() * sampleJournals.length)]
    })
  }
  return data
}

// Pagination functions
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Fetch total document count & papers
onMounted(async () => {
  loading.value = true

  try {
    // Try to fetch real data, fallback to sample data
    if (typeof getTotalDocuments === 'function') {
      const total = await getTotalDocuments()
      totalDocuments.value = (total.data.value as { totalDocuments?: number })?.totalDocuments || 1247
      
      const papers = await getAllPapers(1, 20) // Fetch more for pagination demo
      results.value = (papers.data.value as { results?: any[] })?.results || generateSampleData()
    } else {
      // Use sample data for demo
      results.value = generateSampleData()
    }
  } catch (e) {
      console.error('Failed to load data:', e)
      // Fallback to sample data
      results.value = generateSampleData()
    } finally {
        loading.value = false
  }
})

// Search logic
const performSearch = async () => {
  if (!searchQuery.value.trim()) return

  loading.value = true
  currentPage.value = 1 // Reset to first page on new search
  
  try {
    if (typeof usePapers === 'function') {
      const { data } = await usePapers().searchPapers(searchQuery.value, 20)
      results.value = (data.value && typeof data.value === 'object' && 'results' in data.value)
      ? (data.value as { results: any[] }).results
        : generateSampleData()
    } else {
      // Filter sample data for demo
      const sampleData = generateSampleData()
      results.value = sampleData.filter(item => 
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }
  } catch (error) {
    console.error('Search failed:', error)
    results.value = generateSampleData()
  } finally {
    loading.value = false
  }
}

const getParticleStyle = (index: number) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 5
  const duration = 3 + Math.random() * 4
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}
definePageMeta({
    title: 'DocuSearch - Pencarian Dokumen Cerdas',
    description: 'DocuSearch adalah platform pencarian dokumen cerdas yang menggunakan teknologi BM25 dan Elasticsearch untuk memberikan hasil pencarian yang akurat dan relevan. Pencarian dokumen yang lebih cerdas dan lebih cepat.'
})
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% { 
      transform: translateY(0px); 
  }
  50% { 
      transform: translateY(-20px); 
    }
}

@keyframes fade-in-up {
    from {
    opacity: 0;
    transform: translateY(30px);
}
to {
    opacity: 1;
    transform: translateY(0);
}
}

@keyframes fade-in-left {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-left {
  animation: fade-in-left 0.8s ease-out forwards;
  opacity: 0;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

.animation-delay-900 {
  animation-delay: 0.9s;
}

.animation-delay-1200 {
  animation-delay: 1.2s;
}

.animation-delay-1500 {
  animation-delay: 1.5s;
}

.animation-delay-1800 {
  animation-delay: 1.8s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.3);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}
</style>