async function fetchBooks(page, pageSize) {
    try {
      const response = await fetch(`https://anapioficeandfire.com/api/books?page=${page}&pageSize=${pageSize}`);
      const books = await response.json();
      return books;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }
  
  function displayBooks(books) {
    const booksContainer = document.getElementById('booksContainer');
    booksContainer.innerHTML = ''; 
  
    books.forEach((book) => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');
  
      
        const titleHeading = document.createElement('h2');
        titleHeading.textContent = book.name;

        const isbnParagraph = document.createElement('p');
        isbnParagraph.textContent = `ISBN: ${book.isbn}`;

        const pagesParagraph = document.createElement('p');
        pagesParagraph.textContent = `Pages: ${book.numberOfPages}`;

        const authorsParagraph = document.createElement('p');
        authorsParagraph.textContent = `Authors: ${book.authors.join(', ')}`;

        const publisherParagraph = document.createElement('p');
        publisherParagraph.textContent = `Publisher: ${book.publisher}`;

        const releaseDateParagraph = document.createElement('p');
        releaseDateParagraph.textContent = `Released Date: ${book.released}`;

        const charactersli = document.createElement('p');
        charactersli.textContent = `Characters: ${book.characters.slice(0, 5).join(', ')}`;

        bookDiv.appendChild(titleHeading);
        bookDiv.appendChild(isbnParagraph);
        bookDiv.appendChild(pagesParagraph);
        bookDiv.appendChild(authorsParagraph);
        bookDiv.appendChild(publisherParagraph);
        bookDiv.appendChild(releaseDateParagraph);
        bookDiv.appendChild(charactersli);
    
        booksContainer.appendChild(bookDiv);
    });
  }
  
  
  function calculateTotalPages(totalBooks, booksPerPage) {
    return Math.ceil(totalBooks / booksPerPage);
  }
  
  
  function displayPagination(totalPages, currentPage) {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = ''; 
  
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      if (i === currentPage) {
        button.classList.add('active');
      }
  
      button.addEventListener('click', () => {
        navigateToPage(i);
      });
  
      paginationContainer.appendChild(button);
    }
  }
  
  
  async function navigateToPage(page) {
    const booksPerPage = 10;
    const books = await fetchBooks(page, booksPerPage);
    displayBooks(books);
    displayPagination(totalPages, page);
  }

  
function filterBooks(books, searchText) {
    return books.filter((book) => {
      const bookName = book.name.toLowerCase();
      const searchQuery = searchText.toLowerCase();
      return bookName.includes(searchQuery);
    });
  }
  
  
  async function initializePage() {
    const booksPerPage = 10;
    const initialPage = 1;
  
    const initialBooks = await fetchBooks(initialPage, booksPerPage);
    const totalBooks = 20; 
    const totalPages = calculateTotalPages(totalBooks, booksPerPage);
  
    displayBooks(initialBooks);
    displayPagination(totalPages, initialPage);
  
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
      const searchText = searchInput.value;
      const filteredBooks = filterBooks(initialBooks, searchText);
    displayBooks(filteredBooks);
    displayPagination(totalPages, initialPage);
  });
}

initializePage();
  