"use strict"

// -------------------------  Variables ---------------------------

let movies__wrapper = $('#movies-wrapper');
let categoryOption = $('#category');
let movies_file = movies.splice(0, 100);
let categories = [];
let header_search = $('#header-search');
let dark_btn = $('#dark-btn');
let body = $('body');



// ---------------------------- render categories ---------------------------------
function renderCategories(data){
    data.forEach(element => {
        element.categories.forEach(el => {
            if(!categories.includes(el)){
                categories.push(el);
            }
        })
    });
}
renderCategories(movies_file)
renderdata(categories, categoryOption, 'option', '', ``)

function renderdata(data, tagWrapper, ...tagName){
    data.sort().forEach(el => {
        tagName[2] = el;
        tagWrapper.append(createElement(...tagName));
    });
}

// -------------------------------- Render data ----------------------------------

function renderMovies(data, tagWrapper){
    tagWrapper.innerHTML = "";
    data.forEach(el =>{
        const card = createElement('div', 'card', `
            <img src="${el.smallThumbnail}" alt="smth">
            <div class="card-body">
                <h2>${el.title.length > 26 ? el.title.substring(0,23)+"..." : el.title}</h2>
                <ul>
                    <li><strong>Year:</strong> ${el.year}</li>
                    <li><strong>Categories:</strong>${el.categories}</li>
                    <li><strong>Rating:</strong>${el.imdbRating}</li>
                    <li><strong>Language:</strong>${el.language}</li>
                </ul>

                <div class="flex btn-wrappeer items-center gap-x-3">
                   
                    <button 
                        data-like=${el.imdbId}
                        class="grid hover:bg-red-700 hover:text-white duration-500 text-red-700 place-content-center p-4 border w-12 h-12 rounded-full">
                        <i class="bi bi-suit-heart-fill "></i>
                    </button>

                    <a href="https://www.youtube.com/results?search_query=${el.youtubeId}" target="_blank" class="flex hover:bg-black hover:text-white duration-500  justify-center gap-x-2 text-xl items-center border min-w-24 px-3 h-12 rounded-full"> 
                        <i class="bi bi-play-circle-fill"></i>
                        <span>watch movie</span>
                    </a>
                </div>

            </div>
            `
            );

        tagWrapper.append(card)
    })
}

renderMovies(movies_file, movies__wrapper)




// ---------------------------- Header search ----------------------------
header_search.addEventListener('keyup', () =>{
    let div = movies_file.filter(el => {
        if(el.title.toLocaleLowerCase().includes(header_search.value)){
            return el;
        }
    })
    renderMovies(div, movies__wrapper)
})


// ------------------------------ Dark mode --------------------------------------
dark_btn.addEventListener('click', ()=> {
    body.classList.toggle("darkmode");

})