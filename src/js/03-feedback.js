import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onInputForm, 500));

function onInputForm() {
  const formData = new FormData(formRef);
  let userForm = {};
  formData.forEach((value, name) => (userForm[name] = value.trim()));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userForm));
}

initForm();
function initForm() {
  let persistedForm = localStorage.getItem(STORAGE_KEY);
  if (persistedForm) {
    persistedForm = JSON.parse(persistedForm);
    Object.entries(persistedForm).forEach(([name, value]) => {
      formRef.elements[name].value = value;
    });
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const inputName = formRef.email.value;
  const inputMessage = formRef.message.value;
  if (inputName && inputMessage !== '') {
    let userForm = localStorage.getItem(STORAGE_KEY);
    userForm = JSON.parse(userForm);
    console.log('Отправляем форму с такими данными', userForm);
    localStorage.removeItem(STORAGE_KEY);
    evt.currentTarget.reset();
    return;
  }
}
