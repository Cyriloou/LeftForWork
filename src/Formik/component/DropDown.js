import React from "react";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, FormControl, InputLabel, Select } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const DropDown = props => {
  const classes = useStyles();

  return (
    <Field name={props.name}>
      {({ field /*, form*/ }) => (
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
          <Select {...field} {...props}>
            {props.list.map((value, key) => (
              <MenuItem value={value} key={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
          <ErrorMessage
            name={field.name}
            component="div"
            className="text-danger alert-dismissible fade show"
          />
        </FormControl>
      )}
    </Field>
  );
};

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired
};

export default DropDown;
