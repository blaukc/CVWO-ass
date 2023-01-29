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
                                        Welcome to my CVWO Forum. <br />
                                        This is a place for NUS students to ask
                                        questions and learn more about their
                                        faculty. <br />I didn&apos;t have much
                                        time so I did what I could with whatever
                                        time I had. <br />
                                        <b>
                                            Also backend is hosted on render so
                                            it may take a while to start running
                                            🤡
                                        </b>
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
