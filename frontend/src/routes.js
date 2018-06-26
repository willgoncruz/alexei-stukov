import React from 'react'
import { Router, Switch, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import App from './App'
import Home from './components/Home/Home'
import TasksPage from './components/Task/TasksPage'
import CreateTaskPage from './components/Task/CreateTaskPage';
import TaskInfoPage from './components/Task/TaskInfoPage';
import ProjectStatisticsPage from './components/Project/ProjectStatisticsPage';
import ProjectInfoPage from './components/Project/ProjectInfoPage';
import Header from './components/Header/Header'
import LeftMenu from './components/Menu/LeftMenu'


export const history = createBrowserHistory()

export const PropsRoute = ({ component: Component, ...props }) => (
	<Route
	  { ...props }
	  render={ renderProps => (<Component { ...renderProps } { ...props } />) }
	/>
  );

class Routes extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			projectId : false
		}

		this.changeMenu = this.changeMenu.bind(this);
	}

	changeMenu(pid){
		this.setState({
			projectId : pid
		})
	}

	render() {
		return(
		<Router history={history}>
			<App classname="App">
				<Header hasSearch />
					
				<LeftMenu projectId={this.state.projectId}/>
				<Switch>
					<PropsRoute exact path="/" component={Home} changeMenu={this.changeMenu}/>
					<PropsRoute path="/home" component={Home} changeMenu={this.changeMenu}/>
					<PropsRoute path="/project/:id" component={ProjectInfoPage} changeMenu={this.changeMenu}/>
					<PropsRoute path="/projects/:projectId/statistics" component={ProjectStatisticsPage} changeMenu={this.changeMenu}/>
					<PropsRoute path="/team/:teamId/tasks" component={TasksPage} changeMenu={this.changeMenu}/>
				</Switch>
			</App>
		</Router>)
	}
}

export default Routes;