import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = {
    container: {

    }
};

class CreateProjectPage extends React.Component {
    render() {
        if (this.props.isLoading) {
            return <CircularProgress size={24} />
        }

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title"
                open={!!this.props.open} fullScreen={!!this.props.fullScreen}>
                <DialogTitle disableTypography={true}>
                    <div className={this.props.classes.header}>
                        <p id="create-project-header">
                            <IconButton aria-label="Voltar">
                                <ChevronLeft />
                            </IconButton>
                            <span>Criar projeto</span>
                        </p>
                    </div>
                </DialogTitle>
                <DialogContent id="create-project-container">
                    <div id="create-project-container" className="flex-container">
                    <TextField
                        label="Nome do projeto"
                        value={''}
                        margin="normal"
                    />
                    </div>
                </DialogContent>
                
            </Dialog>
            
        );
    }
}

export default withStyles(styles)(CreateProjectPage);