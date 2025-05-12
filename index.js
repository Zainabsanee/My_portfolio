document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card.expandable');
    const serviceDetailsContainer = document.createElement('div');
    serviceDetailsContainer.classList.add('service-details');
    document.body.appendChild(serviceDetailsContainer);
    let currentOpenDetails = null;

    serviceCards.forEach((card, index) => {
        const learnMoreBtn = card.querySelector('.learn-more-btn');

        learnMoreBtn.addEventListener('click', function() {
            const serviceName = card.querySelector('h3').textContent;
            const detailsContentHTML = card.querySelector('.service-details .details-content').innerHTML;

            serviceDetailsContainer.innerHTML = `
                <button class="close-details-btn">Close</button>
                <button class="exit-cards-btn">Back to Services</button>
                <div class="details-content" data-service-index="${index}">
                    ${detailsContentHTML}
                </div>
            `;

            const currentDetailsContent = serviceDetailsContainer.querySelector('.details-content');
            const slideshowContainer = currentDetailsContent.querySelector('.slideshow-container');
            let slideIndex = 1;
            const slides = slideshowContainer ? slideshowContainer.querySelectorAll('.slide') : [];

            function showSlides(n) {
                if (!slides || slides.length === 0) return;
                if (n > slides.length) { slideIndex = 1 }
                if (n < 1) { slideIndex = slides.length }
                slides.forEach(slide => slide.style.display = 'none');
                slides[slideIndex - 1].style.display = 'block';
            }

            window.plusSlides = function(n) {
                showSlides(slideIndex += n);
            }

            showSlides(slideIndex);

            const closeButton = serviceDetailsContainer.querySelector('.close-details-btn');
            closeButton.addEventListener('click', closeServiceDetails);

            const exitButton = serviceDetailsContainer.querySelector('.exit-cards-btn');
            exitButton.addEventListener('click', closeServiceDetails);

            const contactButton = currentDetailsContent.querySelector('.contact-me-btn');
            if (contactButton) {
                contactButton.addEventListener('click', () => {
                    closeServiceDetails();
                    document.querySelector('#contact').scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            }

            serviceDetailsContainer.classList.add('open');
            currentOpenDetails = serviceDetailsContainer;
        });
    });

    function closeServiceDetails() {
        if (currentOpenDetails) {
            currentOpenDetails.classList.remove('open');
            currentOpenDetails.innerHTML = '';
            currentOpenDetails = null;
            document.body.style.overflow = 'auto';
        }
    }

    document.addEventListener('click', function(event) {
        if (currentOpenDetails && !currentOpenDetails.contains(event.target) && !event.target.classList.contains('learn-more-btn')) {
            closeServiceDetails();
        }
    });

    const body = document.querySelector('body');
    const observer = new MutationObserver(function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (currentOpenDetails && currentOpenDetails.classList.contains('open')) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = 'auto';
                }
            }
        }
    });

    observer.observe(document.body, { attributes: true, subtree: false, attributeFilter: ['class', 'style'] });

    document.querySelectorAll('nav a[href^="#"], .hero-buttons a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

