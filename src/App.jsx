import { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';

// Define character sets for password generation
const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Letters
const num = "1234567890"; // Numbers
const ch = "!@#$%^&*()_-+={}[]|\\:;\"'<>,.?/"; // Special characters

function App() {

  // State variables for password customization
  const [length, setLength] = useState(8); // Default password length
  const [hasNumber, setHasNumber] = useState(false); // Toggle numbers
  const [hasCharacter, setHasCharacter] = useState(false); // Toggle special characters
  const [password, setPassword] = useState(""); // Generated password
  const inputRef = useRef(null); // Reference to the input field
  const [hasCopied, setHasCopied] = useState(false); // Copy status

  // Function to copy the generated password to clipboard
  function copyTextToClipboard() {
    inputRef.current?.select(); // Select the text in input field
    inputRef.current?.setSelectionRange(0, length); // Select specific range
    navigator.clipboard.writeText(password) // Copy to clipboard
  }

  // Function to generate a random password
  const getRandomString = useCallback(() => {
    let tempString = str; // Start with alphabets
    let tempPassword = "";

    if (hasNumber) {
      tempString += num; // Include numbers
      tempPassword += num[Math.floor(Math.random() * num.length)]; // Ensure at least one number
    }

    if (hasCharacter) {
      tempString += ch; // Include special characters
      tempPassword += ch[Math.floor(Math.random() * ch.length)]; // Ensure at least one special character
    }

    // Generate the remaining password characters
    const newLength = length - tempPassword.length;
    for (let i = 0; i < newLength; i++) {
      let index = Math.floor(Math.random() * tempString.length);
      tempPassword += tempString[index];
    }

    setPassword(tempPassword); // Update password state
  }, [hasCharacter, hasNumber, length]);

  // Generate a new password whenever dependencies change
  useEffect(() => {
    getRandomString();
  }, [getRandomString]);

  return (
    <>
      <div className="h-96 flex flex-col gap-1 justify-center items-center">
        <h1 className='text-white text-4xl'>🔐 SecureGenX - Password Generator</h1>

        <form className='rounded-xl flex justify-center items-center !p-5 text-2xl text-white bg-gray-900 flex-col gap-4'>
          
          {/* Input field and copy button */}
          <div className="flex">
            <input
              value={password}
              type="text"
              className={`bg-white rounded-l-xl !p-2 text-black ${hasCopied ? "bg-amber-500" : ''}`}
              ref={inputRef}
              readOnly
            />
            <button 
              type="button" 
              onClick={copyTextToClipboard} 
              className='bg-blue-800 rounded-r-xl !p-2 cursor-pointer'
            >
              {hasCopied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Settings: Length, Include Numbers, Include Characters */}
          <div className='flex justify-center items-center text-red-500 gap-5'>

            {/* Password Length Slider */}
            <label className='flex gap-1 justify-center items-center'>
              <input 
                type="range" 
                min={8} 
                max={100} 
                value={length} 
                onChange={(e) => setLength(Number(e.target.value))} 
                className='border-2'
              />
              <p className='w-36 text-center overflow-hidden'>Length: {length}</p>
            </label>

            {/* Toggle Numbers */}
            <label className='flex gap-1 justify-center items-center'>
              <input 
                type="checkbox" 
                checked={hasNumber}
                onChange={() => setHasNumber(!hasNumber)}
              />
              <p>Include Numbers</p>
            </label>

            {/* Toggle Special Characters */}
            <label className='flex gap-1 justify-center items-center'>
              <input 
                type="checkbox" 
                checked={hasCharacter}
                onChange={() => setHasCharacter(!hasCharacter)} 
              />
              <p>Include Special Characters</p>
            </label>
          </div>

        </form>
      </div>
    </>
  );
}

export default App;
