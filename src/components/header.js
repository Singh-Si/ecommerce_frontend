import React, { useEffect, useState, useMemo } from "react";
import { logout } from "../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, Container, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { nav } from "../Utils/translateLibrary/navbar";
import logo from "../../src/images/logo ecoomerce.png";
import { fetchAllProducts } from "../actions/product";
import { fetchAllCategory } from "../actions/category";
import { useHistory } from "react-router-dom"; 

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();

    const [searchQuery, setSearchQuery] = useState("");
    const [searchCategory, setSearchCategory] = useState("");

    const userAuth = useSelector((state) => state.userAuth);
    const { userInfo } = userAuth;

    const settings = useSelector((state) => state.settings);
    const { language } = settings;

    const categoriesdata = useSelector((state) => state.categoryList);
    const { categories = [] } = categoriesdata || {};
    useEffect(() => {
        dispatch(fetchAllCategory());
    }, [dispatch]);
    // Memoize categories to prevent unnecessary re-renders
    const categoryArr = useMemo(() => categories, [categories]);

    const handleLogout = () => {
        dispatch(logout(userInfo._id));
    };
    function categorySelectionHandler(e){
        e.preventDefault()
        setSearchCategory(e.target.value)
    }
    const submitHandler = (e) => {
        e.preventDefault();

            dispatch(fetchAllProducts(searchQuery, searchCategory));
            history.push(`?category=${searchCategory}&query=${searchQuery}`);
        
    };
   

   

    return (
        <header>
            <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img
                            src={logo}
                            alt="E-Commerce Logo"
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                        />{" "}
                        E-Commerce
                    </Navbar.Brand>
                </LinkContainer>

                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/new-arrivals">
                                <Nav.Link>{nav.new[language]}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/men">
                                <Nav.Link>{nav.men[language]}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/women">
                                <Nav.Link>{nav.women[language]}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/kids">
                                <Nav.Link>{nav.kid[language]}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/discount">
                                <Nav.Link>{nav.sale[language]}</Nav.Link>
                            </LinkContainer>
                        </Nav>

                        <Nav className="ms-auto">
                            <Form inline onSubmit={submitHandler} className="d-flex">
                                <Form.Control
                                    as="select"
                                    value={searchCategory}
                                    onChange={(e) => categorySelectionHandler(e)}
                                    className="mr-2"
                                >
                                    <option value="">{"Select Category"}</option>
                                    {categoryArr.map((category) => (
                                        <option  value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Form.Control>

                                <FormControl
                                    type="text"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t("Search Products...")}
                                    className="mr-sm-2"
                                />

                                <Button type="submit" variant="outline-success" className="p-2">
                                    {t("Search")}
                                </Button>
                            </Form>

                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart" /> {nav.cart[language]}
                                </Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/settings">
                                <Nav.Link>
                                    <i className="fas fa-cog" />
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.username} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>{nav.profile[language]}</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/orderhistory">
                                        <NavDropdown.Item>{nav.yourorder[language]}</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={handleLogout}>
                                        {nav.logout[language]}
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fas fa-user" /> {nav.signin[language]}
                                    </Nav.Link>
                                </LinkContainer>
                            )}

                            {userInfo?.role === "admin" && (
                                <NavDropdown title="Admin Actions" id="adminmenu">
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>{nav.user[language]}</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>{nav.product[language]}</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>{nav.order[language]}</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
