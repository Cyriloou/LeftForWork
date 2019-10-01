import * as yup from "yup";
import Parse from "parse";
import React from "react";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";

const phoneRegExp = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
const postalCodeRegExp = /^(?:[0-8]\d|9[0-8])\d{3}$/;

// Handle Formik form
export const onSubmit = async (values, actions) => {
  console.log("values", values);
  // create the back4app object
  const LeftForWork = Parse.Object.extend("LeftForWork");
  const newUser = new LeftForWork();
  for (let key in values) {
    newUser.set(key, values[key]);
  }

  // save to back4app
  try {
    let user = newUser.save();
    console.log("New object created with objectId: " + user.id);
    actions.setSubmitting(false);
    actions.resetForm();
    return true;
  } catch (error) {
    console.log(
      "Failed to create new object, with error code: " + error.message
    );
    actions.setSubmitting(false);
    actions.resetForm();
    return false;
  }
};

// Yup for formik validation
export const validate = yup.object().shape({
  gender: yup
    .string()
    .oneOf(["Mr", "Mme"])
    .required("Requis"),
  firstName: yup
    .string()
    .min(6, "Trop court")
    .required("Requis"),
  lastName: yup
    .string()
    .min(6, "Trop court")
    .required("Requis"),
  email: yup
    .string()
    .email("email invalide")
    .required("Requis"),
  entreprise: yup
    .string()
    .min(3, "Trop court")
    .required("Requis"),
  tel: yup.string().matches(phoneRegExp, "Numéro de téléphone invalide"),
  addressLine1: yup
    .string()
    .min(4, "Trop court")
    .max(80, "Trop long")
    .required("Requis"),
  addressLine2: yup
    .string()
    .min(4, "Trop court")
    .max(80, "Trop long"),
  postalCode: yup
    .string()
    .matches(postalCodeRegExp, "Le code postal est incorrect")
    .required("Requis"),
  city: yup
    .string()
    .min(2, "Trop court")
    .max(50, "Trop long")
    .required("Requis"),
  country: yup
    .string()
    .min(5, "Trop court")
    .max(10, "Trop long")
    .required("Requis")
});

// Initial Formik values
export const initialValues = {
  gender: "Mr",
  firstName: "Pierre",
  lastName: "Dupont",
  email: "exercice@leftforwork.com",
  tel: "01 02 03 04 05",
  entreprise: "Left For Work",
  addressLine1: "211 Chemin de la Madrague-Ville",
  addressLine2: "",
  postalCode: 13015,
  city: "Marseille",
  country: "France"
};

export const genderList = ["Mr", "Mme"];

// Mask for the phone number
export const TextMaskTel = props => {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /0/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/
      ]}
      showMask
    />
  );
};

TextMaskTel.propTypes = {
  inputRef: PropTypes.func.isRequired
};
