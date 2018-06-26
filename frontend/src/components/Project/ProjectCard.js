import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TimelineIcon from '@material-ui/icons/Timeline';
import { history } from './../../routes'

const styles = {
    media: {
        height: 0,
        paddingTop: '56.25%',
        cursor: 'pointer'
    },
    bottomButtonsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
}

class ProjectCard extends React.Component {
    redirect = () => key => {
        this.props.history.push(`/projects/${key}/statistics/`)
    }

    render() {
        const { id, name, description, href, imageUrl, ...otherProps } = this.props;

        return (
            <div {...otherProps}>
              <Card>
                <CardMedia
                    onClick={() => { history.push(href)} }
                    className={this.props.classes.media}
                    image={ imageUrl || '' }
                    title="Project Image"
                    
                />
                <CardContent>
                  <Typography component="h2" noWrap={true}>
                    { name }
                  </Typography>
                  <Typography component="p" noWrap={true}>
                    { description }
                  </Typography>
                  <div className={this.props.classes.bottomButtonsContainer}>
                    <IconButton onClick={() => { history.push(`/projects/${this.props.projectId}/statistics/`)} }><TimelineIcon /></IconButton>
                  </div>
                </CardContent>
              </Card>
              
            </div>
          );
    }
}

ProjectCard.propTypes = {
    imageUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default withStyles(styles)(ProjectCard);