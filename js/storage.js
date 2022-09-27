const KEY = "BOOKS";

let books = [];

function saveBooks() {
    const parse = JSON.stringify(books);
    localStorage.setItem(KEY, parse);
    document.dispatchEvent(new Event("dataSaved"));
}

function loadDataLocalStorage() {
    const serializedData = localStorage.getItem(KEY);
    let data = JSON.parse(serializedData);
    if (data !== null)
        books = data;
    document.dispatchEvent(new Event("dataLoad"));
}

function updateDataToStorage() {
    if (cekStorage())
    saveBooks();
}

function interfaceBuku(title,author,year,isComplete){
    return{
        id: +new Date(),
        title,
        author,
        year,
        isComplete
    }
}

function cekStorage(){
    if (typeof(Storage) === undefined) {
        alert("Browser tidak mendukung local storage");
        return false
    }
    return true;
}

function searchBuku(_id) {
    for (book of books) {
        if (book.id === _id)
            return book;
    }
    return null;
}

function searchIndeksBuku(_id) {
    let index = 0;
    for (book of books) {
        if (book.id === _id)
            return index;

        index++;
    }
    return -1;
}

function refreshBuku(){
    const listBelumSelesai = document.getElementById(id_books_belum);
    let listSelesai = document.getElementById(id_books_sudah);
    for (book of books) {
        const bukuBaru = htmlListBaca(book.title, book.author, book.year, book.isComplete);
        bukuBaru[id_books] = book.id;
        if (book.isComplete) {
            listSelesai.append(bukuBaru);
        } else {
            listBelumSelesai.append(bukuBaru);
        }
    }
}