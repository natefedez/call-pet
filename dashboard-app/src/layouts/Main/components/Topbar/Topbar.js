import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import palette from '../../../../theme/palette';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    backgroundColor: palette.primary.main,
  },
  flexGrow: {
    flexGrow: 1,
  },
  link: {
    "font-family": "Roboto",
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    textDecoration: 'none',
    color: palette.text.link,
    borderRadius: '5px',
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:hover': {
      textDecoration: 'none',
      color: palette.text.link,
      backgroundColor: 'rgba(123,31,162,.1)',
    },
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  git: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: '26px',
    marginLeft: 7,
  },
}));

const Topbar = (props) => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">

          
          <img alt="Logo" src="/images/logo/top_round_logo_call_pet.svg" />
        </RouterLink>
        <div className={classes.flexGrow} />
        <a className={classes.link} rel="noopener noreferrer" target="_blank" href="https://github.com/natanfdecastro/call-pet">
          <img alt="GitHub" src="/images/github.svg" />
          <span className={classes.git}>Github</span>
        </a>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
