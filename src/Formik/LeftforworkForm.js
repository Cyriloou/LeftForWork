import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as myForm from "./myForm";
import TextInput from "./component/TextInput";
import CityFromPostalDrop from "./component/CityFromPostalDrop";
import DropDown from "./component/DropDown";
import Modal from "../component/Modal";

import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  AccountCircle,
  Email,
  Streetview,
  LocationCity,
  SkipNext,
  Send,
  Business,
  Phone
} from "@material-ui/icons";
import { Element, scroller } from "react-scroll";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const LeftforworkForm = () => {
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();
  const handleCloseModal = () => {
    setOpenModal(false);
    scrollTo("Contact");
  };

  // scrollTo to scroll
  const scrollTo = ElementName => {
    scroller.scrollTo(ElementName, {
      duration: 800,
      delay: 80,
      smooth: true
    });
  };
  return (
    <div>
      {/* Modal to show on form submit */}
      <Modal open={openModal} closeModal={handleCloseModal} />
      <h1 className="text-center mb-4">Formulaire Left For Work</h1>
      {/* Formik to handle form */}
      <Formik
        initialValues={{ country: "France" }}
        // initialValues={myForm.initialValues}
        validationSchema={myForm.validate}
        onSubmit={async (values, actions) =>
          setOpenModal(await myForm.onSubmit(values, actions))
        }
        render={({ values, isSubmitting, handleSubmit }) => (
          <Form>
            <div className="min-vh-100">
              <Grid
                container
                spacing={2}
                direction="row"
                justify="space-around"
                className="my-auto py-auto"
                alignItems="flex-start"
              >
                <Grid item xs={12}>
                  <Element name="Contact"></Element>
                  <h2>Contact</h2>
                </Grid>
                <Grid item xs={3} sm={2}>
                  <DropDown
                    name="gender"
                    label="Mme/Mr*"
                    placeholder="Mme/Mr"
                    list={myForm.genderList}
                  />
                </Grid>
                <Grid item xs={9} sm={5}>
                  <TextInput
                    name="firstName"
                    label="Prénom*"
                    placeholder="Pierre"
                    fullWidth
                    icon={<AccountCircle />}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextInput name="lastName" label="Nom" placeholder="Dupont" />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    name="email"
                    type="email"
                    label="Email*"
                    icon={<Email />}
                    fullWidth
                    placeholder="Pierre.Dupont@gmail.com"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    name="tel"
                    label="Tel*"
                    icon={<Phone />}
                    fullWidth
                    placeholder="01 02 03 04 05"
                    inputComponent={myForm.TextMaskTel}
                  />
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={isSubmitting}
                  onClick={() => scrollTo("Adresse")}
                >
                  Suivant
                  {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                  <SkipNext className={classes.rightIcon} />
                </Button>
              </Grid>
            </div>
            <div className="min-vh-100">
              <Grid
                container
                direction="row"
                spacing={2}
                justify="space-around"
                className="my-auto py-auto"
                alignItems="flex-start"
              >
                <Grid item xs={12}>
                  <Element name="Adresse"></Element>
                  <h2>Infos Entreprise</h2>
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    name="entreprise"
                    label="Entreprise*"
                    icon={<Business />}
                    fullWidth
                    placeholder="Left For Work"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    name="addressLine1"
                    label="Adresse*"
                    icon={<Streetview />}
                    placeholder="211 Chemin de la Madrague-Ville"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    name="addressLine2"
                    label="Complément d'adresse"
                    placeholder="APT, ETAGE, etc.."
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextInput
                    name="postalCode"
                    label="Code Postal*"
                    type="number"
                    placeholder="13015"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={8}>
                  <CityFromPostalDrop
                    name="city"
                    label="Ville*"
                    placeholder="Marseille"
                    postalCode={values.postalCode}
                    icon={<LocationCity />}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    name="country"
                    label="Pays*"
                    readOnly
                    fullWidth
                    value="France"
                  />
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={isSubmitting}
                  type="submit"
                >
                  Envoyer
                  {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                  <Send className={classes.rightIcon} />
                </Button>
              </Grid>
            </div>
          </Form>
        )}
      />
    </div>
  );
};

export default LeftforworkForm;
