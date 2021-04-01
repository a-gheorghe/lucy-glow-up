import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import DayjsUtils from '@date-io/dayjs';
import { firebase } from '../firebase';


export const GrowthWeightForm = () => {
    const firestore = firebase.firestore();
    const [open, setOpen] = React.useState(false);
    const [weight, setWeight] = React.useState('');
    const [weightError, setWeightError] = React.useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleInputChange = (e) => {
      if (weightError) {
        setWeightError(false);
      }
      setWeight(e.target.value)
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setWeight('');
        setWeightError(false);
        setOpen(false);
    };

    const submitWeight = () => {
      if (weight.trim().length === 0) {
        setWeightError(true);
        return;
      }
        addWeight();
        handleClose();
    }

  const addWeight = () => {
      const uniId = uuidv4();
      firestore.collection("lucy-growth-weight").doc(uniId).set({
        weight: weight,
        attributes: ["Lucy", "growth", "weight"],
        id: uniId,
        date: dayjs(selectedDate).unix()
      })

      .then((res) => {
        console.log("Document successfully written!", res);
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });

    }
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new weight entry
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add weight entry</DialogTitle>
        <DialogContent>
        <DatePicker value={selectedDate} onChange={setSelectedDate} style={{ marginBottom: '18px' }} />
        <TextField
          value={weight}
          onChange={handleInputChange}
          label="Weight (kg)"
          type="number"
          inputProps={{ min: "0", step: "0.1" }}
          variant="outlined"
          required
          error={weightError}
          helperText={weightError ? "Weight entry is required" : ''}
          style={{ display: 'block' }}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitWeight} color="primary">
            Add Weight
          </Button>
        </DialogActions>
      </Dialog>
      </MuiPickersUtilsProvider>
  );
}