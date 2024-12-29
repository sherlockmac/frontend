import KEY from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    let state = {
        loading: true
    };
    let tweetContent = '';
    const quoteElement = document.getElementById("quote");
    const personElement = document.getElementById("person");
    const xButton = document.getElementById("x-button");
    const newButton = document.getElementById("new-button");
    const spinner = document.getElementById("spinner-wrapper");

    const setLoading = (loadingState) => {
        state.loading = loadingState;
        if(loadingState) {
            spinner.style.display = 'flex';
        } else {
            spinner.style.display = 'none';
        }        
    }

    // Helper fucntion to set HTML content. This is just for demo purposes!
    const setHTMLContent = (element, value) => {
        element.innerHTML = value;
    }

    newButton.addEventListener('click', () => {
        setHTMLContent(quoteElement, '');
        personElement.innerHTML = '';
        newButton.classList.add('disabled');
        newButton.innerHTML = "Loading Quote";
        if(!state.loading) {
            getQuote();
        }
    })

    xButton.addEventListener('click', () => { 
        if(tweetContent.length > 0) {
            const encodedContent = encodeURIComponent(`${tweetContent}`);
            const twitterUrl = `https://x.com/intent/tweet?text=${encodedContent}`;
            window.open(twitterUrl, "_blank");
        }
    })    

    const getQuote = async () => {
        setLoading(true);
        // Category can be changed. https://api-ninjas.com/api/quotes
        const url = 'https://api.api-ninjas.com/v1/quotes?category=knowledge';

        await fetch(url, {
            method: 'GET',
            headers: {
                "X-Api-Key" : KEY
            }
        }).then(async (response) => {
            const data = await response.json();
            if(data) {
                setLoading(false);
            }
            quoteElement.innerHTML = `"${data[0].quote}"`;
            personElement.innerHTML = `— ${data[0].author}`;
            tweetContent = `"${data[0].quote}" — ${data[0].author}`;
        }).catch(() => {
            setLoading(false);
            quoteElement.innerHTML = "An error has occured please try again!";
        });
        newButton.classList.remove('disabled');
        newButton.innerHTML = "New Quote";
    }

    getQuote();
});