<template>
    <main class="text-center text-white">
        <!-- Hero Content -->
        <div class="max-w-5xl mx-auto mb-16 animate-fade-in-up">
            <h1 class="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Deteksi Plagiarisme
            </span>
            <br />
            <span class="text-white">dengan Akurasi Tinggi</span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Periksa originalitas dokumen Anda dengan teknologi AI canggih. 
            Dapatkan laporan detail tingkat kesamaan dan sumber referensi dalam hitungan detik.
            </p>
            
            <!-- Upload Section -->
            <div class="relative group mb-12">
            <div class="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 max-w-2xl mx-auto">
                
                <!-- File Upload Area -->
                <div 
                @click="triggerFileUpload"
                @dragover="handleDragOver"
                @drop="handleFileDrop"
                :class="[
                    'border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-300',
                    isDragging ? 'border-blue-400 bg-blue-500/10' : 'border-slate-600 hover:border-blue-400 hover:bg-blue-500/5'
                ]"
                >
                <input 
                    ref="fileInput"
                    type="file" 
                    @change="handleFileSelect"
                    accept=".pdf,.doc,.docx,.txt"
                    class="hidden"
                >
                
                <div class="text-center">
                    <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                    </div>
                    <h3 class="text-lg font-semibold mb-2 text-white">Upload Dokumen Anda</h3>
                    <p class="text-gray-400 mb-4">Drag & drop file atau klik untuk memilih</p>
                    <p class="text-sm text-gray-500">Mendukung PDF, DOC, DOCX, TXT (Maks. 10MB)</p>
                </div>
                </div>

                <!-- Selected File Display -->
                <div v-if="selectedFile" class="mt-6 p-4 bg-slate-800/50 rounded-xl">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                    </div>
                    <div>
                        <p class="text-white font-medium">{{ selectedFile.name }}</p>
                        <p class="text-gray-400 text-sm">{{ formatFileSize(selectedFile.size) }}</p>
                    </div>
                    </div>
                    <button @click="removeFile" class="text-gray-400 hover:text-red-400 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    </button>
                </div>
                </div>

                <!-- Analyze Button -->
                <button 
                @click="analyzeDocument"
                :disabled="!selectedFile || isAnalyzing"
                :class="[
                    'w-full mt-6 py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300',
                    selectedFile && !isAnalyzing 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                ]"
                >
                <span v-if="isAnalyzing" class="flex items-center justify-center space-x-2">
                    <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Menganalisis Dokumen...</span>
                </span>
                <span v-else>{{ selectedFile ? 'Mulai Analisis Plagiarisme' : 'Pilih File Terlebih Dahulu' }}</span>
                </button>
            </div>
            </div>

            <!-- Results Section -->
            <div v-if="showResults" class="animate-fade-in-up animation-delay-500">
            <div class="relative group mb-8">
                <!-- <div class="absolute -inset-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-20"></div> -->
                <div class="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 max-w-4xl mx-auto">
                
                <h2 class="text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Hasil Analisis Plagiarisme
                </h2>

                <!-- Similarity Score -->
                <div class="grid md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-slate-800/50 rounded-xl p-6 text-center">
                    <div class="text-4xl font-bold mb-2" :class="getSimilarityColor(results.similarity)">
                        {{ results.similarity }}%
                    </div>
                    <p class="text-gray-400">Tingkat Kesamaan</p>
                    </div>
                    <div class="bg-slate-800/50 rounded-xl p-6 text-center">
                    <div class="text-4xl font-bold text-blue-400 mb-2">{{ results.sources }}</div>
                    <p class="text-gray-400">Sumber Ditemukan</p>
                    </div>
                    <div class="bg-slate-800/50 rounded-xl p-6 text-center">
                    <div class="text-4xl font-bold text-purple-400 mb-2">{{ results.originalityScore }}%</div>
                    <p class="text-gray-400">Skor Originalitas</p>
                    </div>
                </div>

                <!-- Status Badge -->
                <div class="flex justify-center mb-6">
                    <div :class="[
                    'px-6 py-3 rounded-full font-semibold text-lg',
                    getStatusClass(results.similarity)
                    ]">
                    {{ getStatusText(results.similarity) }}
                    </div>
                </div>

                <!-- Detailed Results -->
                <div class="text-left space-y-4">
                    <div class="bg-slate-800/30 rounded-xl p-6">
                    <h3 class="text-xl font-semibold text-white mb-4">Ringkasan Analisis</h3>
                    <div class="grid md:grid-cols-2 gap-4 text-gray-300">
                        <div>
                        <p><span class="font-medium text-blue-400">Kata yang dianalisis:</span> {{ results.totalWords }}</p>
                        <p><span class="font-medium text-blue-400">Paragraf yang cocok:</span> {{ results.matchedParagraphs }}</p>
                        </div>
                        <div>
                        <p><span class="font-medium text-blue-400">Waktu analisis:</span> {{ results.analysisTime }}</p>
                        <p><span class="font-medium text-blue-400">Database yang diperiksa:</span> {{ results.databasesChecked }}</p>
                        </div>
                    </div>
                    </div>

                    <div class="bg-slate-800/30 rounded-xl p-6">
                    <h3 class="text-xl font-semibold text-white mb-4">Sumber Kesamaan Terdeteksi</h3>
                    <div class="space-y-3">
                        <div v-for="source in results.detectedSources" :key="source.id" 
                            class="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                        <div>
                            <p class="text-white font-medium">{{ source.title }}</p>
                            <p class="text-gray-400 text-sm">{{ source.url }}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-lg font-bold" :class="getSimilarityColor(source.similarity)">
                            {{ source.similarity }}%
                            </p>
                            <p class="text-gray-400 text-sm">kesamaan</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 mt-8">
                    <button class="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg">
                    Download Laporan PDF
                    </button>
                    <button @click="resetAnalysis" class="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300">
                    Analisis Dokumen Baru
                    </button>
                </div>
                </div>
            </div>
            </div>

            <!-- Feature Highlights -->
            <div v-if="!showResults" class="grid md:grid-cols-3 gap-8 mt-16 animate-fade-in-up animation-delay-800">
            <div class="bg-slate-900/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-900/50 transition-all duration-300 group">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2">Akurasi Tinggi</h3>
                <p class="text-gray-400">Teknologi tf-idf + cosine similarity memberikan analisis terdepan dengan tingkat akurasi deteksi hingga 99.9%</p>
            </div>

            <div class="bg-slate-900/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-900/50 transition-all duration-300 group">
                <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2">Analisis Cepat</h3>
                <p class="text-gray-400">Hasil analisis komprehensif dalam hitungan menit, bukan jam</p>
            </div>

            <div class="bg-slate-900/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-900/50 transition-all duration-300 group">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2">Aman & Privat</h3>
                <p class="text-gray-400">Dokumen Anda dienkripsi dan tidak disimpan setelah analisis</p>
            </div>
            </div>
        </div>
        </main>
