// UserDetailForm.js
import { Form, Row, Col, Alert } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import CustomButton from "../common/CustomButton";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,14}$/,
      "Invalid email address"
    )
    // .email()
    .required("Email is required"),
  name: Yup.string().required("Name is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{8,15}$/, "Please Enter a Valid Mobile Number ")
    .required("Mobile number is required"),
});

const initialValues = {
  name: "",
  mobile: "",
  email: "",
};

const UserDetailForm = ({ price, musicId, albumId }) => {
  console.log(musicId, "musicId");
  console.log(albumId, "albumId");
  const { response, loading, fetchData, error } = useAxios();
  const navigate = useNavigate();
  console.log(error?.error, "response");
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("stripe intent>>>" + musicId);
    try {
      const buyerData = await fetchData({
        url: "addbuyerinfo",
        method: "POST",
        data: values,
      });
      const responseData = await fetchData({
        url: "/stripeintent",
        method: "POST",
        data: {
          productId: musicId,
          amount: price.toString(),
        },
      });
      if (responseData) {
        resetForm();
        navigate("/payment", {
          state: {
            email: values.email,
            clientSecret: responseData?.clientSecret,
            buyerId: buyerData?.id,
            albumId,
            price,
            musicId
          },
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, errors, touched, isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
          <Row className="mb-3">
            <Form.Group as={Row} className="mt-3">
              <Form.Label>Email</Form.Label>
              <Field
                as={Form.Control}
                name="email"
                type="email"
                placeholder="Email ID"
                isInvalid={touched.email && !!errors.email}
              />
              <ErrorMessage
                name="email"
                component={Form.Control.Feedback}
                type="invalid"
              />
            </Form.Group>
            <Form.Group as={Row} className="mt-3">
              <Form.Label>Name</Form.Label>
              <Field
                as={Form.Control}
                name="name"
                type="text"
                placeholder="Name"
                isInvalid={touched.name && !!errors.name}
              />
              <ErrorMessage
                name="name"
                component={Form.Control.Feedback}
                type="invalid"
              />
            </Form.Group>
            <Form.Group as={Row} className="mt-3">
              <Form.Label>Mobile Number</Form.Label>
              <Field
                as={Form.Control}
                name="mobile"
                type="number" // Changes the input type to number
                inputMode="numeric" // Ensures numeric keyboard on mobile devices
                pattern="[0-9]*" // Restricts input to numbers
                placeholder="Mobile Number"
                isInvalid={touched.mobile && !!errors.mobile}
              />
              <ErrorMessage
                name="mobile"
                component={Form.Control.Feedback}
                type="invalid"
              />
            </Form.Group>
          </Row>
          <div className="d-flex justify-content-center align-items-center">
            <CustomButton
              type="submit"
              title={`${
                loading || isSubmitting ? "Processing..." : "Make a Payment"
              }`}
              disabled={isSubmitting || loading}
            />
          </div>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error?.error}
            </Alert>
          )}
        </Form>
      )}
    </Formik>
  );
};

UserDetailForm.propTypes = {
  price: PropTypes.number.isRequired,
  musicId: PropTypes.string.isRequired,
};

export default UserDetailForm;
