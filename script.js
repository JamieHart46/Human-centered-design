document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');
  const capsCheckbox = document.getElementById('caps');
  const showCheckbox = document.getElementById('numbers'); // Select the checkbox with id="numbers"
  const letterKeyboard = document.getElementById('letterKeyboard');
  const numberKeyboard = document.getElementById('numberKeyboard'); // Select the keyboard with id="numberKeyboard"
  let lastKey = null;
  let lastClickTime = 0;
  let clickCount = 0;

  showCheckbox.addEventListener('change', () => {
    if (showCheckbox.checked) {
        letterKeyboard.hidden = true; // Hide the letter keyboard
        numberKeyboard.hidden = false; // Show the number keyboard
    } else {
        letterKeyboard.hidden = false; // Show the letter keyboard
        numberKeyboard.hidden = true; // Hide the number keyboard
    }
});

    document.querySelectorAll('.key').forEach(button => {
      button.addEventListener('click', () => {
        const currentTime = new Date().getTime();
        const letters = button.getAttribute('data-letters');
        const isCaps = capsCheckbox.checked;
  
        let selectedChar;
      if (button === lastKey && (currentTime - lastClickTime) < 800) {
        clickCount = (clickCount + 1) % letters.length;
        selectedChar = letters[clickCount];
        if (isCaps) selectedChar = selectedChar.toUpperCase();
        output.value = output.value.slice(0, -1) + selectedChar;
      } else {
        selectedChar = letters[0];
        if (isCaps) selectedChar = selectedChar.toUpperCase();
        output.value += selectedChar;
        clickCount = 0;
      }

      button.style.backgroundColor = 'green';
      button.style.color = 'white'; 
      button.style.fontWeight = 'bold';

      // Laat zien of the letter in de output nog veranderd kan worden worden, of dat de letter gebackspaced moet worden en 
      // opnieuw moet worden getypt.
      if (button.timeoutId) {
          clearTimeout(button.timeoutId); 
      }
      button.timeoutId = setTimeout(() => {
          button.style.backgroundColor = '';
          button.style.color = '';
          button.style.fontWeight = 'normal';
          button.timeoutId = null; 
      }, 800);

      lastKey = button;
      lastClickTime = currentTime;
      }); 
    });
     document.getElementById('backSpace').addEventListener('click', () => {
        const output = document.getElementById('output');
        output.value = output.value.substring(0, output.value.length-1)
      });
    
      document.getElementById('copy').addEventListener('click', function () {
      const output = document.getElementById('output'); // Selecteer het textarea
      output.select(); // Selecteer de tekst in het textarea
      output.setSelectionRange(0, 99999); // Voor mobiele apparaten
  
      // Kopieer de tekst naar het klembord
      navigator.clipboard.writeText(output.value).then(() => {
        alert('Tekst gekopieerd naar klembord!'); // Optionele feedback
      }).catch(err => {
        console.error('Fout bij het kopiëren naar klembord: ', err);
      });
    });
  });
