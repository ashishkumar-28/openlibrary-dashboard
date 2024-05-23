import axios from 'axios';

const BASE_URL = 'https://openlibrary.org';

export const fetchBooks = async (page, limit) => {
  const response = await axios.get(`${BASE_URL}/subjects/science_fiction.json`, {
    params: { page, limit },
  });

  return {
    books: response.data.works.map(book => ({
      title: book.title,
      author_name: book.authors[0]?.name || 'Unknown',
      first_publish_year: book.first_publish_year || 'N/A',
      subject: book.subject?.join(', ') || 'N/A',
      ratings_average: book.ratings_average || 'N/A',
      author_birth_date: book.authors[0]?.birth_date || 'N/A',
      author_top_work: book.authors[0]?.top_work || 'N/A',
    })),
    total: response.data.work_count, 
  };
};
