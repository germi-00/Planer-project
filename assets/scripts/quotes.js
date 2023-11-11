const quote = document.getElementById('quote');
const header = new Headers({
    "Access-Control-Allow-Origin": "*"
});
function addQuote() {
    fetch ('https://api.quotable.io/random',
    { header: header
    })
    .then (response => response.json())
    .then (data => {
        quote.innerHTML = JSON.stringify(data.content);
    })
}

addQuote();

