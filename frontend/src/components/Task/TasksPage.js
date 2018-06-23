import React from 'react';
import request from 'axios';
import LeftMenu from '../Menu/LeftMenu';
import Header from '../Header/Header';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TaskCard from '../Task/TaskCard';
import ModalContainer from '../Modal/ModalContainer';
import CreateTaskPage from './CreateTaskPage';

const API_URL = 'http://18.228.31.90/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      modalOpen: false,
      tasks: []
    };

    this.toggleModal = this.toggleModal.bind(this)
    this.closeModalSave = this.closeModalSave.bind(this)
  }

  componentWillMount() {
    request.get(`${API_URL}/tasks/`)
    .then(response => {

      this.setState({
        modalOpen: false,
        tasks: response.data.sort((t1, t2) => {return t1.id - t2.id})
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

  redirectNewTask = () => this.props.history.push('/tasks/new')

  render() {
    return (
      <div>
        <Header hasSearch={true}/>
        <LeftMenu />
        <div id="tasks-container" className="flex-container inner-padding left-menu-padding">
        {this.state.tasks.map(task =>
          <TaskCard key={task.id} name={task.name} date={task.date_limit} href={`/tasks/${task.id}`} className={'w-sm'} />
        )}

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

export default Home;
