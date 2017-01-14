import React from 'react';
import ReactDOM from 'react-dom';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [{id: 1, title: "Clean the room", done: true}, {id: 2, title: "Clean the code", done: false}]
    };
  };

  _handleTaskAdd() {
    const newTaskTitle = this._taskTitle.value;
    let newTaskList = this.state.tasks.slice();
    newTaskList.push({title: newTaskTitle, done: false});    
    this.setState({tasks : newTaskList}); 
  };

  _handleTaskToggle(id, event) {
    let tasks = this.state.tasks.slice();
    let task = tasks.find(task => task.id === id);
    task.done = !task.done;
    this.setState({tasks});
  }

  render() {
    const { tasks } = this.state;    

    return <div><ul className="task-list">{ 
      tasks.map(task => {
        return <li key={task.id}>        
          <label>
           <input type="checkbox" onChange={this._handleTaskToggle.bind(this, task.id)}/>
            {task.title}
          </label>
        </li>})
      }
    </ul>
    <input type='text' placeholder='What should I do?' ref={(input) => this._taskTitle = input}/> 
    <button type="button" onClick={this._handleTaskAdd.bind(this)}>Add</button> 
    </div>
  };
};