
document.addEventListener("DOMContentLoaded", function() {

    const submitForm = document.getElementById("bookSubmit");
    submitForm.addEventListener("click", function(event) {
        event.preventDefault();
        tambahBuku();
        hapusForm();
    });

    if (cekStorage()) {
        loadDataLocalStorage();
    }
});

document.addEventListener("dataSaved",() =>{
    console.log("Data Berhasil Disimpan");
})

document.addEventListener("dataLoad", () =>{
    refreshBuku();
})
