const getTotalBooksCount= (books) =>{
  return books.length
}

const getTotalAccountsCount = (accounts) => {
  return accounts.length
}

const getBooksBorrowedCount = (books) => {
  return books.reduce((acc, book)=>{
    const firstTransaction = book.borrows[0];
    if(!firstTransaction.returned){
      return acc +1
    }
    return acc;
    
  }, 0);
}


const getMostCommonGenres = (books) => {
  const countGenres = (acc, book)=> {
    if (acc[book.genre]) {
      acc[book.genre]++;
    } else {
      acc[book.genre]= 1;
    }
    return acc;
  }
  const genreCount = books.reduce(countGenres, {});
  sortGenres = (a,b) => {
    return genreCount[b] - genreCount[a]
  };
  const sortedGenres = Object.keys(genreCount).sort(sortGenres);
  const getGenreNameAndCount = (genre) =>{
    return {name:genre, count: genreCount[genre]}
  };
const genreNameAndCount = sortedGenres.map(getGenreNameAndCount);
  return genreNameAndCount.splice(0,5)
}


const getMostPopularBooks = (books) =>{
  let popularBooks = [];
  const borrows = books.reduce((acc, book) => {
    popularBooks.push({ name: book.title, count: book.borrows.length });
  }, []);

  return topFive(popularBooks);
}


//Helper Function
const topFive = (array) =>{
  let popularBooks = array.sort((countA, countB) => (countA.count < countB.count ? 1 : -1)).slice(0, 5);
  return popularBooks;
}

 const getMostPopularAuthors = (books, authors) => {
  const authorWithBorrows = authors.map((author) =>{
    const count = books.reduce((acc, book) =>{
      if (book.authorId === author.id) {
        return acc + book.borrows.length;
      } else {
        return acc;
      }
    }, 0);
    return { name: `${author.name.first} ${author.name.last}`, count: count };
  });
  const sortedAuthors = authorWithBorrows.sort((a, b) => b.count - a.count);
  return topFive(sortedAuthors);
}
  
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
