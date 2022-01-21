//***************** */
// Exercise 1
//***************** */
// function documentClick(event) {
//   console.log('Something Happened!');
//   console.log('type', event.type);
//   console.log('target', event.target);
//   console.log(
//     `screen: (${event.screenX},${event.screenY}), page: (${event.pageX},${event.pageY}), client: (${event.clientX},${event.clientY})`
//   );
// }

// addEventListener('click', documentClick);

//***************** */
// Exercise 2
//***************** */

function highlight(event) {
  event.target.classList.toggle('highlight');
}

// click
const clickParagraph = document.getElementById('click');

clickParagraph.addEventListener('click', () => console.log('click'));
clickParagraph.addEventListener('mousedown', () => console.log('down'));
clickParagraph.addEventListener('mouseup', () => console.log('up'));

// dblclick
const dblclickParagraph = document.getElementById('dblclick');
dblclickParagraph.addEventListener('dblclick', highlight);

// mouseover, mouseout
const mouseParagraph = document.getElementById('mouse');
mouseParagraph.addEventListener('mouseover', highlight);
mouseParagraph.addEventListener('mouseout', highlight);

// mousemove
mouseParagraph.addEventListener('mousemove', () => console.log('You Moved!'));

// keydown, keyup, keypress
addEventListener('keydown', highlight);
addEventListener('keydown', (event) =>
  console.log(`You pressed the ${event.key} character`)
);
addEventListener('keydown', (event) => {
  if (event.key === 'c' && event.ctrlKey) {
    console.log('Action canceled!');
  }
});
addEventListener('keyup', (event) =>
  console.log(`You stopped pressing the key on ${new Date()}`)
);
addEventListener('keypress', (event) =>
  console.log(`You pressed the ${event.key} character`)
);
addEventListener('click', (event) => {
  if (event.shiftKey) {
    console.log('A Shifty Click!');
  }
});

// touchend
addEventListener('touchend', () => console.log('Touch stopped'));

// removeEventListener
const onceParagraph = document.getElementById('once');
onceParagraph.addEventListener('click', remove);

function remove(event) {
  console.log('Enjoy this while it lasts!');
  onceParagraph.style.backgroundColor = 'pink';
  onceParagraph.removeEventListener('click', remove);
}

// stop default behavior
const brokenLink = document.getElementById('broken');

brokenLink.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('Broken Link!');
});

// bubbling events
ulElement = document.getElementById('list');
liElement = document.querySelector('#list li');

ulElement.addEventListener('click', (event) => console.log('Clicked on ul'));

liElement.addEventListener('click', (event) => console.log('Clicked on li'));

// capturing events
ulElement.addEventListener(
  'click',
  (event) => console.log('Clicked on ul'),
  true
);

liElement.addEventListener(
  'click',
  (event) => console.log('Clicked on li'),
  true
);

// stopPropogation
liElement.addEventListener(
  'click',
  (event) => {
    console.log('clicked on li');
    event.stopPropagation();
  },
  false
);

// delegation
ulElement.addEventListener('click', highlight);
