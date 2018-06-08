import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        cursor: 'pointer'
    }
}

class ProjectCard extends React.Component {
    render() {
        const { name, description, href, imageUrl, ...otherProps } = this.props;

        return (
            <div {...otherProps}>
              <Card  className={this.props.classes.undecorated}>
                <CardMedia
                    onClick={() => {window.location.href = href}}
                    className={this.props.classes.media}
                    image={ imageUrl || '' }
                    title="Project Image"
                />
                <CardContent>
                  <Typography component="h2"
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

ProjectCard.propTypes = {
    imageUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default withStyles(styles)(ProjectCard);