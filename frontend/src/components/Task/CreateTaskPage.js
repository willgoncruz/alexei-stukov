import React from 'react';
import Header from '../Header/Header';
import TextField from '@material-ui/core/TextField';

class CreateTaskPage extends React.Component {
    constructor() {
        super();
        this.state = {
            name: ''
        }
    }
    render() {
        return (<div>
            <Header hasSearch={true} />
            <div className={"form-container"}>
                <form className={"flex-container inner-padding"}>
                        <TextField label="Nome" className={'w-lg'} />
                        <TextField label="Prazo de entrega" className={'w-lg'}
                                   type="date"
                                   InputLabelProps={{
                                    shrink: true,
                                  }}/>
                </form>
            </div>
        </div>);
    }
}

export default CreateTaskPage;