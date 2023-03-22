function findAuthorById(authors, id) {
  let found = authors.find((author) => author.id === id)
  return found
}

function findBookById(books, id) {
  let found = books.find((book) => book.id === id)
  return found
}

function partitionBooksByBorrowedStatus(books) {
  const retFalse = books.filter((book) => book.borrows[0].returned === false)
  const retTrue = books.filter((book) =>book.borrows[0].returned === true)
  const result = []
  result.push(retFalse)
  result.push(retTrue)
  return result
}

function getBorrowersForBook(book, accounts) {
  const result = []
  for (i = 0; i < accounts.length; i++) {
    for (j = 0; j < book.borrows.length; j++) {
      if (accounts[i].id === book.borrows[j].id) {
      accounts[i].returned = book.borrows[j].returned
      result.push(accounts[i])
      }
    }
  }
  const newResult = result.slice(0,10)
  return newResult
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
