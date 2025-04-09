document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    let lastKey = null;
    let lastClickTime = 0;
    let clickCount = 0;
  
    document.querySelectorAll('.key').forEach(button => {
      button.addEventListener('click', () => {
        const currentTime = new Date().getTime();
        const letters = button.getAttribute('data-letters');
  
        if (button === lastKey && (currentTime - lastClickTime) < 800) {
          // Als dezelfde knop snel achter elkaar wordt geklikt, verhoog de clickCount
          clickCount = (clickCount + 1) % letters.length;
          // Verwijder het laatste teken en voeg het nieuwe toe
          output.textContent = output.textContent.slice(0, -1) + letters[clickCount];
        } else {
          // Voeg een nieuw teken toe
          output.textContent += letters[0];
          clickCount = 0;
        }
  
        lastKey = button;
        lastClickTime = currentTime;
      }); 
    });
     document.getElementById('backSpace').addEventListener('click', () => {
        const output = document.getElementById('output');
        output.textContent = output.textContent.substring(0, output.textContent.length-1)
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
  