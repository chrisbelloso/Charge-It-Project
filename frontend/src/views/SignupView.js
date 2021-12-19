import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxOption,
} from "@reach/combobox";

import {
    Navbar,
    Nav,
    Container,
    InputGroup,
    Button,
    FormControl,
    Form,
} from "react-bootstrap";

import { useLoadScript } from "@react-google-maps/api";

import { useEffect, useState } from "react";
import { loginCompanyToApi, signupCompany } from "../services/CompanyServices";
import { useNavigate } from "react-router";

const libraries = ["places"];

const SignupView = () => {
    const navigate = useNavigate();


    const [currentAddress, setCurrentAddress] = useState("");
    const [newCompany, setNewCompany] = useState({
        name: "",
        email: "",
        password: "",
        latitude: 0,
        longitude: 0,
    })

    const handleChange = (event) => {
        setNewCompany({
            ...newCompany,
            [event.target.name]: event.target.value,
        });
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        const companyResponse = await signupCompany(newCompany);
        navigate("/");
        
        await loginCompanyToApi({
            email: companyResponse.data.email,
            password: companyResponse.data.password
        });
        window.location.reload();
    };

    const Search = () => {
        const {
            ready,
            value,
            suggestions: { status, data },
            setValue,
            clearSuggestions,
        } = usePlacesAutocomplete({
            requestOptions: {
                location: {
                    lat: () => 25.76585949266363,
                    lng: () => -80.19816792343089,
                },
                radius: 10 * 1000,
            },
        });

        useEffect(() => {
            setValue(currentAddress, false);
        }, []);

        return (
            <div>
                <Combobox
                onSelect={async (address) => {
                    setCurrentAddress(address);
                    clearSuggestions();

                    try {
                        const results = await getGeocode({ address });
                        const { lat, lng } = await getLatLng(results[0]);
                        setNewCompany({
                            ...newCompany,
                            address: results[0].formatted_address,
                            latitude: lat,
                            longitude: lng,
                        });
                    } catch (error) {
                        console.log("error")
                    }
                }}
                >
                    <ComboboxInput
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        disabled={!ready}
                    />
                    <ComboboxPopover
                        style={{ listStyleType: "none" }}
                        className="search-field"
                    >
                        {status === "OK" &&
                        data.map(({ id, description }) => (
                            <div key={id}>
                                <ComboboxOption value={description} />
                            </div>
                        ))}
                    </ComboboxPopover>
                </Combobox>
            </div>
        );
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
        libraries,
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";

    return (
        <div className="container" style={{alignItems: "center"}}>
        <Form>
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="name"
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please include a name
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>Create password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                required
              />
              <Form.Text>
                Passwords should be at least 8 characters long and include
                capital & lowercase letters, numbers, and symbols
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please enter a valid password
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Search />

            <div
              style={{ color: "#dc3645", fontSize: "14px", marginTop: "3px" }}
            >
            </div>
          </Form.Group>

          <div>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%" }}
              onClick={handleSignup}
            >
              Sign up
            </Button>
          </div>
        </Form>
        </div>
    );
};

export default SignupView;