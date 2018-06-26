import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header/Header';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import request from 'axios';

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    flexRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    title: {
        width: '100%',
        textAlign: 'center'
    }
};

const API_URL = 'http://18.228.31.90/api';

class ProjectStatisticsPage extends React.Component {
    constructor() {
        super();
        const tasks = _mockTasks().filter(date => date.finishDate != null).sort((t1, t2) => t1.finishDate.getTime() - t2.finishDate.getTime());
        this.state = {
            projectName: '',
            teams: [],
            tasks: [],
            chatData: [],
            statusProportionData: [],
            lateTasksData: [],
            priorityData: []
        };
    }

    componentWillMount() {
        request.get(`${API_URL}/projects/${this.props.match.params.projectId}/`)
        .then(response => {
            const project = response.data;
            const { teams } = project;
            const tasks = [].concat.apply([], teams.map(t => t.tasks)) // merge tasks from all teams into one array

            this.setState({
                projectName: project.name,
                teams: teams,
                tasks: tasks,
                chatData: _getChartData(tasks),
                statusProportionData: _getStatusProportionData(tasks),
                lateTasksData: _getLateTasksData(tasks),
                priorityData: _getPriorityData(tasks)
            });
        })
        .catch(err => {

        });
    }

    render() {
        const graphWidth = Math.floor(window.innerWidth < 800 ? window.innerWidth : window.innerWidth / 2);
        /* <div className="page-container"><AreaChart width={graphWidth} height={graphWidth * .4} data={this.state.chatData}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}} stackOffset="expand">
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Area type="monotone" dataKey="ft" stroke="#4CAF50" fill="#4CAF50"/>
                    </AreaChart></div>*/
        return (
            <div className={this.props.classes.container}>
               
                <h2 className={this.props.classes.title}>Estatísticas do {this.state.projectName}</h2>

                <div className={this.props.classes.flexRow}>
                    <div style={{textAlign: 'center'}}>
                        <p>Tarefas por estado</p>
                        <PieChart width={400} height={350}>
                            <Pie isAnimationActive={true} data={this.state.statusProportionData} cx={200} cy={200} outerRadius={100} fill="#8884d8" label>
                                { this.state.statusProportionData.map(d => <Cell fill={d.color} />) }
                            </Pie>
                            <Tooltip/>
                        </PieChart>

                        { this.state.statusProportionData.map(d => <span className="spaced-span" style={{color: d.color, fontWeight: 'bolder'}}>{ d.name }</span>) }
                    </div>

                    <div style={{textAlign: 'center'}}>
                        <p>Tarefas atradas</p>
                        <PieChart width={400} height={350}>
                            <Pie isAnimationActive={true} data={this.state.lateTasksData} cx={200} cy={200} outerRadius={100} fill="#8884d8" label>
                                { this.state.lateTasksData.map(d => <Cell fill={d.color} />) }
                            </Pie>
                            <Tooltip/>
                        </PieChart>

                        { this.state.lateTasksData.map(d => <span className="spaced-span" style={{color: d.color, fontWeight: 'bolder'}}>{ d.name }</span>) }
                    </div>
                </div>

                <div className={this.props.classes.flexRow} style={{marginTop: '50px'}}>
                    
                    <div style={{textAlign: 'center'}}>
                        <p>Prioridades</p>
                        <LineChart width={600} height={200} data={this.state.priorityData}>
                            <XAxis dataKey="name"/>
                            <YAxis dataKey="Quantidade"/>
                            <Line type="monotone" dataKey="Quantidade" stroke="#00796B" strokeWidth={2} />
                            <Tooltip/>
                        </LineChart>
                    </div>
                </div>
            </div>
        );
    }
}

const DAY_MILISECONDS = 86400000; // 24 * 60 * 60 * 1000

function _mockTasks() {
    const tasks = [];
    const initialTime = new Date('2018-06-15T00:00:00+00:00').getTime();
    const limitDate = new Date(); // today
    const numberOfDays = Math.floor((limitDate.getTime() - initialTime) / DAY_MILISECONDS);

    for (let i = 0; i < numberOfDays * 10; i++) {
        const days = Math.floor(Math.random() * numberOfDays) * DAY_MILISECONDS;
        tasks.push({
            finishDate: new Date(initialTime + days + DAY_MILISECONDS)
        });
    }

    return tasks;
}

function _getChartData(tasks) {
    if (!tasks || tasks.length === 0) {
        return [];
    }

    let total = 0;

    const data = [];

    tasks.forEach(t => {
        const i = data.length - 1;
        const count = i >= 0 ? data[i].count : 1;

        if (!t.finished_date || t.finished_date === null) {
            return;
        }

        const finished_date = new Date(t.finished_date);
        
        total++;

        if (_compareDate(i < 0 ? new Date(0) : data[i].date, finished_date)) {
            data[i].count++;
        } else {
            data.push({
                date: finished_date,
                count: count // it counts how many tasks were complete until that day
            });
        }
    });

    data.total = total;

    return data.map(d => ({
        date: _parseDate(d.date),
        "ft": Math.floor((d.count / total) * 100),
        total: 100
    }));
}

function _getStatusProportionData(tasks) {
    const data = [];
    data.push({
        name: 'Backlog',
        value: tasks.filter(t => t.status === 'backlog').length,
        color: '#03A9F4'
    });
    
    data.push({
        name: 'To do',
        value: tasks.filter(t => t.status === 'todo').length,
        color: '#00BCD4'
    });
    
    data.push({
        name: 'Doing',
        value: tasks.filter(t => t.status === 'doing').length,
        color: '#009688'
    })
    
    data.push({
        name: 'Done',
        value: tasks.filter(t => t.status === 'done').length,
        color: '#4CAF50'
    });

    return data;
}

function _getLateTasksData(tasks) {
    const data = [];
    const today = new Date();
    data.push({
        name: 'Não concluídas',
        value: tasks.filter(t => t.status !== 'done' && today <= new Date(t.date_limit)).length,
        color: '#00BCD4'
    });
    
    data.push({
        name: 'Concluídas',
        value: tasks.filter(t => t.status === 'done').length,
        color: '#4CAF50'
    });

    data.push({
        name: 'Atrasadas',
        value: tasks.filter(t => t.status !== 'done' && today > new Date(t.date_limit)).length,
        color: '#F44336'
    });

    return data;
}

function _getPriorityData(tasks) {
    if (!tasks || tasks.length === 0) {
        return [];
    }

    const data = [];
    
    const sortedTasks = tasks.sort((t1, t2) => t1.priority - t2.priority); // sorts tasks by priority from smallest to biggest

    console.log(sortedTasks[sortedTasks.length - 1]);

    for (let i = 0; i < sortedTasks.length; i++) {
        const p = sortedTasks[i].priority;
        const count = sortedTasks.filter(t => t.priority === p).length;
        data.push({
            name: `Prioridade ${p}`,
            Quantidade: count
        });

        i += count - 1;
    }

    return data;
}

function _compareDate(d1, d2) {
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear(); 
}

function _parseDate(date) {
    const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
    const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth()}`;
    return date ? `${day}/${month}` : '00/00'; 
}

export default withStyles(styles)(ProjectStatisticsPage);