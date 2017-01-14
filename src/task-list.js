import React from 'react';
import ReactDOM from 'react-dom';

const STORAGE_KEY = "taskManagerTasks";

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this._fetchTasks(),
      editing: false
    };
  }

  _fetchTasks() {
    let tasks;
    console.log('fetching: ', localStorage[STORAGE_KEY]);
    if (localStorage[STORAGE_KEY]) {
	  tasks = JSON.parse(localStorage[STORAGE_KEY]);
    }
	else {
	  tasks =
		[{id: 1, title: "Clean the room", done: true}, 
         {id: 2, title: "Clean the code", done: false}];
	}
    return tasks;
  }

   _saveTasks() {
    //console.log(JSON.stringify(this.state.tasks));
    localStorage[STORAGE_KEY] = JSON.stringify(this.state.tasks);
  }

  _generateNewTaskId() {
    return Math.max(...this.state.tasks.map(t => t.id)) + 1;
  } 

  _updateTask(id, property, newValue) {
    let tasks = this.state.tasks.slice(),
      task = tasks.find(task => task.id === id);
    task[property] = newValue;
    this.setState({tasks}, () => this._saveTasks()); 
  }

  _handleTaskAdd() {
    let newTaskTitle = this._taskTitle.value,
      newTaskList = this.state.tasks.slice();
    newTaskList.push({id: this._generateNewTaskId(), title: newTaskTitle, done: false});    
    this.setState({tasks : newTaskList}, () => this._saveTasks());
    this._taskTitle.value = '';
  }

  _handleTaskDelete(id) {    
    let tasks = this.state.tasks.slice(),
      taskIndex = tasks.findIndex(task => task.id === id);
    tasks.splice(taskIndex, 1);
    this.setState({tasks}, () => this._saveTasks());    
  }

  _handleTaskToggle(id, event) {   
    this._updateTask(id, 'done', event.target.checked);
  }

  _handleTaskEditing(id, event) {
    this._updateTask(id, 'title', event.target.value);
  }

  _toggleTaskEditing() {
    this.setState({editing: !this.state.editing});
  }

  _getSortedTasks() {
    let { tasks } = this.state;
    return tasks.sort((a,b) => {
        let aTitle = a.title.toLowerCase(),
          bTitle = b.title.toLowerCase();
        if (aTitle > bTitle) { return -1; }
        if (aTitle < bTitle) { return 1; }
        if (aTitle === bTitle) { return 0; }
    });
  }

  render() {
    const tasks = this._getSortedTasks(),
      isEditing = this.state.editing;
    
    return <div><ul className="task-list">{ 
      tasks.map(task => {
        return <li key={task.id && task.id.toString()}>
          <label>
           <input type="checkbox" checked={task.done} onChange={this._handleTaskToggle.bind(this, task.id)}/>
             { isEditing ?
               <input type='text' onChange={this._handleTaskEditing.bind(this, task.id)} value={task.title}/>                 
               :
               task.title 
             }
          </label>&nbsp;
          <button type="button" onClick={this._handleTaskDelete.bind(this, task.id)}>Delete</button> 
        </li>})
      }
    </ul>
    <input type='text' placeholder='What should I do?' ref={(input) => this._taskTitle = input}/> 
    <button type="button" onClick={this._handleTaskAdd.bind(this)}>Add</button>
    <br/><br/>
    <button type="button" onClick={this._toggleTaskEditing.bind(this)}>
      { isEditing ? 'Finish editing' : 'Edit tasks' }
    </button>
    </div>
  };
};