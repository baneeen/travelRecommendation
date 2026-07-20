const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const serachInput = document.getElementById('serach-input');
const introDiv = document.getElementById('intro-content');
const searchDiv = document.getElementById('search-result');
const keywords = {
    beaches: ["beach", "beaches"],
    temples: ["temple", "temples"],
    countries: ["country", "countries"]
};

function search(){
    introDiv.classList.add("hidden");
    searchDiv.classList.add("show");
    searchDiv.innerHTML='';
    const input = serachInput.value.trim().toLowerCase();
 
    fetch('travel_recommendation_api.json')
		  .then(response => response.json())
		  .then(data => {
         
            const matchedTerm = findMatch(input);

            const result = data[matchedTerm];
           

            if (result){
                searchDiv.innerHTML = `
                    <div class="search-title">
                        <h1>Search Results</h1>
                    </div>

                    <div class="results-container">

                    </div>
                `;

                const container = searchDiv.querySelector(".results-container");
                if ( matchedTerm == "beaches" || matchedTerm == "temples")
                    {  result.forEach(term => {

                        container.innerHTML += `
                                <div class="result-card">
                    
                                    <img src="${term.imageUrl}" alt="${term.name}">
                    
                                    <h3>${term.name}</h3>
                    
                                    <p>${term.description}</p>
                    
                                </div>
                            `;
                    
                        });
                     
                    } else if (matchedTerm == "countries")
                        {
                            result.forEach(country => {

                                country.cities.forEach(term => {

                                container.innerHTML += `
                                        <div class="result-card">
                            
                                            <img src="${term.imageUrl}" alt="${term.name}">
                            
                                            <h3>${term.name}</h3>
                            
                                            <p>${term.description}</p>
                            
                                        </div>
                                    `;
                            
                                } )}); 
                        }
          
                }

          })
		  .catch(error => {
			console.error('Error:', error);
		  });  

   
}

function findMatch(input){
    let matched = null;

    for (const [key, values] of Object.entries(keywords)) {
     
        if (values.includes(input)) {
            matched = key;
            break;
        }
    }
    return matched;

}

function clear(){
    introDiv.classList.remove("hidden");
    searchDiv.classList.remove("show");
    
    searchDiv.innerHTML='';
    serachInput.value = "";

}

btnSearch.addEventListener('click', search);
btnClear.addEventListener('click', clear);