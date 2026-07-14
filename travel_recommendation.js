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
    introDiv.style.display = "none";
    searchDiv.innerHTML = "";
    const input = serachInput.value.trim().toLowerCase();

    fetch('travel_recommendation_api.json')
		  .then(response => response.json())
		  .then(data => {
            console.log(data);

            const matchedTerm = findMatch(input);

            const result = data.find(item => item.toLowerCase() === matchedTerm);
            
            

            if (result){
                searchDiv.innerHTML = `
            <div class="search-title">
            <h1>Search Results</h1>
        </div>
        `;
                result.forEach(term => {

                    searchDiv.innerHTML += `
                        <div class="result-card">
            
                            <img src="${term.imageUrl}" alt="${term.name}">
            
                            <h3>${term.name}</h3>
            
                            <p>${term.description}</p>
            
                        </div>
                    `;
            
                });
            }
          })
		  .catch(error => {
			console.error('Error:', error);
		  });  

    searchDiv.style.display  =  "block";
}

function findMatch(input){
    let matched = null;

    for (const [key, values] of Object.entries(keywords)) {
        if (values.includes(input)) {
            matched = key;
            break;
        }
        console.log("matched"+matched)
    return matched;
}
}

function clear(){
    searchDiv.innerHTML = "";
    searchDiv.style.display  =  "none";
    introDiv.style.display =  "block";
    
    serachInput.value = "";

}

btnSearch.addEventListener('click', search);
btnClear.addEventListener('click', clear);