import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

let num = 0;

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [addTodoMessage, setAddTodoMessage] = useState('addTodoMessageHide');

  function handleCreateNewTask(e: any) {
    e.preventDefault();
    if (newTaskTitle === '') {
      setAddTodoMessage('addTodoMessageShow');
      return;
    }
    setTasks((state) => [...state, { id: num, title: newTaskTitle, isComplete: false }]);
    setNewTaskTitle('');
    setAddTodoMessage('addTodoMessageHide');
    num++;
  }

  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map((item) => {
      if (item.id == id) {
        return { ...item, isComplete: !(item.isComplete) };
      } return item;
    })

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    const filteredList = tasks.filter((item) => {
      return item.id !== id;
    })

    setTasks(filteredList)

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <form onSubmit={handleCreateNewTask}>
            <input
              type="text"
              placeholder="Adicionar novo todo"
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <span className={addTodoMessage}>Digite algo</span>
            <button type="submit" data-testid="add-task-button">
              <FiCheckSquare size={16} color="#fff" />
            </button>
          </form>
        </div>
      </header>


      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}