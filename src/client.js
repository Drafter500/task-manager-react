import React from 'react';
import ReactDOM from 'react-dom';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [{title: "Clean the room", done: true}, {title: "Clean the code", done: false}]
    };
  };

  _handleTaskAdd(event) {
    const newTaskTitle = this._todoTitle.value;
    let newTaskList = this.state.tasks.slice();
    newTaskList.push({title: newTaskTitle, done: false});    
    this.setState({tasks : newTaskList}); 
  };

  render() {
    const { tasks } = this.state;    

    return <div><ul>{ 
      tasks.map(task => {
        return <li>{task.title}</li>})
      }
    </ul>
    <input type='text' placeholder='What should I do?' ref={(input) => this._todoTitle = input}/> 
    <button type="button" onClick={this._handleTaskAdd.bind(this)}>Add</button> 
    </div>
  };
};

ReactDOM.render(
  <TaskList />,
  document.getElementById('root')
);