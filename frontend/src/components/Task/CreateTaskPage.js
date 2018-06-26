import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import request from 'axios';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    title: {
        width: '100%',
        padding: '5px',
        fontSize: '24px'
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    }
}

const API_URL = 'http://18.228.31.90/api';

class CreateTaskPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: new Date(0),
            description: '',
            priority: 0
        }
    }

    handleChange = (name) => {
        return (event) => {
            this.setState({
                [name]: event.target.value
            });
        }
    }

    submitTask = (e) => {
        e.preventDefault();

        request.post(`${API_URL}/tasks/`, {
            name: this.state.name,
            date_limit: this.state.date,
            description: this.state.description,
            priority: this.state.priority,
            status: 'backlog',
            team: [this.props.teamId]
        })
        .then(response => {
            this.props.closeModal();
            window.location.reload();
        })
        .catch(err => {
            alert("Algo deu errado");
        });
        return false;
    }

    render() {
        return (<div className='CreateTaskPage'>

                <form className={"flex-container inner-padding"} onSubmit={this.submitTask}>
                        <Typography className={this.props.classes.title}>
                            Nova tarefa
                        </Typography>
                        <TextField label="Nome" className={'w-fu'}
                                   value={this.state.name}
                                   onChange={this.handleChange('name')}
                                   inputProps={{required: true}} />

                        <TextField label="Prioridade" className={'w-lg'}
                                   type="number"
                                   value={this.state.priority}
                                   onChange={this.handleChange('priority')}
                                   inputProps={{required: true}} />

                        <TextField label="Prazo de entrega" className={'w-lg'}
                                   type="date"
                                   value={this.state.date}
                                   onChange={this.handleChange('date')}
                                   InputLabelProps={{
                                       shrink: true,
                                  }}
                                  inputProps={{required: true}} />

                        <TextField label="Descrição" className={'w-fu'}
                                   multiline={true}
                                   value={this.state.description}
                                   onChange={this.handleChange('description')}
                                   inputProps={{required: true}} />

                        <div className={this.props.classes.buttonContainer}>
                            <Button variant="raised" color="primary" type="submit"><SaveIcon />&nbsp;Criar tarefa</Button>
                        </div>

                </form>
        </div>);
    }
}

export default withStyles(styles)(CreateTaskPage);