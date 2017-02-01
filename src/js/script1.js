const navItems = document.querySelectorAll('.nav-list > li');
const content = document.querySelectorAll('.content');

function handleEnter() {
  if (this.classList.contains('item-1')) {
    content[1].classList.remove('visable-1', 'visable-2');
    content[2].classList.remove('visable-1', 'visable-2');

    content[0].classList.add('visable-1');
    setTimeout(() => content[0].classList.add('visable-2'), 150);
  }

  if (this.classList.contains('item-2')) {
    content[0].classList.remove('visable-1', 'visable-2');
    content[2].classList.remove('visable-1', 'visable-2');

    content[1].classList.add('visable-1');
    setTimeout(() => content[1].classList.add('visable-2'), 150);
  }

  if (this.classList.contains('item-3')) {
    content[0].classList.remove('visable-1', 'visable-2');
    content[1].classList.remove('visable-1', 'visable-2');

    content[2].classList.add('visable-1');
    setTimeout(() => content[2].classList.add('visable-2'), 150);
  }
}

navItems.forEach(item => item.addEventListener('mouseenter', handleEnter));
