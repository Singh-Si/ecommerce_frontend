import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../actions/product";
import {
    CardComponent,
    cardArr,
    socialHandles,
    ProductsCardComponent,
    ProductCard
} from "../Utils/homeUIItems";
// import Loader from "../components/Loader"; // Import the Loader component
import Loader from "./Loader";
const HomeScreen = ({ history }) => {
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productList);
    const allProducts = productDetails.products || [];

    // State to handle loading
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const productFetch = async () => {
        const product = await dispatch(fetchAllProducts());
        setLoading(false); // Set loading to false once products are fetched
        console.log(product);
    };

    useEffect(() => {
        productFetch();
    }, []);

    return (
        <>
            <CardComponent
                history={history}
                title={"Check out our latest products"}
                text={"Check out our latest products"}
                link={"/new-arrivals"}
                buttonName={"New Arrivals"}
            />

            {/* Render promotional cards */}
            <Row className="d-flex justify-content-center">
                <Row className="g-4">
                    {cardArr.map((item, idx) => (
                        <Col key={idx} md>
                            <ProductsCardComponent item={item} height={550} />
                        </Col>
                    ))}
                </Row>
            </Row>

            {/* Render loader if products are loading */}
            {loading ? (
                <Loader />
            ) : (
                <Container>
                    <h1>Shop All Products</h1>
                    <Row>
                        {allProducts.map((product) => (
                            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}

            {/* Render social media links */}
            <Row className="d-flex justify-content-center">
                <Row className="g-4">
                    {socialHandles.map((item, idx) => (
                        <Col key={idx} md={3} xs={6} className="p-4">
                            <ProductsCardComponent item={item} height={110} />
                        </Col>
                    ))}
                </Row>
            </Row>
        </>
    );
};

export default HomeScreen;
