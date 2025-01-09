"use client";

import { RootState } from "@/Redux/store";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

interface UserDetailsProps {
  open: boolean;
  handleClose: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ open, handleClose }) => {
  const {isLoading, userData} = useSelector((state: RootState)=>state.users)
  return (
    <>
    {isLoading?
      (
        <>
        <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
        </>
      ):
      (
        <>
        <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"
        sx={{
          textDecoration:"underline",
          fontFamily:"monospace",
          paddingInline:"10vh"
        }}>
          USER DETAILS
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="font-mono text-gray-600">
            <p>ID: {userData?.id}</p>
            <p>NAME: {userData?.name}</p>
            <p>EMAIL: {userData?.email}</p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
          variant="contained"
            onClick={() => {
              handleClose();
            }}
            sx={{
              fontFamily:"monospace"
            }}
          >
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        </>
      )
    }
    
    </>
  );
};

export default UserDetails;
