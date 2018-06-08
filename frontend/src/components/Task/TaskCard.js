import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    
}

class TaskCard extends React.Component {
    render() {
        const { name, description, href, ...otherProps } = this.props;

        return (
            <div {...otherProps}>
              <Card  className={this.props.classes.undecorated}>
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2"
                              className={this.props.classes.undecorated} noWrap={true}>
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