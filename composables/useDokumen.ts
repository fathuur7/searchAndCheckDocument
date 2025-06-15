export const useDokumen = () => {
  const hasil = ref<any>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const compareDokumen = async (file: File) => {
    error.value = null
    hasil.value = null
    loading.value = true

    try {
      const formData = new FormData()
      formData.append('file', file)

      const { data, error: fetchError } = await useFetch('http://localhost:5000/compare', {
        method: 'POST',
        body: formData,
        headers: {
          // Tidak perlu set Content-Type, karena FormData akan otomatis diatur
        }
      })

      if (fetchError.value) {
        throw new Error(fetchError.value?.data?.error || 'Gagal membandingkan dokumen')
      }

      hasil.value = data.value
    } catch (err: any) {
      error.value = err.message || 'Terjadi kesalahan'
    } finally {
      loading.value = false
    }
  }

  return {
    hasil,
    loading,
    error,
    compareDokumen,
  }
}
