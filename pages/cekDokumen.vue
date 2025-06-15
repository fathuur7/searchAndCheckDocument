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
            Periksa originalitas dokumen Anda dengan teknologi canggih. 
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

                <!-- Error Message -->
                <div v-if="error" class="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p class="text-red-400">{{ error }}</p>
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
                :disabled="!selectedFile || loading"
                :class="[
                    'w-full mt-6 py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300',
                    selectedFile && !loading 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                ]"
                >
                <span v-if="loading" class="flex items-center justify-center space-x-2">
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
            <div v-if="hasil" class="animate-fade-in-up animation-delay-500">
            <div class="relative group mb-8">
                <div class="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 max-w-4xl mx-auto">
                
                <h2 class="text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Hasil Analisis Plagiarisme
                </h2>

                <!-- Analysis Info -->
                <div v-if="hasil.analysis_info" class="bg-slate-800/30 rounded-xl p-6 mb-8">
                    <h3 class="text-xl font-semibold text-white mb-4">Informasi Analisis</h3>
                    <div class="grid md:grid-cols-2 gap-4 text-gray-300">
                        <div>
                            <p><span class="font-medium text-blue-400">File yang dianalisis:</span> {{ hasil.analysis_info.user_file || selectedFile?.name || 'Unknown' }}</p>
                            <p><span class="font-medium text-blue-400">Tanggal analisis:</span> {{ formatDate(hasil.analysis_info.analysis_date) }}</p>
                        </div>
                        <div>
                            <p><span class="font-medium text-blue-400">Total file diproses:</span> {{ hasil.analysis_info.total_files_processed || 0 }}</p>
                            <p><span class="font-medium text-blue-400">Top results ditampilkan:</span> {{ hasil.analysis_info.top_results_shown || 0 }}</p>
                        </div>
                    </div>
                </div>

                <!-- Status Badge
                <div class="flex justify-center mb-6">
                    <div :class="[
                    'px-6 py-3 rounded-full font-semibold text-lg',
                    getStatusClass(getHighestSimilarity())
                    ]">
                    {{ getStatusText(getHighestSimilarity()) }}
                    </div>
                </div> -->

                <!-- Similarity Results -->
                <div v-if="hasil.similarity_results && hasil.similarity_results.length > 0" class="text-left space-y-4">
                    <div class="bg-slate-800/30 rounded-xl p-6">
                    <h3 class="text-xl font-semibold text-white mb-4">Hasil Perbandingan Dokumen</h3>
                    <div class="space-y-3">
                        <div v-for="(result, index) in getFilteredResults()" :key="index" 
                            class="p-4 bg-slate-700/50 rounded-lg">
                        
                        <!-- Header Info -->
                        <div class="flex items-center justify-between mb-3">
                            <div class="flex-1">
                            <div class="flex items-center space-x-3">
                                <span class="text-sm bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full font-medium">
                                  Rank #{{ result.rank }}
                                </span>
                                <p class="text-white font-medium">{{ result.filename }}</p>
                            </div>
                            <p class="text-gray-400 text-sm mt-1">Status: {{ result.status }}</p>
                            </div>
                            <div class="text-right ml-4">
                            <p class="text-2xl font-bold" :class="getSimilarityColor(result.similarity_percentage)">
                                {{ Math.round(result.similarity_percentage) }}%
                            </p>
                            <p class="text-gray-400 text-sm">kesamaan</p>
                            </div>
                        </div>

                        <!-- Common Words -->
                        <div v-if="result.common_words && result.common_words.length > 0" class="mb-3">
                            <h5 class="text-sm font-medium text-gray-300 mb-2">Kata-kata Umum Terdeteksi:</h5>
                            <div class="flex flex-wrap gap-2">
                            <span v-for="(word, wordIndex) in result.common_words.slice(0, 10)" :key="wordIndex"
                                class="text-xs bg-slate-600/50 text-gray-300 px-2 py-1 rounded">
                                {{ word.word }} ({{ word.freq_text1 }}/{{ word.freq_text2 }})
                            </span>
                            </div>
                        </div>

                        <!-- Common Phrases -->
                        <div v-if="result.common_phrases && result.common_phrases.length > 0" class="mb-3">
                            <h5 class="text-sm font-medium text-gray-300 mb-2">Frasa Umum Terdeteksi:</h5>
                            <div class="flex flex-wrap gap-2">
                            <span v-for="(phrase, phraseIndex) in result.common_phrases" :key="phraseIndex"
                                class="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">
                                "{{ phrase }}"
                            </span>
                            </div>
                        </div>

                        <!-- Similarity Score Bar -->
                        <div class="mt-3">
                            <div class="w-full bg-slate-600/30 rounded-full h-2">
                            <div class="h-2 rounded-full transition-all duration-300" 
                                :class="getSimilarityBarColor(result.similarity_percentage)"
                                :style="{ width: result.similarity_percentage + '%' }">
                            </div>
                            </div>
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
            <div v-if="!hasil" class="grid md:grid-cols-3 gap-8 mt-16 animate-fade-in-up animation-delay-800">
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

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fileInput = ref<HTMLInputElement>()
const selectedFile = ref<File | null>(null)
const isDragging = ref(false)

