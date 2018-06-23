import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import request from 'axios';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
const styles = {
    title: {
        width: '100%',
        fontSize: '24px'
    },
    info: {
        fontSize: '16px',
        width: '100%',
        paddingLeft: '52px'
    },
    infoTitle: {
        fontWeight: 'bold'
    }
}

const API_URL = 'http://18.228.31.90/api';

class TaskInfoPage extends React.Component {
    constructor() {
        super();
        this.state = {
            task: {}
        }
    }

    componentWillMount() {
        const { taskId } = this.props.match.params;

        request.get(`${API_URL}/tasks/${taskId}/`)
        .then(response => {
            this.setState({
                task: response.data
            });
        })
        .catch(err => {

        });
    }

    render() {
        return (<div>
            <div className={"form-container flex-container--column"} style={{paddingTop: '10px'}}>

                <div className={"flex-container"} onSubmit={this.submitTask}>
                        <Typography className={this.props.classes.title}>
                            <IconButton onClick={() => { window.location.href = '/tasks/'}}>
                                <ChevronLeft />
                            </IconButton>
                            Tarefa: { this.state.task.name }
                        </Typography>
                        <div className="flex-container--column">
                            <Typography className={this.props.classes.info}><span className={this.props.classes.infoTitle}>ID: </span>{ this.state.task.id }</Typography>
                            <Typography className={this.props.classes.info}><span className={this.props.classes.infoTitle}>Prioridade: </span>{ this.state.task.priority }</Typography>
                            <Typography className={this.props.classes.info}><span className={this.props.classes.infoTitle}>Prazo de entrega: </span>{ this.state.task.date_limit }</Typography>
                            <Typography className={this.props.classes.info}><span className={this.props.classes.infoTitle}>Descrição: </span>{ this.state.task.description }</Typography>
                        </div>

                </div>
            </div>
        </div>);
    }
}

export default withStyles(styles)(TaskInfoPage);