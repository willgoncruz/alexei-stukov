import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const styles = {
    taskTitle: {
        fontSize: '1rem',
        height: '65px',
        overflow: 'hidden'
    },
    card: {
        paddingBottom: '10px !important',
        overflow: 'hidden'
    },
    date: {
        marginTop: '10px'
    },
    dateIcon: {
        fontSize: '16px'
    }
}

class TaskCard extends React.Component {
    // <div className={this.props.classes.date}>
    //                 <span>
    //                     <AccessTimeIcon className={this.props.classes.dateIcon} />
    //                     { date }
    //                 </span>
    //               </div>
    render() {
        const { name, description, href, date, ...otherProps} = this.props;
        return (
            <div {...otherProps}>
              <Card>
                <CardContent className={this.props.classes.card}>
                  <Typography classes={{root: this.props.classes.taskTitle}}
                              gutterBottom variant="headline" component="p"
                              paragrah={true}
                              noWrap={false}>
                    { name }
                  </Typography>
                  <Typography component="p" noWrap={true}>
                    { description }
                  </Typography>
                  
                </CardContent>
              </Card>
            </div>
          );
    }
}

TaskCard.propTypes = {
    imageUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default withStyles(styles)(TaskCard);