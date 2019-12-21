//mengambil file
function getMovies(keyword){
	let xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			//ketika ajax siap
			let movies = JSON.parse(xhr.response);
			showMovies(movies.Search);
		}
	}

	xhr.open('get','http://www.omdbapi.com/?apikey=21a7da2b&s=' + keyword);
	xhr.send();
}

//menampilkan film
function showMovies(movies){
	let cards = '';
	movies.forEach(function(movie) {
		cards += `<div class="col-4 my-3">
          <div class="card">
            <img src="${movie.Poster}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${movie.Title}</h5>
               <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
              <button  class="btn btn-primary see-detail " data-toggle="modal" data-target="#exampleModal" data-id="`+ movie.imdbID + `">Show Details</button>
            </div>
          </div>
        </div>`;
	});

	movieList.innerHTML = cards;
	$('.input-keyword').val('');

}

let movieList = document.querySelector('.movie-list');
let inputKeyword = document.querySelector('.input-keyword');
let buttonSearch = document.querySelector('.button-search');
//ketika halaman dibuka
getMovies('doraemon');

//ketika film dicari
buttonSearch.addEventListener('click',function(){

	getMovies(inputKeyword.value);

});

inputKeyword.addEventListener('keyup',function(e){
	if(e.which === 13){
		getMovies(inputKeyword.value);
	}

});

$('.movie-list').on('click','.see-detail', function(){
	
	$.ajax({
		url : 'http://www.omdbapi.com',
		dataType : 'json',
		type: 'get',
		data: {
			'apikey':'21a7da2b',
			'i' : $(this).data('id')
		},
		success : function(movie){
			if(movie.Response === "True"){
				$('.modal-body').html(`
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-4">
								<img src="`+movie.Poster+`" class="img-fluid">
							</div>
							<div class="col-md-8">
								<ul class="list-group">
									<li class="list-group-item"><h3>`+movie.Title+`</h3></li>
									<li class="list-group-item">Released : `+movie.Released+`</li>
									<li class="list-group-item">Genre : `+movie.Genre+`</li>
									<li class="list-group-item">Director : `+movie.Director+`</li>
									<li class="list-group-item">Actors : `+movie.Actors+`</li>
								</ul>
							</div>
						</div>
					</div>
					`);
			}
		}
	});
});