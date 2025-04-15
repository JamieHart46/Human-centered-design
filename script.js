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

