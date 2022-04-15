// import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const feedbackForm = document.querySelector('.feedback-form');
const selectedForm = {};

initForm();

feedbackForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const formData = new FormData(feedbackForm);
  formData.forEach((name, value) => console.log(name, value));
});

feedbackForm.addEventListener('change', evt => {
  // console.log(evt.target.name);
  // console.log(evt.target.value);
  selectedForm[evt.target.name] = evt.target.value;
  console.log(selectedForm);
  localStorage.setItem('LOCALSTORAGE_KEY', JSON.stringify(selectedForm));
});

function initForm() {
  let persistedForm = localStorage.getItem('LOCALSTORAGE_KEY');
  if (persistedForm) {
    persistedForm = JSON.parse(persistedForm);
    console.log(persistedForm);
    Object.entries(persistedForm).forEach(([name, value]) => {
      // console.log(name, value);
      // console.log(feedbackForm.elements);
      selectedForm[name] = value;
      feedbackForm.elements[name].value = value;
    });
  }
}
