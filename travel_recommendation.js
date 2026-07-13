const btnSearch = document.getElementById('btnSearch');

function search(){
  fetch('travel_recommendation_api.json')
		  .then(response => response.json())
		  .then(data => {
            console.log(data);
          })
		  .catch(error => {
			console.error('Error:', error);
		  });  
}


btnSearch.addEventListener('click', search);