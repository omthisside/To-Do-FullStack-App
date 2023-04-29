import React, { useEffect, useRef, useState} from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';
import './styles.css';

type Props = {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) => 
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleEdit = (e: React.FormEvent,id: number) => {
        e.preventDefault();
        setTodos(todos.map((todo) => (
            todo.id===id?{...todo, todo:editTodo}: todo
        )));
        setEdit(false);
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {
            (provided, snapshot) => (
                <form className= {`todos_single ${snapshot.isDragging ? "drag" : ""}`} 
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    >
                    {
                        edit ? (
                            <input ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className='todos_single--text' />
                        ) : (
                            todo.isDone ? (
                                <s className="todos_single--text">
                                    {todo.todo}
                                </s>
                            ) : (
                                <span className="todos_single--text">
                                    {todo.todo}
                                </span>
                            )
                        )
                    }
                    <div>
                        <span className="icon" onClick={() => {
                            if (!edit && !todo.isDone) {
                                setEdit(!edit);
                            }
                        }
                        }>
                            <AiFillEdit />
                        </span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}>
                            <AiFillDelete />
                        </span>
                        <span className="icon" onClick={() => handleDone(todo.id)}>
                            <MdDone />
                        </span>
                    </div>
                </form>
            )
        }
    </Draggable>
    )
};

export default SingleTodo;

















// type Actions = 
//     | {type: 'add',payload: string}
//     | {type: 'remove',payload: number}
//     | {type: 'done',payload: number}



// const TodoReducer = (state:Todo[], action: Actions) => {
//     switch (action.type) {
//         case "add":
//             return [
//                 ...state,
//                 {
//                     id: Date.now(), todo: action.payload, isDone: false
//                 }
//             ];
//         case "remove":
//             return state.filter((todo) => todo.id !== action.payload)
//         case "done":
//             return state.map((todo) => 
//                 todo.id !== action.payload ? { ...todo, isDone: !todo.isDone}: todo);
    
//         default:
//             return state;
//     }
// }

// const ReducerExample = () => {
//     const [state, dispatch] = useReducer(TodoReducer, [])
//     return (
//         <div/>
//     )
// }