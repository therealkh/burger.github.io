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
  const send = document.getElementById("send");
  const modalDialog = document.querySelector(".modal-dialog");

// глобальные переменные
  const questions = [
    {
      question: "Какого цвета бургер?",
      description: "Цвет булочки",
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
      description: "Мясо",
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
      description: "Ингредиенты",
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
      description: "Соус",
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

// анимация модалки
  let openModalAnim;//Переменная анимации открытия модалки
  let closeModalAnim;//Переменная анимации закрытия модалки
  let animateTop = -30,//переменная для style.top
    animateOpacity = 0;//для opacity
  

/*--------------------[ Анимация открытия модалкт ]--------------------*/
  const animateModalOpen = () => {
    modalDialog.style.top = `${animateTop}%`;
    modal.style.opacity = `${animateOpacity}`;
    openModalAnim = requestAnimationFrame(animateModalOpen);
    if (animateTop >= 0 && animateOpacity >= 1) {//когда останавливать анимацию
      cancelAnimationFrame(openModalAnim);
    } else {
      if (animateTop < 0) { animateTop += 5;}
      if (animateOpacity < 1) { animateOpacity += 0.16; }
    }
  }


/*--------------------[ Анимация открытия модалкт ]--------------------*/
  const animateModalClose = () => {//Анимация закрытия модалки
    modalDialog.style.top = `${animateTop}%`;
    modal.style.opacity = `${animateOpacity}`;
    closeModalAnim = requestAnimationFrame(animateModalClose);
    if (animateTop <= -30 && animateOpacity <= 0) {//когда останавливать анимацию
      cancelAnimationFrame(closeModalAnim);
      modal.classList.toggle("d-block");
    } else {
      if (animateTop > -30) { animateTop -= 5; }
      if (animateOpacity > 0) { animateOpacity -= 0.16; }
    }
  }


// обработчики событий
  btnOpenModal.addEventListener("click", () => {
    modal.classList.toggle("d-block");
    openModalAnim = requestAnimationFrame(animateModalOpen);
    playTest();
  });


  closeModal.addEventListener("click", () => {
    closeModalAnim = requestAnimationFrame(animateModalClose);
  });


// Сам Квиз
  const playTest = () => {
    const userAnswers = [];
    let numberOfQuestion = 0;
    const renderAnswers = (index) => {

      formAnswers.innerHTML = ``;//Фикс бага с дюпом

      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value= "${answer.title}">
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title }</span>
          </label>`;
        
        formAnswers.appendChild(answerItem);
      })
    }

    
    const renderQuestions = (index) => {
      // console.log(numberOfQuestion);
      // console.log(numberOfQuestion == 0);
      switch (true) {
        case (numberOfQuestion == 0):
          prev.classList.add("d-none");
          next.classList.remove("d-none");
          send.classList.add("d-none");
          renderAnswers(index);
          break;
        
        case (numberOfQuestion >= 0 && numberOfQuestion <= questions.length-1):
          questionTitle.textContent = questions[index].question;
          prev.classList.remove("d-none");
          next.classList.remove("d-none");
          send.classList.add("d-none");
          renderAnswers(index);
          break;
        
        case (numberOfQuestion == questions.length):
          next.classList.add("d-none");
          prev.classList.add("d-none");
          send.classList.remove("d-none");
          questionTitle.textContent = "Отлично! Вы справились с нелегким выбором!"
          formAnswers.innerHTML = `
            <div class="form-group">
              <label for="phone"> Оставьте свой номер телефона. Мы Вам позвоним!</label>
              <input type="phone" class="form-control" id="phone" placeholder="Номер телефона:">
            </div>
          `;
          break;
        
        case (numberOfQuestion == questions.length + 1):
          send.classList.add("d-none");
          questionTitle.textContent = "Спасибо за заказ! Наш менеджер свяжется с вами в ближайшее время! ";
          formAnswers.innerHTML = '';
          setTimeout(() => {
            closeModalAnim = requestAnimationFrame(animateModalClose);
          }, 3000);
          break;
      }
    }

    renderQuestions(numberOfQuestion);
    
    const getUserAnswer = () => {
      const obj = {};
      const checkedInputs = [...formAnswers].filter((input) => input.checked || input.id==="phone");

      checkedInputs.forEach((item, index) => {
        if (numberOfQuestion >= 0 && numberOfQuestion < questions.length) { 
          obj[`${index}_${questions[numberOfQuestion].description}`] = item.value;
        } else {
          obj["phone"] = item.value;
        }
      })
      userAnswers.push(obj);
      console.log(userAnswers);
    }
    // обработчики для кнопок модалки
    next.onclick = () => {
      getUserAnswer();
      numberOfQuestion++;
      renderQuestions(numberOfQuestion)
    }
    prev.onclick = () => {
      numberOfQuestion--;
      renderQuestions(numberOfQuestion)
      
    }
    send.onclick = () => {
      getUserAnswer();
      numberOfQuestion++;
      renderQuestions(numberOfQuestion)
    }
  }

})
