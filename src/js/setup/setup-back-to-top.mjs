// setUpBackToTopButton.mjs

export function setUpBackToTopButton() {
  const mybutton = document.getElementById('btn-back-to-top');
  // Show the button when the user scrolls down 40px from the top of the document
  window.onscroll = function () {
    if (
      document.body.scrollTop > 40 ||
      document.documentElement.scrollTop > 40
    ) {
      mybutton.style.display = 'block';
    } else {
      mybutton.style.display = 'none';
    }
  };
  // Scroll to the top of the document when the user clicks the button
  mybutton.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}