</template>
<script setup lang="ts">
    definePageMeta({
        layout: 'global',
    })

import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fileInput = ref<HTMLInputElement>()
const selectedFile = ref<File | null>(null)
const isDragging = ref(false)
const isAnalyzing = ref(false)
const showResults = ref(false)

// Sample results data
const results = reactive({
  similarity: 23,
  sources: 8,
  originalityScore: 77,
  totalWords: 2847,
  matchedParagraphs: 12,
  analysisTime: '3.2 detik',
  databasesChecked: '50M+ dokumen',
  detectedSources: [
    {
      id: 1,
      title: 'Jurnal Penelitian Teknologi Informasi',
      url: 'journal.example.com/article-123',
      similarity: 15
    },
    {
      id: 2,
      title: 'Wikipedia - Artificial Intelligence',
      url: 'wikipedia.org/wiki/artificial-intelligence',
      similarity: 8
    },
    {
      id: 3,
      title: 'ResearchGate Publication',
      url: 'researchgate.net/publication/12345',
      similarity: 12
    }
  ]
})

const gotoPage = () => {
  router.push('/')
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

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = true
}

const handleFileDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false
  
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    selectedFile.value = event.dataTransfer.files[0]
  }
}

const removeFile = () => {
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const analyzeDocument = async () => {
  if (!selectedFile.value) return
  
  isAnalyzing.value = true
  
  // Simulate analysis process
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  isAnalyzing.value = false
  showResults.value = true
}

const resetAnalysis = () => {
  selectedFile.value = null
  showResults.value = false
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const getSimilarityColor = (similarity: number) => {
  if (similarity >= 50) return 'text-red-400'
  if (similarity >= 25) return 'text-yellow-400'
  return 'text-green-400'
}

const getStatusClass = (similarity: number) => {
  if (similarity >= 50) return 'bg-red-500/20 text-red-400 border border-red-500/30'
  if (similarity >= 25) return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
  return 'bg-green-500/20 text-green-400 border border-green-500/30'
}

const getStatusText = (similarity: number) => {
  if (similarity >= 50) return 'Terdeteksi Plagiarisme Tinggi'
  if (similarity >= 25) return 'Peringatan Kesamaan Sedang'
  return 'Dokumen Original'
}
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

.animation-delay-800 {
  animation-delay: 0.8s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>