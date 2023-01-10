import React, { useReducer, useRef } from 'react';

const Task = () => {
  // Random ID
  const generateID = () => {
    const random = Math.random().toString(32).substring(2);
    const date = Date.now().toString(32);
    return random + date;
  };

  const titleRef = useRef();
  const descriptionRef = useRef();

  const [tasks, dispatach] = useReducer((state = [], action) => {
    switch (action.type) {
      case 'ADD_TASK': {
        return [
          ...state,
          {
            id: generateID(),
            title: action.title,
            description: action.description,
          },
        ];
      }
      case 'REMOVE_TASK': {
        return state.filter((task) => {
          return task.id != action.id;
        });
      }
      default: {
        return state;
      }
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatach({
      type: 'ADD_TASK',
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    });
  };

  const removeTask = (idToRemove) => {
    return dispatach({ type: 'REMOVE_TASK', id: idToRemove });
  };

  return (
    <div className='container'>
      <div className='row text-center'>
        <div className='col-12' id='title'>
          <h1 className='py-5'>Task Manager</h1>
        </div>
      </div>
      <div className='row g-5 text-center'>
        <div className='col-4'>
          <div className='bg-primary rounded' id='task-form'>
            <h3 className='py-2 text-light'>Task Form</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='taskName' className='form-label'>
                Task name
              </label>
              <input type='text' name='title' ref={titleRef} className='form-control' id='taskName' placeholder='Insert your task name' required />
            </div>
            <div className='mb-3'>
              <label htmlFor='taskDescription' className='form-label'>
                Task description
              </label>
              <textarea type='textarea' ref={descriptionRef} name='description' className='form-control' id='taskDescription' placeholder='Insert your task description' required />
            </div>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
        </div>
        <div className='col-8'>
          <div className='bg-secondary rounded' id='task-list'>
            <h3 className='py-2 text-light'>Task List</h3>
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Title</th>
                <th scope='col'>Description</th>
                <th scope='col'>Option</th>
              </tr>
            </thead>
            <tbody>
              {tasks &&
                tasks.map((task) => (
                  <tr key={task.id}>
                    <th scope='row' className='text-start'>
                      {task.id}
                    </th>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                      <button onClick={() => removeTask(task.id)} className='badge btn btn-danger'>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Task;
