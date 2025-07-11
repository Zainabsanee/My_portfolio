document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card.expandable');
  
    serviceCards.forEach(card => {
      const learnMoreBtn = card.querySelector('.learn-more-btn');
      const serviceDetails = card.querySelector('.service-details');
      const closeButton = serviceDetails.querySelector('.close-details-btn');
      const exitButton = serviceDetails.querySelector('.exit-cards-btn');
      const contactButton = serviceDetails.querySelector('.contact-me-btn');
  
      learnMoreBtn.addEventListener('click', function() {
        serviceDetails.classList.add('open');
        showSlides(1);
      });
  
      closeButton.addEventListener('click', () => {
        serviceDetails.classList.remove('open');
      });
  
      exitButton.addEventListener('click', () => {
        serviceDetails.classList.remove('open');
      });
  
      if (contactButton) {
        contactButton.addEventListener('click', () => {
          serviceDetails.classList.remove('open');
          document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
      }
  
      let slideIndex = 1;
      const slides = serviceDetails.querySelectorAll('.slide');
      const prevBtn = serviceDetails.querySelector('.prev');
      const nextBtn = serviceDetails.querySelector('.next');
  
      function showSlides(n) {
        if (!slides.length) return;
        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;
        slides.forEach(slide => slide.style.display = 'none');
        slides[slideIndex - 1].style.display = 'block';
      }
  
      function plusSlides(n) {
        showSlides(slideIndex += n);
      }
  
      if (prevBtn) prevBtn.onclick = () => plusSlides(-1);
      if (nextBtn) nextBtn.onclick = () => plusSlides(1);
    });
  
    // Rates toggle
    const ratesLink = document.querySelector('a[href="#rates"]');
    const ratesSection = document.getElementById("rates");
    const closeRatesBtn = document.getElementById("closeRates");
  
    if (ratesLink) {
      ratesLink.addEventListener("click", function (e) {
        e.preventDefault();
        ratesSection.classList.remove("hidden");
        window.scrollTo({ top: ratesSection.offsetTop, behavior: "smooth" });
      });
    }
  
    if (closeRatesBtn) {
      closeRatesBtn.addEventListener("click", function () {
        ratesSection.classList.add("hidden");
      });
    }
  
    // Smooth scroll
    document.querySelectorAll('nav a[href^="#"], .hero-buttons a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
      });
    });
  });
  
