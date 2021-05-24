import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import DayjsUtils from "@date-io/dayjs";
import firebase from "../../../firebase/clientApp";

export const GrowthWeightForm = () => {
  const firestore = firebase.firestore();
  const [weight, setWeight] = React.useState("");
  const [weightError, setWeightError] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleInputChange = (e) => {
    if (weightError) {
      setWeightError(false);
    }
    setWeight(e.target.value);
  };

  const handleClose = () => {
    setWeight("");
    setWeightError(false);
  };

  const submitWeight = () => {
    if (weight.trim().length === 0) {
      setWeightError(true);
      return;
    }
    addWeight();
    handleClose();
  };

  const addWeight = () => {
    const uniId = uuidv4();
    firestore
      .collection("lucy-growth-weight")
      .doc(uniId)
      .set({
        weight: weight,
        attributes: ["Lucy", "growth", "weight"],
        id: uniId,
        date: dayjs(selectedDate).unix(),
      })

      .then((res) => {
        console.log("Document successfully written!", res);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        style={{ marginBottom: "18px" }}
      />
      <TextField
        value={weight}
        onChange={handleInputChange}
        label="Weight (kg)"
        type="number"
        inputProps={{ min: "0", step: "0.1" }}
        variant="outlined"
        required
        error={weightError}
        helperText={weightError ? "Weight entry is required" : ""}
        style={{ display: "block" }}
      />

      <Button onClick={submitWeight} color="primary">
        Add Weight
      </Button>
    </MuiPickersUtilsProvider>
  );
};
