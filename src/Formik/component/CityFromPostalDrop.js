import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Input,
  InputAdornment
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const CityFromPostalDrop = ({ postalCode, ...props }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    menuItems: []
  });
  const prevPostalCode = usePrevious(postalCode);

  // Similaire à componentDidMount et componentDidUpdate :
  useEffect(() => {
    if (prevPostalCode !== postalCode) {
      axios
        .get("https://geo.api.gouv.fr/communes/", {
          params: {
            codePostal: postalCode
          }
        })
        .then(data => data.data)
        .then(data => {
          data = data ? data.map(city => city.nom) : [];
          setState({ ...state, menuItems: data });
          return;
        })
        .catch(error => console.log("error", error.message));
    }
  });

  return (
    <Field
      name={props.name}
      render={({ field /* _form */ }) => (
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
          {state.menuItems.length ? (
            <Select
              {...field}
              {...props}
              startAdornment={
                props.icon ? (
                  <InputAdornment position="start">{props.icon}</InputAdornment>
                ) : null
              }
            >
              {state.menuItems.map((value, key) => (
                <MenuItem value={value} key={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          ) : (
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
          )}
          <ErrorMessage
            name={field.name}
            component="div"
            className="text-danger alert-dismissible fade show"
          />
        </FormControl>
      )}
    />
  );
};

CityFromPostalDrop.propTypes = {
  name: PropTypes.string.isRequired,
  postalCode: PropTypes.number
};

export default CityFromPostalDrop;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
