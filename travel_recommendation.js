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
    searchDiv.innerHTML = '';
    const input = serachInput.value.trim().toLowerCase();

    fetch('travel_recommendation_api.json')
		  .then(response => response.json())
		  .then(data => {
            console.log(data);

            const matchedTerm = findMatch(input);

            const result = data[matchedTerm];
            

            if (result){
                console.log("inside result");
                searchDiv.innerHTML = `xx`;
              
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
    }
    return matched;

}

function clear(){
    searchDiv.innerHTML = "";
    searchDiv.style.display  =  "none";
    introDiv.style.display =  "block";
    
    serachInput.value = "";

}

btnSearch.addEventListener('click', search);
btnClear.addEventListener('click', clear);