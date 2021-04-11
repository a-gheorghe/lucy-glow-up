import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import DayjsUtils from "@date-io/dayjs";
import firebase from "../../../firebase/clientApp";

const GrowthPicturesFormBase = () => {
  const firestore = firebase.firestore();
  const storageRef = firebase.storage();
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileDescription, setSelectedFileDescription] = useState("");
  const [preview, setPreview] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedFile(undefined);
    setSelectedFileDescription("");
    setPreview(undefined);
    setOpen(false);
  };

  const submitPicture = () => {
    addPhoto();
    handleClose();
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const addPhoto = () => {
    const uploadTask = storageRef
      .ref("/lucy-growth-pictures")
      .child(selectedFile.name)
      .put(selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log("error:-", error);
      },
      () => {
        const uniId = uuidv4();
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          firestore
            .collection("lucy-growth-pictures")
            .doc(uniId)
            .set({
              file_name: selectedFile.name.toString(),
              attributes: ["Plexus", "Lucy", "growth"],
              description: `Picture of Lucy and Plexus on ${dayjs(
                selectedDate
              ).format("dddd, MMMM D YYYY")}`,
              id: uniId,
              download_url: downloadURL.toString(),
              date: dayjs(selectedDate).unix(),
            })
            .then((res) => {
              console.log("Document successfully written!", res);
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        });
      }
    );
  };
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: "100",
        }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Progress Picture</DialogTitle>
        <DialogContent>
          <DatePicker value={selectedDate} onChange={setSelectedDate} />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          <input
            style={{ display: "none" }}
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={onSelectFile}
          />
          {selectedFile && (
            <img
              src={preview}
              height="200"
              width="200"
              alt={
                selectedFileDescription.trim().length > 0
                  ? selectedFileDescription
                  : "preview"
              }
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitPicture} color="primary">
            Add Picture
          </Button>
        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
};

export const GrowthPicturesForm = GrowthPicturesFormBase;
