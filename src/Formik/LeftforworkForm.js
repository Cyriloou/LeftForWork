import React, { useState } from "react";
import "./LeftforworkForm.css";
import { Formik, Form } from "formik";
import * as myForm from "./myForm";
import TextInput from "./component/TextInput";
import CityFromPostalDrop from "./component/CityFromPostalDrop";
import DropDown from "./component/DropDown";
import Modal from "../component/Modal";

import { Button, Grid, Container } from "@material-ui/core";
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
    <Container maxWidth="md" className="p-4">
      {/* Modal to show on form submit */}

      <Modal open={openModal} closeModal={handleCloseModal} />
      <div className="form-container p-4 mx-auto ">
        <div className="header min-vh-25">
          <div className="mx-auto my-2 text-center">
            <Element name="Logo" />
            <img
              className="form-logo mx-auto my-2"
              alt="logo"
              src="https://s3-us-west-2.amazonaws.com/userdata123/www/htmlblocks-images/2260/2260472/2260472_5003361_5d6686334b445.png"
            />
            <h1 className="form-title">Formulaire</h1>
          </div>
          <div className="mx-auto my-2 text-left">
            <p>Bienvenue chez Left for Work !</p>
            <p>Merci de compléter les quelques informations ci-dessous.</p>
          </div>
        </div>
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
              <div className="min-vh-75">
                <Element name="Part1">
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="space-around"
                    className="my-auto py-auto"
                    alignItems="flex-start"
                  >
                    <Grid item xs={12} className="py-1">
                      <Element name="Contact" />
                      <h2>Contact</h2>
                    </Grid>
                    <Grid item xs={12} sm={2} className="py-0">
                      <DropDown
                        name="gender"
                        label="Mme/Mr"
                        placeholder="Mme/Mr"
                        list={myForm.genderList}
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={5} className="py-0">
                      <TextInput
                        name="firstName"
                        label="Prénom"
                        placeholder="Pierre"
                        fullWidth
                        icon={<AccountCircle />}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={5} className="py-0">
                      <TextInput
                        name="lastName"
                        label="Nom"
                        placeholder="Dupont"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} className="py-0">
                      <TextInput
                        name="email"
                        type="email"
                        label="Email"
                        icon={<Email />}
                        fullWidth
                        placeholder="Pierre.Dupont@gmail.com"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} className="py-0">
                      <TextInput
                        name="tel"
                        label="Tel"
                        icon={<Phone />}
                        fullWidth
                        placeholder="01 02 03 04 05"
                        inputComponent={myForm.TextMaskTel}
                        required
                      />
                    </Grid>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      disabled={isSubmitting}
                      onClick={() => scrollTo("Part2")}
                    >
                      Suivant
                      {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                      <SkipNext className={classes.rightIcon} />
                    </Button>
                  </Grid>
                </Element>
              </div>
              <div className="min-vh-100 ">
                <Element name="Part2">
                  <Grid
                    container
                    direction="row"
                    spacing={2}
                    justify="space-around"
                    className=""
                    alignItems="flex-start"
                    style={{ verticalAlign: "middle" }}
                  >
                    <Grid item xs={12} className="py-0">
                      <h2>Infos Entreprise</h2>
                    </Grid>
                    <Grid item xs={12} className="py-0">
                      <TextInput
                        name="entreprise"
                        label="Entreprise"
                        icon={<Business />}
                        fullWidth
                        placeholder="Left For Work"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} className="py-0">
                      <TextInput
                        name="addressLine1"
                        label="Adresse"
                        icon={<Streetview />}
                        placeholder="211 Chemin de la Madrague-Ville"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} className="py-0">
                      <TextInput
                        name="addressLine2"
                        label="Complément d'adresse"
                        placeholder="APT, ETAGE, etc.."
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} className="py-0">
                      <TextInput
                        name="postalCode"
                        label="Code Postal"
                        type="number"
                        placeholder="13015"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} className="py-0">
                      <CityFromPostalDrop
                        name="city"
                        label="Ville"
                        placeholder="Marseille"
                        postalCode={values.postalCode}
                        icon={<LocationCity />}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} className="py-0">
                      <TextInput
                        name="country"
                        label="Pays"
                        readOnly
                        fullWidth
                        value="France"
                        required
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
                </Element>
              </div>
            </Form>
          )}
        />
      </div>
    </Container>
  );
};

export default LeftforworkForm;
