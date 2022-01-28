// Validate the heroName when the form is submitted
function validate(event) {
  const firstLetter = form.heroName.value[0];
  if (firstLetter.toUpperCase() === 'X') {
    event.preventDefault();
    alert('Your name is not allowed to start with X!');
  }
}

// Validate the heroName as it is being typed
function validateInline() {
  const heroName = this.value.toUpperCase();
  if (heroName.startsWith('X')) {
    error.style.display = 'block';
  } else {
    error.style.display = 'none';
  }
}

// Disalbe the submit button if an input field is empty
function disableSubmit(event) {
  if (event.target.value === '') {
    document.getElementById('submit').disabled = true;
  } else {
    document.getElementById('submit').disabled = false;
  }
}

// Create a hero JavaScript object and display it
function makeHero(event) {
  event.preventDefault(); // prevent the form from being submitted

  const hero = {}; // create an empty object

  hero.name = form.heroName.value; // create a name property based on the input field's value
  hero.realName = form.realName.value;
  hero.powers = [...form.powers]
    .filter((box) => box.checked)
    .map((box) => box.value);
  hero.category = form.category.value;
  hero.age = form.age.value;
  hero.city = form.city.value;
  hero.origin = form.origin.value;

  alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
  return hero;
}

// Event listeners
const form = document.forms['hero'];
form.addEventListener('submit', validate, false);
form.addEventListener('submit', makeHero, false);
form.heroName.addEventListener('keyup', validateInline, false);
form.heroName.addEventListener('keyup', disableSubmit, false);

// Validation error for heroName
const label = form.querySelector('label');
const error = document.createElement('div');
error.classList.add('error');
error.textContent = '! Your name is not allowed to start with X.';
error.style.display = 'none';
label.append(error);
