const id_books_belum = "incompleteBookshelfList";
const id_books_sudah = "completeBookshelfList";
const id_books = "idBuku";

function htmlListBaca(
    _title,
    _author,
    _year,
    _isComplete
    ){

    const titleBuku = document.createElement("h3");
    const title = document.createElement("span");
    title.classList.add("title");
    title.innerText = _title;
    titleBuku.append(title);

    const authorBuku = document.createElement("p");
    authorBuku.innerText = "Penulis : ";
    const author = document.createElement("span");
    author.classList.add("author");
    author.innerText = _author;
    authorBuku.append(author);

    const yearBuku = document.createElement("p");
    yearBuku.innerText = "Tahun Terbit : ";
    const year = document.createElement("span");
    year.classList.add("year");
    year.innerText = _year;
    yearBuku.append(year);

    const infoBuku = document.createElement("div");
    infoBuku.classList.add("info");
    infoBuku.append(titleBuku, authorBuku, yearBuku);

    const actionBuku = document.createElement("div");
    actionBuku.classList.add("action");

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(infoBuku, actionBuku);

    if (_isComplete) {
        actionBuku.append(
            tombolBelum(),
            tombolHapus()
        );
    } else {
        actionBuku.append(
            tombolSudah(), 
            tombolHapus());
    }

    return container;

}

function tambahBuku() {
    const listBelumBaca = document.getElementById(id_books_belum);
    const listSudahBaca = document.getElementById(id_books_sudah);
    const isComplete = document.getElementById("inputBookIsComplete");

    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    if (!isComplete.checked) {
        const listBaca = htmlListBaca(title, author, year,false);
        const objekBuku = interfaceBuku(title, author, year,false);
        listBaca[id_books] = objekBuku.id;
        books.push(objekBuku);
        listBelumBaca.append(listBaca); 
    } else {
        const listBaca = htmlListBaca(title, author, year,true);
        const objekBuku = interfaceBuku(title, author, year,true);
        listBaca[id_books] = objekBuku.id;
        books.push(objekBuku);
        listSudahBaca.append(listBaca);
    }
    updateDataToStorage();
}

function hapusForm() {
    document.getElementById("inputBookTitle").value = "";
    document.getElementById("inputBookAuthor").value = "";
    document.getElementById("inputBookYear").value = "";
    document.getElementById("inputBookIsComplete").checked = false;
}

function buatTombol(buttonTypeClass, eventListener,buttonText) {
    const tombol = document.createElement("button");
    tombol.classList.add(buttonTypeClass);
    tombol.innerText = buttonText;
    tombol.addEventListener("click", function(event) {
        eventListener(event);
    });
    return tombol;
}

function tambahBukuSelesai(e) {
    const title = e.querySelector(".title").innerText;
    const author = e.querySelector(".author").innerText;
    const tahun = e.querySelector(".year").innerText;

    const bukuBaru = htmlListBaca(title, author, tahun, true);
    const listSelesai = document.getElementById(id_books_sudah);
    const book = searchBuku(e[id_books]);
    book.isComplete = true;
    bukuBaru[id_books] = book.id;
    listSelesai.append(bukuBaru);
    e.remove();
    updateDataToStorage();
}

function tombolSudah(){
    return buatTombol("green", function(e){
        const p = e.target.parentElement;
        tambahBukuSelesai(p.parentElement);
    },"Selesai dibaca")
}

function hapusBuku(e){
    const posisi = searchIndeksBuku(e[id_books]);
    books.splice(posisi,1);
    e.remove();
    updateDataToStorage();
}

function tombolHapus(){
    return buatTombol("red", function(e){
        const p = e.target.parentElement;
        hapusBuku(p.parentElement);
    },"Hapus Buku ");
}

function tombolBelum(){
    return buatTombol("green", function(e){
        const p = e.target.parentElement;
        belumBukuSelesai(p.parentElement);
    }, "Belum Selesai Dibaca")
}

function belumBukuSelesai(e){
    const title = e.querySelector(".title").innerText;
    const author = e.querySelector(".author").innerText;
    const tahun = e.querySelector(".year").innerText;

    const bukuBaru = htmlListBaca(title, author, tahun, false);
    const listBelumBaca = document.getElementById(id_books_belum);
    const book = searchBuku(e[id_books]);
    book.isComplete = false;
    bukuBaru[id_books] = book.id;
    listBelumBaca.append(bukuBaru);
    e.remove();
    updateDataToStorage();
}





