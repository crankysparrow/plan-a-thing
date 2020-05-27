let checkboxes = document.querySelectorAll('.day-data label');
console.log(checkboxes);

let mousedown = false;
let checking = false;


for (let i = 0, len = checkboxes.length; i < len; i++) {
  let checkbox = checkboxes[i].previousElementSibling;

  checkboxes[i].addEventListener('click', function(e) {
    e.preventDefault();
  })

  checkboxes[i].addEventListener('mousedown', function(e) {
    e.preventDefault();
    mousedown = true;
    if (!checkbox.checked) {
      checking = true;
      checkbox.checked = true;
    } else {
      checking = false;
      checkbox.checked = false;
    }
  })

  checkboxes[i].addEventListener('mouseover', function() {
    if (mousedown) {
      checkbox.checked = checking;
    }
  })

}

window.addEventListener('mouseup', function() {
  mousedown = false;
})