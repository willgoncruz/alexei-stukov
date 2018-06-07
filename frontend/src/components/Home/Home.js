import React from 'react';
import request from 'axios';
import ProjectCard from '../Project/ProjectCard';
import CreateProjectPage from '../Project/CreateProjectPage';

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
      <div id="project-container" className="flex-container inner-padding">
        {this.state.projects.map(project =>
          <ProjectCard  key={project.id} className="w-sm"
                        href={project.url}
                        name={project.name}
                        description={project.description}
                        imageUrl="https://cdn.blizzardwatch.com/wp-content/uploads/2016/12/Gingerdread-Header-120916.jpg"
          />
        )}

        <CreateProjectPage open={true} fullScreen={this.state.width <= 600}/>
      </div>
    );
  }
}

export default Home;
