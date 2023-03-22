function findAccountById(accounts, id) {
  return accounts.find((account) => account["id"] === id)
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => (accountA["name"].last > accountB["name"].last ? 1 : -1))
  return accounts
}

function getTotalNumberOfBorrows(account, books) {
  let count = books.reduce((acc,book) => {
    for (i=0; i<book.borrows.length; i++) {
      if (account.id === book.borrows[i].id) {
        acc += 1
      }
    }
    return acc
  }, 0)
  return count
}
  

function getBooksPossessedByAccount(account, books, authors) {
  const id = account.id
  let borrows = books.reduce((acc, book) => {
    for (i=0; i< book.borrows.length; i++) {
      if (id === book.borrows[i].id && book.borrows[i].returned === false) {
        const author = authors.find((author) => author.id === book.authorId)
        const possessedBook = {...book, author}
        acc.push(possessedBook)
      }
    }
    return acc
  }, [])
  return borrows
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
