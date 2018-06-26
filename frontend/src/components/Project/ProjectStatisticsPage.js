import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header/Header';
import {AreaChart, Area, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import request from 'axios';

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
            projectName: 'Projeto 1',
            tasks: tasks,
            chatData: _getChartData(tasks)
        };
    }

    componentWillMount() {
        request.get(`${API_URL}/projects/${this.props.match.projectId}`)
    }

    render() {
        const graphWidth = Math.floor(window.innerWidth < 800 ? window.innerWidth : window.innerWidth / 2);
        return (
            <div className={this.props.classes.container}>
                <div className="page-container">
                    <h2 className={this.props.classes.title}>Estatísticas do {this.state.projectName}</h2>
                    <AreaChart width={graphWidth} height={graphWidth * .4} data={this.state.chatData}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}} stackOffset="expand">
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Area type="monotone" dataKey="ft" stroke="#4CAF50" fill="#4CAF50"/>
                    </AreaChart>
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

        if (!t.finishDate) {
            return;
        }

        total++;

        if (_compareDate(i < 0 ? new Date(0) : data[i].date, t.finishDate)) {
            data[i].count++;
        } else {
            data.push({
                date: t.finishDate,
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