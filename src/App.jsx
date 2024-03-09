import { useState, useCallback, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const [length, setlength] = useState(8)

  const [numAllow, setnumAllow] = useState(false)

  const [charAllow, setcharAllow] = useState(false)

  const [password, setPassword] = useState("")

  const passwordRef=useRef(null)
  
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllow) str += "0123456789"

    if (charAllow) str += "!@#$%^&*"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)

    }

    setPassword(pass)

  }, [length, numAllow, charAllow, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllow, charAllow, passwordGenerator])
  return (
    <>
      <h1>Password Generator</h1>
      <div className='row '>

        <div className='col column flex'>
          <input class="form-control" type="text" value={password} aria-label="Disabled input example" disabled readonly
            ref={passwordRef}></input>

          <div class="row in">
            <div class="col-lg-4 in">
              <div class="input-group">
                <div class="input-group-text">
                  <input class="form-check-input" type="checkbox" value={numAllow} aria-label="Checkbox 1"
                    onChange={() => {
                      setnumAllow((prev) => !prev)
                    }}></input>
                </div>
                <div class="form-check">
                  <label class="form-check-label">Numbers</label>
                </div>
              </div>
            </div>
            <div class="col-lg-4 in">
              <div class="input-group">
                <div class="input-group-text">
                  <input class="form-check-input" type="checkbox" value={charAllow} aria-label="Checkbox 1"
                    onChange={() => {
                      setcharAllow((prev) => !prev)
                    }}></input>
                </div>
                <div class="form-check">
                  <label class="form-check-label">Character</label>
                </div>
              </div>
            </div>
            <div class="col-lg-4 in">
              <input type="range" class="form-range" id="formRange"
                value={length}
                onChange={(e) => { setlength(e.target.value) }}
              ></input>
              <div class="form-check">
                <label class="form-check-label">length:{length}</label>
              </div>
            </div>
          </div>


          <button type="button" class="btn btn-primary" onClick={copyPasswordToClipboard}>Copy</button>
        </div>



      </div>
    </>
  )
}

export default App
