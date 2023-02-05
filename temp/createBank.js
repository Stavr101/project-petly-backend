import * as task from "./task.js";

console.log(task.banks);

const modalOpenBtnRef = document.querySelector("[data-modal-open]");
const backdropRef = document.querySelector("[data-modal]");
const modalCloseBtnRef = document.querySelector("[data-modal-close]");
const contactFormRef = document.querySelector(".contact-form");
const banksList = document.querySelector(".banks");
const formFild = document.qyerySelector(".contact-form");
const modalBtn = document.querySelector(".modal-btn");

formFild.addEventListener("submut", (event) => {
  event.preventDefault();
  const formData = new FormData(formFild);
  console.log(formData);
});

modalOpenBtnRef.addEventListener("click", onModalOpenBtn);

function onModalOpenBtn() {
  backdropRef.classList.remove("is-hidden");
}

modalCloseBtnRef.addEventListener("click", onModalCloseBtn);

function onModalCloseBtn() {
  backdropRef.classList.add("is-hidden");
}

contactFormRef.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { name, id },
  } = event.currentTarget;
  if (task.banks.find((el) => el.id === Number(id.value))) {
    console.log("id вже існує");
  } else {
    const newBanck = { id: Number(id.value), name: name.value };
    task.banks.push(newBanck);
    banksList.insertAdjacentHTML("beforeend", task.createMarkupBank(newBanck));
    event.currentTarget.reset();
  }
}

backdropRef.addEventListener("click", onBackdropClick);

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    onModalCloseBtn();
  }
}

document.addEventListener("keydown", onPushEsc);

function onPushEsc(event) {
  if (event.code === "Escape") {
    onModalCloseBtn();
  }
}
