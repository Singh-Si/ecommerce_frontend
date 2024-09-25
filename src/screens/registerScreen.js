import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/formContainer";
import Message from "../components/message";
import Loader from "../components/loader";
import { register } from "../actions/user";
import { setLang } from "../Utils/setlang";
import FormComponent from "../components/formComponent";

const RegisterScreen = ({ location, history }) => {
    const [language, setLanguage] = useState("en");
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);

    // ReCaptcha
    const reRef = useRef();

    const redirect = location.search ? location.search.split("=")[1] : "/";
    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error } = userRegister;
    const userAuth = useSelector((state) => state.userAuth);
    const { userInfo } = userAuth;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const token = await reRef?.current?.executeAsync();
        reRef?.current?.reset();

        if (
            // username !== "" &&
            email !== "" &&
            validPassword &&
            validConfirmPassword
        ) {
            dispatch(register(firstName,lastName, email, password, language, token));
        }
    };

    const passwordOnChangeHandler = (e) => {
        let p = e.target.value;
        setPassword(p);
        if (p.length < 8) {
            setPasswordErrorMessage(
                "Password length must be greater than 8 character"
            );
            setValidPassword(false);
        } else {
            setPasswordErrorMessage(null);
            setValidPassword(true);
        }
    };
    const passwordConfirmOnChangeHandler = (e) => {
        const cPassword = e.target.value;
        setConfirmPassword(cPassword);
        if (password !== cPassword) {
            setPasswordMessage("Passwords does not match");
            setValidConfirmPassword(false);
        } else if (cPassword.length < 8) {
            setPasswordMessage(
                "Password length must be greater than 8 character"
            );
            setValidConfirmPassword(false);
        } else {
            setPasswordMessage("");
            setValidConfirmPassword(true);
        }
    };

    return (
        <FormContainer>
            <h1>REGISTER</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} autoComplete="on">
                <FormComponent
                    label="First Name"
                    type="text"
                    value={firstName}
                    placeholder="Enter your first name"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                 <FormComponent
                    label="Last Name"
                    type="text"
                    value={lastName}
                    placeholder="Enter your last name"
                    onChange={(e) => setLastName(e.target.value)}
                />
                
                <FormComponent
                    label="Email address"
                    type="email"
                    value={email}
                    placeholder="Enter your email address"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormComponent
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                    errorMessage={passwordErrorMessage}s
                    valid={validPassword}
                    onChange={passwordOnChangeHandler}
                />
                <FormComponent
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    placeholder="Enter your password again to confirm"
                    errorMessage={passwordMessage}
                    valid={validConfirmPassword}
                    onChange={passwordConfirmOnChangeHandler}
                />
                
                
                <div className="py-3">
                    <Button
                        type="submit"
                        variant="primary"
                        // disabled={
                        //     username === "" ||
                        //     email === "" ||
                        //     !validPassword ||
                        //     !validConfirmPassword
                        // }
                    >
                        Register
                    </Button>
                </div>
            </Form>

            <Row className="py-3">
                <Col>
                    Already have an account?{" "}
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    >
                        login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;
