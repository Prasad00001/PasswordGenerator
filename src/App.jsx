import { useState , useEffect, useCallback, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [num, setNum]=useState(false)
  const [char, setChar]=useState(false)
  const [Password, setPassword]=useState("")
  //useRef Hooks
  const passwordRef=useRef("")
  const passwordGeneretor=useCallback(()=>{
    let pass=""
    let str="ASDFGHJKLMNBVCXZQWERTYUIOPpoiuytrewqasdfghjklmnbvcxz"
    if(num)str+="0123456789"
    if(char)str+="~!@#$%^&*()><?:{}|][;'/.,;`"
    for (let i = 1; i <= length; i++) {
      let charp=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(charp)
    }
    setPassword(pass)
  },[length, num, char, setPassword])
  const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(3,12)
    window.navigator.clipboard.writeText(Password)
  },[Password])
  useEffect(()=>{
    passwordGeneretor()
  },[length, char, num, passwordGeneretor, passwordRef])
  console.log(Password);
  return (
    <>
      <h2 className='text-4xl justify-center'>Password Generator</h2>
      <div className='w-full max-v-md mx-auto shadow-md rounded-lg px-4 text-orange-500 bg-gray-700'>
        <div className='flex shadow rounded-xl overflow-hidden mb-4'>
          <input type="text" 
            value={Password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipBoard}>copy</button>
        </div>
        <div className='flx text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range'
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>

          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type='checkbox'
            defaultChecked={num}
            id='numIn'
            onChange={()=>{
              setNum((prev)=>!prev)
            }}
            /><label id='numIn'>Number</label>
            <input 
            type='checkbox'
            defaultChecked={char}
            id='charIn'
            onChange={()=>{
              setChar((prev)=>!prev)
            }}
            /><label id='CharIn'>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
