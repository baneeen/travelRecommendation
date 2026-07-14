const btnSearch = document.getElementById('btnSearch');
const introDiv = document.getElementById('intro-content');
function search(){
    introDiv.style.display = "none";
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