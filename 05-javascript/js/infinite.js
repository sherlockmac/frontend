document.addEventListener('DOMContentLoaded', () => {
    let state = {
        loading: true
    };
    const url = 'https://dog.ceo/api/breeds/image/random/6';
    let images = [];

    const setLoading = (loadingState) => {
        state.loading = loadingState;
        if(loadingState) {
            spinner.style.display = 'flex';
        } else {
            spinner.style.display = 'none';
        }        
    }    

    // Elements
    const imageContainer = document.getElementById('image-container');
    const spinner = document.getElementById('spinner-wrapper');
    const backToTop = document.getElementById('back-to-top');

    const getImages = async () => {
        setLoading(true);
        await fetch(url)
        .then( async (response) => {
            const data = await response.json();
            images.push(...data.message);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // Helper function to set bulk attributes
    const setAttr = (element, attributes) => {
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    }

    getImages()
    .then(() => {
        if(images.length > 0) {
            images.forEach((image) => {
                const imageElement = document.createElement('img');
                setAttr(imageElement, {
                    src: image,
                    alt: 'A dog image',
                });
                imageContainer.appendChild(imageElement);
            });
            setLoading(false);
        }
        setLoading(false);
    });

    window.addEventListener('scroll', () => {
        const documentHeight = document.body.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollHeight = window.scrollY;
        if(windowHeight + scrollHeight >= documentHeight - 1000 && !state.loading) {
            setLoading(true);
            getImages()
            .then(() => {
                if(images.length > 0) {
                    images.forEach((image) => {
                        const imageElement = document.createElement('img');
                        setAttr(imageElement, {
                            src: image,
                            alt: 'A dog image',
                        });
                        imageContainer.appendChild(imageElement);
                    })
                    setLoading(false);
                }
                setLoading(false);
            });            
        }
    })

})