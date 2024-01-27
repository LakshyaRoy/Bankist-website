'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

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

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function () {
  // const s1coods = section1.getBoundingClientRect();
  // console.log(s1coods);

  // window.scrollTo(s1coods.left + window.scrollX, s1coods.top + window.scrollY);

  // console.log(s1coods.left + window.scrollX);
  // console.log(s1coods.top + window.scrollY);

  // window.scrollTo({
  //   left: s1coods.left + window.scrollX,
  //   top: s1coods.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({
    behavior: 'smooth',
  });
});
