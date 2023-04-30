import React, { useRef } from 'react';
import "./styles.css"

interface Props {
    charactersLimit: number;
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputFeild = ({ charactersLimit, todo, setTodo, handleAdd}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
  
    return (
    <form className="input" onSubmit={(e) => {
            handleAdd(e)
            inputRef.current?.blur();
        }}>
        <input type="input"
            ref={inputRef}
            value={todo}
            onChange={(e) => {
                if(charactersLimit - e.target.value.length >=0)
                    setTodo(e.target.value)
            }}
            placeholder='Enter a task !' className="input_box" 
        />
        <button className = "input_submit" type = 'submit'>Go</button>
    </form>
  )
}

export default InputFeild