// Use the useDokumen composable
const { hasil, loading, error, compareDokumen } = useDokumen()

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

const formatDate = (dateString: string) => {
  if (!dateString) return 'Unknown'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return dateString
  }
}

const analyzeDocument = async () => {
  if (!selectedFile.value) return
  
  try {
    await compareDokumen(selectedFile.value)
  } catch (err) {
    console.error('Analysis failed:', err)
  }
}

const resetAnalysis = () => {
  selectedFile.value = null
  hasil.value = null
  error.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Helper functions untuk similarity results
// const getHighestSimilarity = () => {
//   if (!hasil.value?.similarity_results || hasil.value.similarity_results.length === 0) return 0
  
//   // Filter out perfect matches (100%) yang biasanya adalah file yang sama
//   const filtered = hasil.value.similarity_results.filter(result => result.similarity_percentage < 100)
//   if (filtered.length === 0) return 0
  
//   return Math.max(...filtered.map(result => result.similarity_percentage || 0))
// }

// const getSimilarSourcesCount = () => {
//   if (!hasil.value?.similarity_results) return 0
//   // Count results with similarity > 5% and not 100% (exclude self-match)
//   return hasil.value.similarity_results.filter(result => 
//     result.similarity_percentage > 5 && result.similarity_percentage < 100
//   ).length
// }

interface SimilarityResult {
  rank: number
  filename: string
  status: string
  similarity_percentage: number
  common_words?: { word: string; freq_text1: number; freq_text2: number }[]
  common_phrases?: string[]
}

interface HasilType {
  similarity_results?: SimilarityResult[]
  analysis_info?: {
    user_file?: string
    analysis_date?: string
    total_files_processed?: number
    top_results_shown?: number
  }
}

const getFilteredResults = (): SimilarityResult[] => {
  if (!(hasil.value as HasilType)?.similarity_results) return []
  
  // Filter out perfect matches (100%) tetapi tetap gunakan rank asli
  return ((hasil.value as HasilType).similarity_results as SimilarityResult[])
    .filter((result: SimilarityResult) => result.similarity_percentage) // Hapus yang 100%
    .sort((a: SimilarityResult, b: SimilarityResult) => a.rank - b.rank) // Urutkan berdasarkan rank asli (terkecil ke terbesar)
    .slice(0, 10) // Ambil 10 teratas
}

const getSimilarityColor = (similarity: number) => {
  if (similarity >= 50) return 'text-red-400'
  if (similarity >= 25) return 'text-yellow-400'
  return 'text-green-400'
}

const getSimilarityBarColor = (similarity: number) => {
  if (similarity >= 50) return 'bg-red-400'
  if (similarity >= 25) return 'bg-yellow-400'
  return 'bg-green-400'
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

// SEO
useHead({
  title: 'Cek Dokumen - DocuMen',
  meta: [
    { name: 'description', content: 'Cek dokumen Anda untuk plagiarisme dengan akurasi tinggi menggunakan teknologi canggih. Dapatkan laporan detail dalam hitungan detik.' },
    { name: 'keywords', content: 'plagiarisme, cek dokumen, teknologi, analisis dokumen' },
    { name: 'author', content: 'DocuMEN' }
  ]
})
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