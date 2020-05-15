document.addEventListener("DOMContentLoaded", () => {
  'use strict';
  const btnOpenModal = document.querySelector("#btnOpenModal");
  const modal = document.querySelector("#modalBlock");
  const closeModal = document.querySelector("#closeModal");
  const questionTitle = document.querySelector("#question");
  const formAnswers = document.querySelector("#formAnswers");

  let burgerName = 'Стандарт';
  let burgerImgURL = './image/burger.png';

  btnOpenModal.addEventListener("click", () => {
    modal.classList.toggle("d-block");
    playTest();
  });

  closeModal.addEventListener("click", () => {
    modal.classList.toggle("d-block");
  });

  const playTest = () => {
    const renderQuestions = () => {
      questionTitle.textContent = "Какого цвета бургер вы хотите?";
      formAnswers.innerHTML = `
        <div class="answers-item d-flex flex-column">
          <input type="radio" id="answerItem1" name="answer" class="d-none">
          <label for="answerItem1" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${burgerImgURL}" alt="burger">
            <span>${burgerName}</span>
          </label>
        </div>
      `
    }
    renderQuestions();
  }

})