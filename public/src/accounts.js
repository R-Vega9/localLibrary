const findAccountById = (accounts, id) =>{
 return accounts.find((account =>{
  return account.id ===id
 }))
}

const sortAccountsByLastName = (accounts) =>{
  return accounts.sort((a,b) =>{
    return a.name.last > b.name.last ? 1: -1
  })
}

// return num that represents # of times account ID appers in books' borrow 
const getTotalNumberOfBorrows = (account, books) => {
  //call reduce method on books
  return books.reduce((acc, book)=>{
    //filter through books and find how many times you find the account id inside of books.
    //call length on the array to find the total number of times and add it to acc. 
    const borrowedBooks = book.borrows.filter((borrow) => borrow.id === account.id).length
    return acc + borrowedBooks;
  }, 0)
}

// we want to look inside of books and grab all books that are checked out by matching id of account and then return the book with authors info.
const getBooksPossessedByAccount = (account, books, authors) => {
  const borrowedBook = books.filter((book) =>{
    return book.borrows.some((borrow)=>{
      return borrow.id === account.id && borrow.returned === false
    })
  });
// return book that also contains authors info 
  const bookWithAuthor = borrowedBook.map((book) =>{
    const author = authors.find((author) =>{
      return author.id === book.authorId
    })
    return {...book, author}
  })
  return bookWithAuthor;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
