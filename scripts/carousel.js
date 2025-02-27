document.addEventListener("DOMContentLoaded", function () {
  const dots = document.querySelectorAll(".dot");
  const nextSlide = document.getElementById("arrow-right");
  const prevSlide = document.getElementById("arrow-left");
  const slides = document.getElementsByClassName("carousel-item");

  let currentSlide = 0;
  let isAnimating = false;
  const totalSlides = slides.length;

  nextSlide.addEventListener("click", () => {
    if (!isAnimating) nextItemSlide();
  });

  prevSlide.addEventListener("click", () => {
    if (!isAnimating) prevItemSlide();
  });

  console.log({ currentSlide });

  function nextItemSlide() {
    if (isAnimating) return;
    isAnimating = true;

    currentSlide = (currentSlide + 1) % totalSlides;

    if (currentSlide === 0) {
      const currentActive = 2;
      const nextSlide = 0;

      // Position the next slide before transition
      slides[nextSlide].style.transform = "translateX(100%)";
      slides[nextSlide].style.transition = "none";

      // Force reflow
      slides[nextSlide].offsetHeight;

      // Start transition
      setTimeout(() => {
        slides[nextSlide].style.transition = "all 1s ease-in-out";
        slides[nextSlide].style.transform = "translateX(0)";
        slides[currentActive].style.transform = "translateX(-100%)";

        setTimeout(() => {
          updateDots();
          isAnimating = false;
        }, 1000);
      }, 50);
      return;
    }

    updateSlides(currentSlide, "next");
  }

  function prevItemSlide() {
    if (isAnimating) return;
    isAnimating = true;

    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    if (currentSlide === 2) {
      const currentActive = 0;
      const nextSlide = 2;

      // Position the next slide before transition
      slides[nextSlide].style.transform = "translateX(-100%)";
      slides[nextSlide].style.transition = "none";

      // Force reflow
      slides[nextSlide].offsetHeight;

      // Start transition
      setTimeout(() => {
        slides[nextSlide].style.transition = "all 1s ease-in-out";
        slides[nextSlide].style.transform = "translateX(0)";
        slides[currentActive].style.transform = "translateX(100%)";

        setTimeout(() => {
          updateDots();
          isAnimating = false;
        }, 1000);
      }, 50);
      return;
    }

    updateSlides(currentSlide, "prev");
  }

  function updateSlides(ind, type) {
    const activeSlide =
      type === "next" ? slides[currentSlide - 1] : slides[currentSlide + 1];

    const nextSlide = slides[ind];

    // Set initial position for next slide
    nextSlide.style.transform =
      type === "next" ? "translateX(100%)" : "translateX(-100%)";
    nextSlide.style.transition = "none";

    // Force reflow
    nextSlide.offsetHeight;

    // Start transition
    setTimeout(() => {
      activeSlide.style.transition = "all 1s ease-in-out";
      nextSlide.style.transition = "all 1s ease-in-out";

      activeSlide.style.transform =
        type === "next" ? "translateX(-100%)" : "translateX(100%)";
      nextSlide.style.transform = "translateX(0)";

      activeSlide.classList.remove("active");
      nextSlide.classList.remove("inactive-right", "inactive-left");
      nextSlide.classList.add("active");

      setTimeout(() => {
        updateDots();
        isAnimating = false;
      }, 1000);
    }, 50);
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function autoSlides() {
    setInterval(() => {
      if (!isAnimating) nextItemSlide();
    }, 5000);
  }

  // autoSlides();

  slides[0].classList.add("active");
  dots[0].classList.add("active");

  // Add click events to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      if (isAnimating || currentSlide === index) return;
      const direction = index > currentSlide ? "next" : "prev";
      currentSlide = index;
      updateSlides(currentSlide, direction);
    });
  });
});
