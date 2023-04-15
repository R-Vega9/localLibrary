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
  const genreCount = books.reduce((acc, book)=>{
    if (acc[book.genre]) {
      acc[book.genre]++;
    } else{
      acc[book.genre] = 1;
    }
    return acc;
  },{});
  const sortedGenres = Object.keys(genreCount);
  sortedGenres.sort((a,b) =>{
    return genreCount[b] - genreCount[a]
  });
  const genreNameAndCount = sortedGenres.map((genre)=>{
    return ({name:genre, count: genreCount[genre]})
  });
  return genreNameAndCount.splice(0,5)
}

const getMostPopularBooks = (books) => {

  return books.map((book) => {
    return {name: book.title, count: book.borrows.length}
   })
   .sort((a, b) => (a.count < b.count ? 1 : -1))
   .slice(0, 5)
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
  return sortedAuthors.slice(0, 5);
}
  
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
