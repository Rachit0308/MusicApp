import { Form, Row } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import CustomButton from "../common/CustomButton";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  name: Yup.string().required("Name is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
});

const initialValues = {
  name: "",
  mobile: "",
  email: "",
};

const UserDetailForm = () => {
  const { response, loading, fetchData } = useAxios();
  const navigate = useNavigate();
  console.log(response, "response");
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
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
          productId: "273769-2362320fwfe6234-efe342",
          amount: "80",
        },
      });
      if (responseData) {
        resetForm();
        navigate("/payment", {
          state: {
            email: values.email,
            clientSecret: responseData?.clientSecret,
            buyerId: buyerData?.id,
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
                type="text"
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
        </Form>
      )}
    </Formik>
  );
};

UserDetailForm.propTypes = {
  initialValues: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default UserDetailForm;
