import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  // useState hooks
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  //useRef hook
  const passwordRef: React.MutableRefObject<null | HTMLInputElement> =
    useRef(null);

  function shuffleString(charactersToChoose: string) {
    const characterArray = charactersToChoose.split('');
    for (let i = 0; i < characterArray.length; i++) {
      // generate randomIndex
      const randomIndex = Math.floor(Math.random() * charactersToChoose.length);

      // swap charactersToChose[i], charactersToChose[randomIndex]
      const tempChar = characterArray[i];
      characterArray[i] = charactersToChoose[randomIndex];
      characterArray[randomIndex] = tempChar;
    }
    return characterArray.join('');
  }

  const passwordGenerator = useCallback(() => {
    let currentPassword = '';
    const charactersArray = [
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      '0123456789',
      '!@#$%^&*-_+=[]{}~`',
    ];
    let charactersToChoose = charactersArray[0];
    if (numberAllowed) charactersToChoose += charactersArray[1];
    if (charAllowed) charactersToChoose += charactersArray[2];

    // function to shuffle string
    charactersToChoose = shuffleString(charactersToChoose);

    console.log(charactersToChoose);
    for (let i = 0; i < length; i++) {
      // generate randomIndex
      const randomIndex = Math.floor(Math.random() * charactersToChoose.length);
      currentPassword += charactersToChoose.charAt(randomIndex);
    }

    setPassword(currentPassword);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <div className="w-full max-w-md px-4 py-3 mx-auto my-8 text-orange-500 bg-gray-800 rounded-lg shadow-md">
      <h1 className="my-3 text-xl text-center text-white font-extralight">
        Password generator
      </h1>
      <div className="flex mb-4 overflow-hidden rounded-lg shadow">
        <input
          type="text"
          value={password}
          className="w-full px-3 py-1 outline-none"
          placeholder="Password"
          readOnly={true}
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={20}
            value={length}
            className="cursor-pointer"
            id="passwordLengthInput"
            onChange={(e) => {
              setLength(Number(e.target.value));
            }}
          />
          <label htmlFor="passwordLengthInput">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={(e) => {
              setNumberAllowed(e.target.checked);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={(e) => {
              setCharAllowed(e.target.checked);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
