const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResult = document.getElementById('searchResult')


searchBtn.addEventListener('click', function (){
    const searchValue = searchInput.value;
    loadBooks(searchValue);
})


//  Spinner -----------------------------------------
const spinnerStart =displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const spinnerStop =displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

//Search Inner Text ----------------------
const loadBooks = searchText =>{

    spinnerStart('block');
    searchInput.value='';
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then(Response => Response.json())
    .then(data => bookLoad(data.docs))
}

// loadBooks ---------------------------------

const bookLoad = books => {
    const divH = document.getElementById('booksContainer');

    // empty book list-------
    divH.textContent='';


    const searchTotalResult=books.length;
    searchResult.innerText=searchTotalResult;

    // console.log(searchTotalResult, 'book length');

    if(books.length>0){
        searchResult.innerText=(books.length);
    }
    else{
        searchResult.innerText=('Not Result Found');
    }

    books.forEach(book => {
        /*
        console.log(book);
        console.log(book.author_name);
        */

        // Create Div--------------------
        const div = document.createElement('div');
        div.innerHTML=`

        <div class="col shadow">
            <div class="p-2 border rounded bg-light">
                <div class="imgdiv pt-2">
                    <img class="img" src="${loadImg(book.cover_i)}" alt="">
                </div>
                <div class="py-2">
                    <h5 class="">Title : ${book.title}</h5>
                    <p class="m-0 fst-italic text-muted">Author : ${book.author_name}</p>
                    <p class="m-0 fst-italic text-muted">Published : ${book.first_publish_year}</p>
                </div">
                <div class=" text-center mt-3">
                    <a href="#" class="btn btn-primary px-3">Read</a>
                </div>
        </div>

        `;
        divH.appendChild(div);
    });

    // Spinner---------Stop--------
    spinnerStop('none')

}

// Load Images----------------------------------------
const loadImg = cover_i =>{
    const url = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
    return url;
}
