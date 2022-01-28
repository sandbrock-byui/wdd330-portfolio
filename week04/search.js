const form = document.forms['search'];
const input = form['searchInput'];

// Work with the form
console.log('form', form);
form.addEventListener(
  'submit',
  (event) => {
    alert(`You searched for ${input.value}`);
    event.preventDefault();
  },
  false
);

// Work with the input control
console.log('input', input);
input.value = 'Search Here';
input.addEventListener('focus', () => console.log('focus'), false);
input.addEventListener('blur', () => console.log('blurred'), false);
input.addEventListener('change', () => console.log('changed'), false);
input.addEventListener(
  'focus',
  function () {
    if (input.value === 'Search Here') {
      input.value = '';
    }
  },
  false
);
input.addEventListener(
  'blur',
  function () {
    if (input.value === '') {
      input.value = 'Search Here';
    }
  },
  false
);
