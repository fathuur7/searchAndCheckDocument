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
            DocuCheck
          </span>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <a @click="gotoPage()" class="text-gray-300 hover:text-blue-300 transition-all duration-300 font-medium relative group  cursor-pointer">
            Cek Pencarian
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <button class="relative group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full overflow-hidden">
            <span class="relative z-10 font-medium">Mulai Sekarang</span>
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
          </button>
        </div>
      </nav>


      <!-- Hero Section -->
       <main>
        <slot />
      </main> 


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
import { useRouter } from 'vue-router'
const router = useRouter()
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
</script>