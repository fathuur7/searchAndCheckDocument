import { useFetch } from '#app'

const API_BASE = 'http://localhost:4000'; // Sesuaikan jika berbeda (misal: 'http://localhost:3001/api')

export function usePapers() {
  const getAllPapers = async (page = 1, limit = 10) => {
    const { data, error, pending } = await useFetch(`${API_BASE}/getPapers`, {
      query: { page, limit }
    });
    return { data, error, pending };
  };

  const getAllArtikels = async (page = 1, limit = 10) => {
    const { data, error, pending } = await useFetch(`${API_BASE}/getAllArtikel`, {
      query: { page, limit }
    });
    return { data, error, pending };
  };


  const searchJurnal = async (query: string , limit = 4) => {
    const { data, error, pending } = await useFetch(`${API_BASE}/search`, {
      query: { q: query }
    });
    return { data, error, pending };
  };

  const searchArtikel = async (query: string , limit = 4) => {
    const { data, error, pending } = await useFetch(`${API_BASE}/searchArticles`, {
      query: { q: query }
    });
    return { data, error, pending };
  };

  const getPaperDetail = async (id: string) => {
    const { data, error, pending } = await useFetch(`${API_BASE}/detail/${id}`);
    return { data, error, pending };
  };

  const getTotalDocuments = async () => {
    const { data, error, pending } = await useFetch(`${API_BASE}/dokumen`);
    return { data, error, pending };
  };

  return {
    getAllPapers,
    searchJurnal,
    searchArtikel,
    getPaperDetail,
    getAllArtikels,
    getTotalDocuments
  };
}
