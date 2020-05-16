document.addEventListener("DOMContentLoaded", () => {
  'use strict';
  // Ловим верстку
  const btnOpenModal = document.getElementById("btnOpenModal");
  const modal = document.getElementById("modalBlock");
  const closeModal = document.getElementById("closeModal");
  const questionTitle = document.getElementById("question");
  const formAnswers = document.getElementById("formAnswers");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

// глобальные переменные
  const questions = [
    {
      question: "Какого цвета бургер?",
      answers: [{
          title: 'Стандарт',
          url: './image/burger.png'
        },
        {
          title: 'Черный',
          url: './image/burgerBlack.png'
        }
      ],
      type: 'radio'
    },
    {
      question: "Из какого мяса котлета?",
      answers: [{
          title: 'Курица',
          url: './image/chickenMeat.png'
        },
        {
          title: 'Говядина',
          url: './image/beefMeat.png'
        },
        {
          title: 'Свинина',
          url: './image/porkMeat.png'
        }
      ],
      type: 'radio'
    },
    {
      question: "Дополнительные ингредиенты?",
      answers: [{
          title: 'Помидор',
          url: './image/tomato.png'
        },
        {
          title: 'Огурец',
          url: './image/cucumber.png'
        },
        {
          title: 'Салат',
          url: './image/salad.png'
        },
        {
          title: 'Лук',
          url: './image/onion.png'
        }
      ],
      type: 'checkbox'
    },
    {
      question: "Добавить соус?",
      answers: [{
          title: 'Чесночный',
          url: './image/sauce1.png'
        },
        {
          title: 'Томатный',
          url: './image/sauce2.png'
        },
        {
          title: 'Горчичный',
          url: './image/sauce3.png'
        }
      ],
      type: 'radio'
    }
  ];
// тут агенты ФСБ
  btnOpenModal.addEventListener("click", () => {
    modal.classList.toggle("d-block");
    playTest();
  });

  closeModal.addEventListener("click", () => {
    modal.classList.toggle("d-block");
  });
// Сам Квиз
  const playTest = () => {
    let numberOfQuestion = 0;

    const renderAnswers = (index) => {
      // подготовка к рендеру
      formAnswers.innerHTML = ``;
      if (numberOfQuestion > 0) {
        prev.style.visibility = "visible";
      } else {
        prev.style.visibility = "hidden";
      }
      if (numberOfQuestion < questions.length-1) {
        next.style.visibility = "visible";
      } else {
        next.style.visibility = "hidden";
      }
      // ------------
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answers-item', 'd-flex', 'flex-column');
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title }</span>
          </label>`;
        
        formAnswers.appendChild(answerItem);
      })
      
    }

    const renderQuestions = (index) => {
      questionTitle.textContent = questions[index].question;
      renderAnswers(index);
    }
    renderQuestions(numberOfQuestion);
    next.onclick = () => {
      numberOfQuestion++;
      renderQuestions(numberOfQuestion)
    }
    prev.onclick = () => {
      numberOfQuestion--;
      renderQuestions(numberOfQuestion)
      
    }
  }

})