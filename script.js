'use strict';

///////////////////////////////////////
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// document.querySelectorAll('.nav__link').forEach(link =>
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(`${id}`).scrollIntoView({
//       behavior: 'smooth',
//     });
//   })
// );

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// tabbed component

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // guard clause
  if (!clicked) return;

  // active tab and content
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  // activate content area
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};
// passing "argument into handler"
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// sticky nav

// option1
// but less performance

// const coordinates = section1.getBoundingClientRect();
// console.log(coordinates);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY >= coordinates.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// sticky nav
// option 2
// high performance

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect();

// step 3 make a callback function and pass in the new observer.
const headerCallback = entries => {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

// step1 create a new observer.
const headerObserver = new IntersectionObserver(headerCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight.height}px`,
});
// step2  assign the observer with the dom element.
headerObserver.observe(header);

// slide up animations to the sections

const allSection = document.querySelectorAll('.section');

const sectionCallback = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionCallback, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// image blur effect

// image otimization with lazy loading

const allImages = document.querySelectorAll('img[data-src]');
// console.log(allImages);

const imageCallback = (entries, observe) => {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observe.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(imageCallback, {
  root: null,
  threshold: 0,
  rootMargin: '100px',
});

allImages.forEach(img => imgObserver.observe(img));

// slider
const sliderFunction = function () {
  document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotsContainer = document.querySelector('.dots');
    let curr = 0;
    const maxSlide = slides.length;

    slides.forEach((s, i) => {
      return (s.style.transform = `translateX(${100 * i}%)`);
    });

    const createDots = function () {
      slides.forEach(function (_, i) {
        dotsContainer.insertAdjacentHTML(
          'beforeend',
          `<button class="dots__dot" data-slide="${i}"></button>`
        );
      });
    };

    const currDots = function (slide) {
      document
        .querySelectorAll('.dots__dot')
        .forEach(dots => dots.classList.remove('dots__dot--active'));

      document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
    };

    dotsContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        updateSlidePosition(slide);
        currDots(slide);
      }
    });

    function updateSlidePosition(currSlide) {
      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - currSlide)}%)`)
      );
    }

    function nextSlide() {
      if (curr === maxSlide - 1) {
        curr = 0;
      } else {
        curr++;
      }
      updateSlidePosition(curr);
      currDots(curr);
    }

    function previousSlide() {
      if (curr === 0) {
        curr = maxSlide - 1;
      } else {
        curr--;
      }
      updateSlidePosition(curr);
      currDots(curr);
    }
    // init function
    const init = function () {
      createDots();
      currDots(0);
    };
    init();

    // event handelers

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', previousSlide);

    document.addEventListener('keydown', function (e) {
      if (e.code === 'ArrowRight') {
        nextSlide();
      } else if (e.code === 'ArrowLeft') {
        previousSlide();
      }
    });
  });
};
sliderFunction();

/////////////////////////////////////////////
////////////////////////////////////////////
///////////////////////////////////////////

// const header = document.querySelector('.header');
// // creating and inserting elemnets

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use Cookies for improved functionality and analytics';
// message.innerHTML =
//   'We use Cookies for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it </button>';

// // header.prepend(message);
// header.append(message);

// // header.before(message);
// // header.after(message);

// // delete elements

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// // styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '98.9vw';
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// console.log(getComputedStyle(message).height);

// const randomInt = (max, min) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(255, 0)},${randomInt(255, 0)},${randomInt(255, 0)})`;

// // console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
