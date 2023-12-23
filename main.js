const keyCodes = {
  ru: [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
    'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
    'LShift', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', '↑', 'RShift',
    'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'
  ],
  ruUC: [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 'Del',
    'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter',
    'LShift', '\\', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '/', '↑', 'RShift',
    'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'
  ],
  en: [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
    'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
    'LShift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'RShift',
    'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'
  ],
  enUC: [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'Del',
    'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter',
    'LShift', '\\', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '↑', 'RShift',
    'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'
  ]
};

let currentLang = localStorage.getItem('currentLang');
if (!currentLang) {
  currentLang = 'en';
  localStorage.setItem('currentLang', currentLang);
}

function generateButtons(lang) {
  const keymap = keyCodes[lang];
  const keyButtonContainer = new DocumentFragment();
  keymap.map(key => {
    const keyButton = document.createElement('button');
    keyButton.classList.add('keyboard-list__button');
    keyButton.dataset.keyCode = key;
    keyButton.textContent = key;
    keyButtonContainer.append(keyButton);
    return true;
  });
  return keyButtonContainer;
}
function createKeyboard() {
  const keyboard = document.createElement('form');
  const keyboarWrapper = document.createElement('div');
  const textAreaWrapper = document.createElement('fieldset');
  const textArea = document.createElement('textarea');

  keyboard.classList.add('keyboard');
  keyboarWrapper.classList.add('keyboard-list');

  textAreaWrapper.append(textArea);
  keyboarWrapper.append(generateButtons(currentLang));
  keyboard.append(textAreaWrapper, keyboarWrapper);
  return keyboard;
}

function renderContent() {
  const pageKeyboard = createKeyboard();
  document.body.append(pageKeyboard);
}
document.addEventListener('DOMContentLoaded', renderContent);

document.addEventListener('keydown', (event) => {
  let key = event.key;
  const keyMap = {
    32: 'Space',
    91: 'Win',
    17: 'Ctrl',
    18: 'Alt',
    16: 'Shift',
  };
  key = keyMap[event.keyCode] || key;
  const virtualKey = document.querySelector(`button[data-key-code="${key}"]`);
  if (virtualKey) virtualKey.classList.add('active');
});

document.addEventListener('keyup', (event) => {
  let key = event.key;
  const keyMap = {
    32: 'Space',
    91: 'Win',
    17: 'Ctrl',
    18: 'Alt',
    16: 'Shift',
  };
  key = keyMap[event.keyCode] || key;
  const virtualKey = document.querySelector(`button[data-key-code="${key}"]`);
  if (virtualKey) virtualKey.classList.remove('active');
});


// Tab

document.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    event.preventDefault();
  }
});

// Delete

document.addEventListener('keydown', (event) => {
  if (event.key === 'Delete') {
    const textArea = document.querySelector('textarea');
    textArea.value = textArea.value.slice(0, -1);
  }
});

// Language

let isShiftPressed = false;
let isLAltPressed = false;

document.addEventListener('keydown', (event) => {
  if (event.key === 'Shift') {
    isShiftPressed = true;
  }
  if (event.key === 'Alt') {
    isLAltPressed = true;
  }
  if (isShiftPressed && isLAltPressed) {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    const keyboardList = document.querySelector('.keyboard-list');
    keyboardList.innerHTML = '';
    keyboardList.append(generateButtons(currentLang));
    localStorage.setItem('currentLang', currentLang);
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'Shift') {
    isShiftPressed = false;
  }
  if (event.key === 'Alt') {
    isLAltPressed = false;
  }
});

// Shift

document.addEventListener('keydown', (event) => {
  if (event.key === 'Shift') {
    isShiftPressed = true;
    
    if (isShiftPressed && isLAltPressed) {
      currentLang = currentLang === 'en' ? 'ru' : 'en';
      localStorage.setItem('currentLang', currentLang);
    }
    const keyboardList = document.querySelector('.keyboard-list');
    keyboardList.innerHTML = '';
    keyboardList.append(generateButtons(currentLang + 'UC'));
  }
  if (event.key === 'Alt') {
    isLAltPressed = true;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'Shift') {
    isShiftPressed = false;
    const keyboardList = document.querySelector('.keyboard-list');
    keyboardList.innerHTML = '';
    keyboardList.append(generateButtons(currentLang));
  }
  if (event.key === 'Alt') {
    isLAltPressed = false;
  }
});

// CapsLock

let isCapsLockOn = false;

document.addEventListener('keydown', (event) => {
  if (event.key === 'CapsLock') {
    isCapsLockOn = !isCapsLockOn;
    
    const keyboardList = document.querySelector('.keyboard-list');
    keyboardList.innerHTML = '';
    if (isCapsLockOn) {
      keyboardList.append(generateButtons(currentLang + 'UC'));
      let key = event.key;
      const keyMap = {
        20: 'CapsLock ',
      };
      key = keyMap[event.keyCode] || key;
      const virtualKey = document.querySelector(`button[data-key-code="CapsLock"]`);
      if (virtualKey) virtualKey.classList.add('active');
    } else {
      keyboardList.append(generateButtons(currentLang));
      let key = event.key;
      const keyMap = {
        20: 'CapsLock ',
      };
      key = keyMap[event.keyCode] || key;
      const virtualKey = document.querySelector(`button[data-key-code="CapsLock"]`);
      if (virtualKey) virtualKey.classList.add('active');
    }
  }
});

// Theme

let isThemeChanged = false;

document.addEventListener('keydown', (event) => {
  if (event.altKey && event.key === 'v') {
    const buttons = document.querySelectorAll('.keyboard-list__button');
    buttons.forEach(button => {
      if (!isThemeChanged) {
        button.style.backgroundColor = 'rgb(255, 51, 129)';
      } else {
        button.style.backgroundColor = ''; 
      }
    });

    isThemeChanged = !isThemeChanged; 
  }
});
