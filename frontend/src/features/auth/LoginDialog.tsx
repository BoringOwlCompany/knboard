import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./AuthSlice";
import { RootState } from "store";
import { Alert } from "@material-ui/lab";

const FormActions = styled.div`
  margin-top: 1rem;
  text-align: right;
`;

interface FormData {
  username: string;
  password: string;
}

const LoginDialog = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const error = useSelector((state: RootState) => state.auth.error);
  const { register, handleSubmit, errors } = useForm<FormData>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = handleSubmit(({ username, password }) => {
    dispatch(login(username, password));
  });

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="login-dialog-title"
        css={css`
          & .MuiDialog-paper {
            padding: 2rem 1.5rem;
          }
        `}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="login-dialog-title">Login</DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent>
            {error && (
              <Alert
                severity="error"
                css={css`
                  margin-bottom: 0.75rem;
                `}
              >
                {error}
              </Alert>
            )}
            <TextField
              autoFocus
              name="username"
              margin="dense"
              id="username"
              label="Username"
              variant="outlined"
              inputRef={register({ required: true })}
              helperText={errors.username && "This field is required"}
              error={Boolean(errors.username)}
              fullWidth
            />
            <TextField
              name="password"
              margin="dense"
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              inputRef={register({ required: true })}
              helperText={errors.password && "This field is required"}
              error={Boolean(errors.password)}
              fullWidth
            />
            <FormActions>
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </FormActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default LoginDialog;