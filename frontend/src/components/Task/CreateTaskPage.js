import React from 'react';
import Header from '../Header/Header';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import request from 'axios';

const API_URL = 'http://18.228.31.90/api';

class CreateTaskPage extends React.Component {
    constructor() {
        super();
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
            priority: this.state.priority
        })
        .then(response => {
            this.props.history.push('/tasks');
        })
        .catch(err => {
        
        });
        return false;
    }

    render() {
        return (<div>
            <Header hasSearch={true} />
            <div className={"form-container flex-container--column"}>
                
                <form className={"flex-container inner-padding"} onSubmit={this.submitTask}>
                        <Typography style={{width: '100%', padding: '5px',
                                            fontSize: '24px'}}>
                            Nova tarefa
                            <IconButton type="submit">
                                <SaveIcon />
                            </IconButton>
                        </Typography>
                        <TextField label="Nome" className={'w-lg'}
                                   value={this.state.name}
                                   onChange={this.handleChange('name')}
                                   inputProps={{required: true}} />

                        <TextField label="Prioridade" className={'w-sm'}
                                   type="number"
                                   value={this.state.priority}
                                   onChange={this.handleChange('priority')}
                                   inputProps={{required: true}} />

                        <TextField label="Prazo de entrega" className={'w-sm'}
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
                </form>
            </div>
        </div>);
    }
}

export default CreateTaskPage;