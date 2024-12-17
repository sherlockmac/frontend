import KEY from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const quoteElement = document.getElementById("quote");
    const personElement = document.getElementById("person");
    const xButton = document.getElementById("x-button");
    const newButton = document.getElementById("new-button");

    const getQuote = async () => {
        try {
            const url = 'https://api.api-ninjas.com/v1/quotes?category=happiness'
            const response = await fetch(url, {
                headers: {
                    "X-Api-Key" : KEY
                }
            });
            const data = await response.json();
            quoteElement.innerHTML = `"${data[0].quote}"`;
            personElement.innerHTML = `— ${data[0].author}`;
        } catch(error) {
            console.log(error);
        }
    }

    getQuote();
});