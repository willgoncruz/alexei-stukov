import React from 'react';
import request from 'axios';
import ProjectCard from '../Project/ProjectCard';
import CreateProjectPage from '../Project/CreateProjectPage';
import LeftMenu from '../Menu/LeftMenu';
import Header from '../Header/Header';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const API_URL = 'http://18.228.31.90/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      projects: []
    };
  }

  componentWillMount() {
    request.get(`${API_URL}/projects/`)
    .then(response => {
      this.setState({
        projects: response.data
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

  updateSize = () => {
    this.setState({
      width: window.innerWidth
    });
  }

  render() {
    return (
      <div style={{flexGrow: 1}}>
        <Header hasSearch={true} />
        <LeftMenu />
        <div id="project-container" className="flex-container inner-padding">
        {this.state.projects.map(project =>
          <ProjectCard  key={project.id} className="w-sm"
                        href={project.url}
                        name={project.name}
                        description={project.description}
                        imageUrl="https://cdn.blizzardwatch.com/wp-content/uploads/2016/12/Gingerdread-Header-120916.jpg"
          />
        )}

      </div>
      <div className="pinned-right">
          <Button variant="fab" color="secondary" aria-label="add">
            <AddIcon />
          </Button>
        </div>
      </div>
      
    );
  }
}

export default Home;
