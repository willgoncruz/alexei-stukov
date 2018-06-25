import React from 'react';
import request from 'axios';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TaskCard from '../Task/TaskCard';
import ModalContainer from '../Modal/ModalContainer';
import CreateTaskPage from './CreateTaskPage';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import tasksJson from './tasks.json';

const API_URL = 'http://18.228.31.90/api';

const styles = {
  statusCard: {
    backgroundColor: '#ddd'
  },
  taskCard: {
    marginBottom: '10px'
  },
  taskCardTitle: {
    color: '#fff',
    textShadow: '0px 0px 2px #000'
  }
};

class TasksPage extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      modalOpen: false,
      tasks: [],
      tasks_backlog: [],
      tasks_todo: [],
      tasks_doing: [],
      tasks_done: []
    };

    this.toggleModal = this.toggleModal.bind(this)
    this.closeModalSave = this.closeModalSave.bind(this)
  }

  componentWillMount() {
    request.get(`${API_URL}/tasks/`)
    .then(response => {

      const tasks = tasksJson.sort((t1, t2) => {return t1.id - t2.id});//response.data.sort((t1, t2) => {return t1.id - t2.id});
      
      this.setState({
        modalOpen: false,
        tasks: tasks,
        tasks_backlog: tasks.filter(t => t.status === 'backlog'),
        tasks_todo: tasks.filter(t => t.status === 'todo'),
        tasks_doing: tasks.filter(t => t.status === 'doing'),
        tasks_done: tasks.filter(t => t.status === 'done')
      });
    })
    .catch(e => {

    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateSize);
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateSize);
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  closeModalSave() {
    this.componentWillMount()
  }

  updateSize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  handleTaskStatusChange = (status, taskId) => {
    const task = this.state.tasks.find(t => t.id === taskId);
   
    task.status = status;

    request.put(`${API_URL}/tasks/${taskId}/`, task)
    .then(response => {
      return request.get(`${API_URL}/tasks/`);
    })
    .then(response => {
      const tasks = response.data.sort((t1, t2) => {return t1.id - t2.id});

      this.setState({
        tasks: tasks,
        tasks_backlog: tasks.filter(t => t.status === 'backlog' || t.status === undefined),
        tasks_todo: tasks.filter(t => t.status === 'todo'),
        tasks_doing: tasks.filter(t => t.status === 'doing'),
        tasks_done: tasks.filter(t => t.status === 'done')
      });
    })
    .catch(err => {

    });
  }

  redirectNewTask = () => this.props.history.push('/tasks/new')

  render() {
    return (
      <div>
        <div id="tasks-container" className="flex-container inner-padding left-menu-padding">
          <Card className={`w-sm flex-container--column ${this.props.classes.statusCard}`}>
            <CardHeader title={<span className={this.props.classes.taskCardTitle}>Backlog</span>} />
            <CardContent>
              {this.state.tasks_backlog.map(task =>
                <TaskCard key={task.id}
                          id={task.id}
                          name={task.name}
                          date={task.date_limit}
                          href={`/tasks/${task.id}`}
                          className={`w-xl ${this.props.classes.taskCard}`}
                          onTaskStatusChange={this.handleTaskStatusChange}/>
              )}
            </CardContent>
          </Card>

          <Card className={`w-sm flex-container--column ${this.props.classes.statusCard}`}>
            <CardHeader title={<span className={this.props.classes.taskCardTitle}>To do</span>} />
            <CardContent>
              {this.state.tasks_todo.map(task =>
                <TaskCard key={task.id}
                          id={task.id}
                          name={task.name}
                          date={task.date_limit}
                          href={`/tasks/${task.id}`}
                          className={`w-xl ${this.props.classes.taskCard}`}
                          onTaskStatusChange={this.handleTaskStatusChange}/>
              )}
            </CardContent>
          </Card>

          <Card className={`w-sm flex-container--column ${this.props.classes.statusCard}`}>
            <CardHeader title={<span className={this.props.classes.taskCardTitle}>Doing</span>} />
            <CardContent>
              {this.state.tasks_doing.map(task =>
                <TaskCard key={task.id}
                          id={task.id}
                          name={task.name}
                          date={task.date_limit}
                          href={`/tasks/${task.id}`}
                          className={'w-xl'} style={{marginBottom: '10px'}}
                          onTaskStatusChange={this.handleTaskStatusChange}/>
              )}
            </CardContent>
          </Card>

          <Card className={`w-sm flex-container--column ${this.props.classes.statusCard}`}>
            <CardHeader title={<span className={this.props.classes.taskCardTitle}>Done</span>} />
            <CardContent>
              {this.state.tasks_done.map(task =>
                <TaskCard key={task.id}
                          id={task.id}
                          name={task.name}
                          date={task.date_limit}
                          href={`/tasks/${task.id}`}
                          className={'w-xl'} style={{marginBottom: '10px'}}
                          onTaskStatusChange={this.handleTaskStatusChange}/>
              )}
            </CardContent>
          </Card>
        

        </div>
        <div className="pinned-right">
          <Button variant="fab" color="secondary" aria-label="add" onClick={this.toggleModal}>
            <AddIcon />
          </Button>
        </div>
        <ModalContainer open={this.state.modalOpen} onClick={this.toggleModal} closeModalSave={this.closeModalSave}>
          <CreateTaskPage />
        </ModalContainer>
      </div>
    );
  }
}

export default withStyles(styles)(TasksPage);
