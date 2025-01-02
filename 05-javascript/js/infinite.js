document.addEventListener('DOMContentLoaded', () => {
    let state = {
        loading: true
    };
    const url = 'https://dog.ceo/api/breeds/image/random/6';
    let images = [];
    let imagesLoaded = 0;
    let totalImages = 0;

    // Elements
    const imageContainer = document.getElementById('image-container');
    const spinner = document.getElementById('spinner-wrapper');
    const backToTop = document.getElementById('back-to-top');

    // Helper functions
    const setLoading = (loadingState) => {
        state.loading = loadingState;
        if(loadingState) {
            spinner.style.display = 'flex';
        } else {
            spinner.style.display = 'none';
        }        
    }

    const imageLoader = () => {
        imagesLoaded++;
        if(imagesLoaded === totalImages) {
            setLoading(false);
        }
    }

    const setAttr = (element, attributes) => {
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    }
    
    // Main functions
    const getImages = async () => {
        setLoading(true);
        await fetch(url)
        .then( async (response) => {
            const data = await response.json();
            images = data.message;
            displayImages();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const displayImages = () => {
        totalImages = images.length;
        imagesLoaded = 0;
        images.forEach((image) => {
            const imageElement = document.createElement('img');
            setAttr(imageElement, {
                src: image,
                alt: 'A dog image',
            });
            imageElement.addEventListener('load', imageLoader);
            imageContainer.appendChild(imageElement);
        });
    }

    // Event listeners
    window.addEventListener('scroll', () => {
        const documentHeight = document.body.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollHeight = window.scrollY;
        if(windowHeight + scrollHeight >= documentHeight - 100 && !state.loading) {
            setLoading(true);
            getImages();         
        }

        if(scrollHeight > 100) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo(0, 0);
        // document.documentElement.scrollTop = 0;
    });

    getImages();

})