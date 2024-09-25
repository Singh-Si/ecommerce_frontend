import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/formContainer";
import Message from "../../components/message";
import Loader from "../../components/loader";
import { getUserInfo, updateUserProfile } from "../../actions/user";
import FormComponent from "../../components/formComponent";
import EditProfileNavbar from "../../components/editProfileNavbar";

const ProfileScreen = ({ history }) => {
    // States: Form items mobileNumber
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);

    const [city, setCity] = useState("");
    const [contactNum, setContactNum] = useState("");
    const [countryData, setCountryData] = useState([]);
    const [stateData, setSatateData] = useState([]);


    const dispatch = useDispatch();

    // Get states form redux store
    // User Details
    const userDetails = useSelector((state) => state.userDetails);
    console.log("userDetails..........................",userDetails)
    const { loading, error, user } = userDetails;

    // User Authentication
    const userAuth = useSelector((state) => state.userAuth);
    const { userInfo } = userAuth;
    
    // console.log("userAuth...............",userInfo.data)


    // Update User
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;
    let countryDataFun = async () => {
        try {
            const axios = require('axios');

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8888/api/v1/country/getAllCountries`,
                headers: {}
            };

            axios.request(config)
                .then(async (response) => {
                    let countryData = response.data
                    if(countryData.status == 200){
                        setCountryData(countryData.data)

                    }

                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log("Eroor occured", error)
        }
    }
    let stateDataFun = async () => {
        try {
            const axios = require('axios');

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8888/api/v1/state/getAllSatates?countryId=138330e1-17b6-45a7-9836-1df2dddff034`,
                headers: {}
            };

            axios.request(config)
                .then(async (response) => {
                    let stateData = response.data
                    if(stateData.status == 200){
                        setSatateData(stateData.data)

                    }

                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log("Eroor occured", error)
        }
    }
    // countryDataFun()

    useEffect(() => {
        countryDataFun()
        stateDataFun()
        // dispatch(getUserInfo(userInfo.data.id));

        let userData = userInfo.data
        console.log("ujndnfnfnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",userData)
        setFirstName(userData?.firstName ? userData.firstName : "");
        setLastName(userData?.lastName ? userData.lastName : "");
        setEmail(userData?.email ? userData?.email : "");
        setAddressLine1(userData?.addressLine1 ? userData?.addressLine1 : "");
        setAddressLine2(userData?.addressLine2 ? userData?.addressLine2 : "");
        setCountry(userData?.country ? userData?.country : "");
        setCity(userData?.city ? userData.city : "");
        setMobileNumber(userData?.mobileNumber ? userData?.mobileNumber : "");
        // if (!userInfo) {
        //     history.push("/login");
        // } else {
        //     if (!user) {
        //         dispatch(getUserInfo(userInfo._id));
        //     } else {
        //         console.log("..........................................................................")
        //         setFirstName(userInfo.firstName ? userInfo.firstName : "");
        //         setLastName(userInfo.lastName ? userInfo.lastName : "");
        //         setEmail(userInfo.email ? userInfo.email : "");
        //         setAddressLine1(userInfo.addressLine1 ? userInfo.addressLine1 : "");
        //         setAddressLine2(userInfo.addressLine2 ? userInfo.addressLine2 : "");
        //         setCountry(userInfo.country ? userInfo.country : "");
        //         setCity(userInfo.city ? userInfo.city : "");
        //         mobileNumber(userInfo.mobileNumber ? userInfo.mobileNumber : "");

        //     }
        // }
    }, [dispatch, history, userInfo, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("payload,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,",{firstName,
            lastName,
            email,
            contactNum,
            city,
            addressLine1,
            addressLine2,
            mobileNumber,
            state,
            country})
        if (email !== "") {
            dispatch(
                updateUserProfile(
                    firstName,
                    lastName,
                    email,
                    city,
                    addressLine1,
                    addressLine2,
                    country,mobileNumber,state
                )
            );
        }
       
    };
    const countryhandler =  (e) => {
        let countryObj = JSON.parse(e.target.value)
        setCountry(countryObj.id)
    }
    const stateHandler =  (e) => {
        let stateObj = JSON.parse(e.target.value)
        setState(stateObj.id)
    }

    return (
        <>
            <EditProfileNavbar />
            <FormContainer>
                <h1>UPDATE USER INFO</h1>
                {error && <Message variant="danger">{error}</Message>}
                {success && (
                    <Message variant="success">{"Profile Updated"}</Message>
                )}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} autoComplete="on">
                    <FormComponent
                        label="First Nmae"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <FormComponent
                        label="Last Name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <FormComponent
                        label="Email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormComponent
                        label="Address Line 1"
                        type="text"
                        placeholder={"Enter floor, Block and Room"}
                        value={addressLine1}
                        required={false}
                        onChange={(e) => setAddressLine1(e.target.value)}
                    />
                    <FormComponent
                        label="Address Line 2 (optional)"
                        type="text"
                        placeholder={"Enter Steet and District"}
                        value={addressLine2}
                        required={false}
                        onChange={(e) => setAddressLine2(e.target.value)}
                    />
                    <Form.Group className="py-2">
                        <Form.Label>Country or Region</Form.Label>
                        <Form.Select
                            onChange={(e)=>countryhandler(e)}
                            value={country}
                        >
                            {countryData.map(option => (
                                <option key={option.id} value={JSON.stringify(option)}>
                                    {option.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="py-2">
                        <Form.Label>State</Form.Label>
                        <Form.Select
                            onChange={(e)=>stateHandler(e)}
                            value={state}
                        >
                            {stateData.map(option => (
                                <option key={option.id} value={JSON.stringify(option)}>
                                    {option.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    {/* <Form.Group className="py-2">
                        <Form.Label>State </Form.Label>
                        <Form.Select
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                        >
                            <option value="">Select a state</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Japan">Japan</option>
                        </Form.Select>
                    </Form.Group> */}
                    <FormComponent
                        label="City (optional)"
                        type="text"
                        placeholder={"Enter City"}
                        value={city}
                        required={false}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <Form.Group className="py-2">
                        <Form.Label>{"Contact Number"}</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                {country === "Hong Kong" ? "+852" : "+81"}
                            </InputGroup.Text>
                            <FormControl
                                value={mobileNumber}
                                placeholder="Enter mobile number"
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <div className="py-3">
                        <Button
                            onClick={submitHandler}
                            variant="primary"
                            disabled={email === ""}
                        >
                            Update Profile
                        </Button>
                    </div>
                </Form>
            </FormContainer>
        </>
    );
};

export default ProfileScreen;
