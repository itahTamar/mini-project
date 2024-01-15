import axios from "axios";

const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchBooksForLetter = async (letter:any) => {
    try {
      const apiUrl = 'https://www.googleapis.com/books/v1/volumes';
      const params = {
        q: letter,
        maxResults: 20,
        source: 'webstore_bookcard',
      };
  
      let response;
      let attempt = 1;
      const maxAttempts = 5;
  
      do {
        if (attempt > 1) {
          const delayTime = Math.pow(2, attempt - 1) * 1000;
          await delay(delayTime);
        }
  
        response = await axios.get(apiUrl, { params });
        attempt++;
      } while (response.status === 429 && attempt <= maxAttempts);
  
      return response.data.items;
    } catch (error) {
      console.error(`Error`);
      return [];
    }
  };
  
  const fetchBooksForAlphabet = async () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  
    const allBooks = [];
  
    for (const letter of alphabet) {
      const booksForLetter = await fetchBooksForLetter(letter);
      allBooks.push(...booksForLetter);
      if (allBooks.length >= 160) {
        break; // Stop fetching more books
      }
    }
  
    return allBooks;
  };
  
  // Call the function to fetch books for each letter in the alphabet
  fetchBooksForAlphabet()
    .then(allBooks => {
    })
    .catch(error => {
      console.error('Error fetching books for the alphabet', error);
    });