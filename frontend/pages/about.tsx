import { Col, Row } from "antd";
import HomeLayout from "../components/layout/HomeLayout";

const Home = (): JSX.Element => {
    return (
        <>
            <HomeLayout
                body={
                    <>
                        <Row
                            justify="center"
                            style={{ backgroundColor: "white" }}
                        >
                            <Col
                                md={8}
                                style={{
                                    height: "80vh",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <Row align="middle" justify="center">
                                    <p
                                        style={{
                                            textAlign: "center",
                                            color: "var(--forum-blue)",
                                            fontSize: 36,
                                            fontFamily: "sans-serif",
                                        }}
                                    >
                                        {
                                            "There are many bugs here so please feel free to ignore them :-) Also ignore the ugly UI :))"
                                        }
                                    </p>
                                </Row>
                            </Col>
                        </Row>
                    </>
                }
            />
        </>
    );
};

export default Home;
