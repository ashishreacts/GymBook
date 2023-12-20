import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { postSignInData } from "../api-services/auth";
import { SignInProps } from "./../api-services/types"; 

interface IFieldProps {
  field: { value: string };
  meta: {
    touched: boolean;
    error: string;
  };
}

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async () => {
      try {
        console.log(formik.values);
        await postSignInData(formik.values as SignInProps);
        formik.handleReset(null)
      }catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred");
        }
      }
    },
  });
  return (
    <Container component="form" maxWidth="sm">
      <Typography component="h1" variant="h3" align="center">
        GymBook
      </Typography>
      <Paper
        elevation={12}
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Typography component="h1" variant="h4">
          Sign in to your account
        </Typography>
        <FormikProvider value={formik}>
          <Field name="email">
            {({ field, meta }: IFieldProps) => (
              <TextField
                {...field}
                label="Email Address"
                variant="standard"
                fullWidth
                autoFocus
                sx={{ mx: "auto" }}
                error={meta.touched && meta.error ? true : false}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
          <Field name="password">
            {({ field, meta }: IFieldProps) => (
              <TextField
                {...field}
                label="Password"
                variant="standard"
                fullWidth
                type="password"
                error={meta.touched && meta.error ? true : false}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
          <Button
            variant="contained"
            sx={{ mt: 4 }}
            fullWidth
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            Sign In
          </Button>
          <Typography
            component="p"
            sx={{ fontSize: "15px", mt: 3 }}
            variant="h6"
          >
          </Typography>
        </FormikProvider>
      </Paper>
    </Container>
  );
};

export default SignIn;
