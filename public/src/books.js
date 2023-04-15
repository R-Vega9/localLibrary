const findAuthorById = (authors, id)=> {
  return authors.find((author) =>{
    return author.id === id
  })
}

const findBookById = (books, id) =>{
   return books.find((book)=>{
    return book.id === id
   })
}

const partitionBooksByBorrowedStatus = (books) =>{
  const checkedOut = books.filter((book)=>{
    return book.borrows.some((borrow)=>{
      return borrow.returned === false
    })
  })
  const booksReturned = books.filter((book)=>{
    return book.borrows.every((borrow) =>{
      return borrow.returned === true
    })
  })
  const combined = [[...checkedOut], [...booksReturned]];
  return combined; 
}
// create function that takes in book and returns the last 10 peoples information that have checked out the book
const getBorrowersForBook = (book, accounts) =>{
  // loop through all the book borrows 
  const borrows = book.borrows.map(borrow =>{
    //inside the book borrows find the accounts information so we can pass it to the new array
  const account = accounts.find( account => account.id === borrow.id);
  return {...borrow, ...account};
  });
  return borrows.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
