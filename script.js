document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const capsCheckbox = document.getElementById('caps');
    let lastKey = null;
    let lastClickTime = 0;
    let clickCount = 0;
  
    document.querySelectorAll('.key').forEach(button => {
      button.addEventListener('click', () => {
        const currentTime = new Date().getTime();
        const letters = button.getAttribute('data-letters');
        const isCaps = capsCheckbox.checked;

        // Als een knop met id="Key" geclickt wordt, 
        // kijkt het wat er voor input er in de data-letters staat en voegt het dat toe aan de output.
  
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

      lastKey = button;
      lastClickTime = currentTime;
      }); 
    });
     document.getElementById('backSpace').addEventListener('click', () => {
        output.value = output.value.substring(0, output.value.length-1)
      });
    
      // Selecteerd en kopieerd de tekst in de output
      document.getElementById('copy').addEventListener('click', function () {
      output.select(); 
      output.setSelectionRange(0, 99999);
  
      // Alert voor het kopieren naar klembord
      navigator.clipboard.writeText(output.value).then(() => {
        alert('Tekst gekopieerd naar klembord!');
      }).catch(err => {
        console.error('Kopieren naar klembord mislukt: ', err);
      });
    });
  });

