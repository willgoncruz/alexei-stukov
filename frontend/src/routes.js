import React from 'react'
import { Router, Switch, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import App from './App'
import Home from './components/Home/Home'
import TasksPage from './components/Task/TasksPage'
import CreateTaskPage from './components/Task/CreateTaskPage';
import TaskInfoPage from './components/Task/TaskInfoPage';
import ProjectInfoPage from './components/Project/ProjectInfoPage';

import Header from './components/Header/Header'
import LeftMenu from './components/Menu/LeftMenu'

const history = createBrowserHistory()
const Routes = () => {
	return (
		<Router history={history}>
			<App>
				<Header hasSearch />
				<LeftMenu />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/home" component={Home} />
					<Route path="/tasks" component={TasksPage} exact={true} />
					<Route path="/tasks/new" component={CreateTaskPage} exact={true}/>
					<Route path="/tasks/:taskId" component={TaskInfoPage} />
					<Route path="/project/:id" component={ProjectInfoPage} />
					<Route path="/team/:teamId/tasks" component={TasksPage} />
				</Switch>
			</App>
		</Router>
	)
}

export default Routes;