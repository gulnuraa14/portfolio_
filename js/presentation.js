const slides = [
  { src: "img/Problem Statement.png", title: "Problem Statement" },
  { src: "img/Objectives & Goals.png", title: "Objectives & Goals" },
  { src: "img/User Needs.png", title: "User Needs" },
  { src: "img/Product Users.png", title: "Product Users" },
  { src: "img/Quantitative Research.png", title: "Quantitative Research" },
  { src: "img/Competitor Analysis.png", title: "Competitor Analysis" },
  { src: "img/Unique Features.png", title: "Unique Features" },
  { src: "img/Features & Functionalities.png", title: "Features & Functionalities" },
  { src: "img/Our Process.png", title: "Our Process" },
  { src: "img/Screens.png", title: "Screens" },
  { src: "img/Hero.png", title: "Hero" },
  { src: "img/Instagram post - 72.png", title: "Brand Post" },
  { src: "img/A5 - 2.png", title: "Poster" },
  { src: "img/10.jpg", title: "Visual 10" },
  { src: "img/2025-12-03 22.00.10 1.png", title: "Visual 11" },
  { src: "img/Thank You.png", title: "Thank You" }
];

const slideImage = document.getElementById("slideImage");
const slideTitle = document.getElementById("slideTitle");
const slideCounter = document.getElementById("slideCounter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsEl = document.getElementById("dots");

let currentIndex = 0;

function padNumber(value) {
  return String(value).padStart(2, "0");
}

function renderDots() {
  dotsEl.innerHTML = "";
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (index === currentIndex ? " active" : "");
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => {
      currentIndex = index;
      renderSlide();
    });
    dotsEl.appendChild(dot);
  });
}

function renderSlide() {
  const slide = slides[currentIndex];
  slideImage.classList.remove("is-visible");

  const nextSrc = encodeURI(slide.src);
  const image = new Image();
  image.src = nextSrc;
  image.onload = () => {
    slideImage.src = nextSrc;
    slideImage.alt = slide.title || "Presentation slide";
    slideTitle.textContent = slide.title || "";
    slideImage.classList.add("is-visible");
  };

  slideCounter.textContent = `${padNumber(currentIndex + 1)} / ${padNumber(slides.length)}`;
  renderDots();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  renderSlide();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  renderSlide();
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    nextSlide();
  }
  if (event.key === "ArrowLeft") {
    prevSlide();
  }
});

let startX = 0;
slideImage.addEventListener("touchstart", (event) => {
  startX = event.changedTouches[0].clientX;
});

slideImage.addEventListener("touchend", (event) => {
  const endX = event.changedTouches[0].clientX;
  const delta = endX - startX;
  if (Math.abs(delta) > 40) {
    if (delta < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
});

renderSlide();
