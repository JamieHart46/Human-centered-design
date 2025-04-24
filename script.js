document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');
  const capsCheckbox = document.getElementById('caps');
  const keys = document.querySelectorAll('.key');
  // console.log('keys:', keys);
  const showCheckbox = document.getElementById('numbers'); 
  const letterKeyboard = document.getElementById('letterKeyboard');
  const numberKeyboard = document.getElementById('numberKeyboard'); 
  let lastKey = null;
  let lastClickTime = 0;
  let clickCount = 0;

  showCheckbox.addEventListener('change', () => {
    if (showCheckbox.checked) {
        letterKeyboard.hidden = true; 
        numberKeyboard.hidden = false; 
        // Als de checkbox checked is, dan is hidden true voor het toetsenbord met letters 
        // en false voor het toetsenbord met nummers en zie je dus alleen de nummers
    } else {
        letterKeyboard.hidden = false; 
        numberKeyboard.hidden = true;  
        // en de else is dus als het niet checked is, dan is het andersom en zie je dus alleen de letters.
    }
});

capsCheckbox.addEventListener('change', () => {
  keys.forEach(button => {
      if (capsCheckbox.checked) {
          button.textContent = button.textContent.toUpperCase();
          console.log(button.textContent);
      } else {
          button.textContent = button.textContent.toLowerCase();
      }
  });
});
// Voegt een eventlistener aan de checkbox voor caps toe en bekijkt dan of deze checked is. 
// Als dit zo is dan wordt de textcontent van alle buttons omgezet naar hoofdletters, zodat te zien is
// op het toetsenbord dat capslock aanstaat.

    document.querySelectorAll('.key').forEach(button => {
      button.addEventListener('click', () => {
        const currentTime = new Date().getTime();
        const letters = button.getAttribute('data-letters');
        const isCaps = capsCheckbox.checked;
      // letters haalt de letters op die n de data-letters attribute staan van de button die je hebt geklikt.
  
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
      // Dit telt hoevaak er geklikt is met clickCount en kijkt dan welke data-letter er voor dat aantal in de button staat.
      // Als je dus 2 keer op de button klikt, dan krijg je de tweede letter in de button.
      // En dan checkt ie of Capslock aanstaat en zo wel maakt het van de letter met toUpperCase() een hoofdletter.

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
      // Als de button nog binnen de timer van de TimeOut zit (die 800ms is) wordt de style van de button groen en de tekst erin wit en bold.
      // Daarna als de timer afloopt en de actieve staat weg is, wordt de button weer de originele kleur en font.

      lastKey = button;
      lastClickTime = currentTime;
      }); 
    });
     document.getElementById('backSpace').addEventListener('click', () => {
        const output = document.getElementById('output');
        output.value = output.value.substring(0, output.value.length-1)
      });
    
      document.getElementById('copy').addEventListener('click', function () {
      const output = document.getElementById('output'); 
      output.select(); 
      // Voegt een evenlistener toe aan de copy button, en als deze geclickt wordt select het alles in de output.s
      output.setSelectionRange(0, 99999); 
  
      // Kopieer de geselecteerde tekst naar het klembord en geeft een alert als dit gelukt is en een error melding als het niet lukt
      navigator.clipboard.writeText(output.value).then(() => {
        alert('Tekst gekopieerd naar klembord!'); 
      }).catch(err => {
        console.error('Fout bij het kopiëren naar klembord: ', err);
      });
    });
  });
