import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
    taskTitle: {
        fontSize: '1rem',
        height: '45px',
        overflow: 'hidden'
    },
    card: {
        paddingBottom: '10px !important',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    taskName: {
        width: '100%'
    },
    date: {
        marginTop: '10px'
    },
    dateIcon: {
        fontSize: '16px'
    }
}

class TaskCard extends React.Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null
        };
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    
    handleMenuItemClick = status => () => {
        this.handleClose();
        this.props.onTaskStatusChange(status, this.props.id);
    }

    render() {
        const { name, description, href, date, ...otherProps} = this.props;
        const { anchorEl } = this.state;

        return (
            <div {...otherProps}>
              <Card elevation={0} classes={{root: 'task-card-root'}}>
                <CardContent className={`${this.props.classes.card}`}>
                    <div className={this.props.classes.taskName} onClick={() => { if (href) window.location.href = href;}}>
                        <Typography classes={{root: this.props.classes.taskTitle}}
                                gutterBottom variant="headline" component="p"
                                paragrah={true}
                                noWrap={false}>
                            { name }
                        </Typography>
                        <Typography component="p" noWrap={true}>
                            { description }
                        </Typography>
                    </div>
                    <div>
                        <IconButton aria-owns={anchorEl ? 'simple-menu' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleClick} >
                            <DehazeIcon style={{fontSize: '16px'}}/>
                        </IconButton>
                    </div>
                </CardContent>
              </Card>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}>
                <MenuItem onClick={this.handleMenuItemClick("backlog")}>Backlog</MenuItem>
                <MenuItem onClick={this.handleMenuItemClick("todo")}>To do</MenuItem>
                <MenuItem onClick={this.handleMenuItemClick("doing")}>Doing</MenuItem>
                <MenuItem onClick={this.handleMenuItemClick("done")}>Done</MenuItem>
              </Menu>
            </div>
          );
    }
}

TaskCard.propTypes = {
    name: PropTypes.string.isRequired
}

export default withStyles(styles)(TaskCard);