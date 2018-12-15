import React, { PureComponent } from 'react';
import styled from '@emotion/styled';
import { withStyles } from '@material-ui/core/styles';
import MaterialAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { GoFileCode, GoMarkGithub } from 'react-icons/go';

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    }
};

const Logo = styled(GoFileCode)`
    height: 32px;
    margin-right: 10px;
`;

interface AppBarProps {
    classes: {
        root: string;
        grow: string;
    };
}

class AppBar extends PureComponent<AppBarProps> {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <MaterialAppBar position="static">
                    <Toolbar variant="dense">
                        <Logo />
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            CODEOWNERS editor
                        </Typography>
                        <Button variant="contained" color="secondary">
                            <SaveIcon />
                            Save
                        </Button>
                        <IconButton color="inherit" aria-label="GitHub repo">
                            <GoMarkGithub />
                        </IconButton>
                    </Toolbar>
                </MaterialAppBar>
            </div>
        );
    }
}

export default withStyles(styles)(AppBar);
