import React from "react";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const TextInput = props => {
  const classes = useStyles();
  return (
    <Field
      name={props.name}
      render={({ field /* _form */ }) => (
        <FormControl {...props} fullWidth className={classes.margin}>
          <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
          <Input
            id={props.name}
            {...field}
            {...props}
            startAdornment={
              props.icon ? (
                <InputAdornment position="start">{props.icon}</InputAdornment>
              ) : null
            }
          />
          <ErrorMessage
            name={props.name}
            component="div"
            className="form-alert-text text-danger alert-dismissible fade show"
          />
        </FormControl>
      )}
    />
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  readOnly: PropTypes.bool
};

export default TextInput;
