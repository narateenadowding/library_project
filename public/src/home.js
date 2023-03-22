function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let count = books.reduce((acc,book) => {
    for (let i=0; i<book.borrows.length; i++) {
      if (false === book.borrows[i].returned) {
        acc += 1
      }
    }
    return acc
  }, 0)
  return count
}

function getMostCommonGenres(books) {
  const genres = books.map((book) => book.genre)
  const comArray = genres.reduce((acc, genre) => {
    let count = countArrayElements(genres, genre)
    let name = genre
    let object = {}
    object.name = name
    object.count = count
    acc.push(object)
    return acc
  }, [])
 const comArraySort = comArray.sort((elementA, elementB) => elementB.count - elementA.count)
 const unique = [...new Map(comArraySort.map((element) => [element.name, element])).values()]
 const limit = unique.slice(0,5)
 return limit
}

function getMostPopularBooks(books) {
  const popBooks = books.reduce ((acc, book) => {
    let name = book.title
    let count = book.borrows.length
    let object = {}
    object.name = name
    object.count = count
    acc.push(object)
    return acc
  }, [])
  const popBooksSort = popBooks.sort((elementA, elementB) => elementB.count - elementA.count)
  const limit = popBooksSort.slice(0,5)
  return limit
}


function getMostPopularAuthors(books, authors) {
  let finalAuthors = []
  let resultObj = {}
  const authorInfo = authors.forEach((author) => {
    const id = author.id
    const {name: {first,last}} = author
    const authorName = `${first} ${last}`
    books.forEach((book) => {
      const borrowed = book.borrows.length
      if (book.authorId === id) {
        if (!finalAuthors.some((authorObj) => authorObj["name"] === authorName)) {
          const result = {name: authorName, count: borrowed}
          finalAuthors.push(result)
        } else {
          const foundAuthor = finalAuthors.find((authorObj) => authorObj["name"] = authorName)
          foundAuthor.count += borrowed
        }
      }
    })
  })
  const sorted = finalAuthors.sort((authorA,authorB) => authorA.count>authorB.count ? -1 : 1)
  const limit = sorted.slice(0,5)
  return limit
}

function countArrayElements(array, element) {
  let counter = 0 
  for (let i = 0; i < array.length; i++) {
    if (array[i] === element) {
      counter += 1
    }
  }
  return counter
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};