import React, { useEffect, useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import ResultFilter from "./ResultFilter";
// import Cookie from "js-cookie";

function DatePickerTest() {
  const [service, setService] = useState([]);
  const [process, setProcess] = useState([]);
  const [serviceId, setserviceid] = useState("0");
  const [processId, setprocessid] = useState("0");
  const [parentId, setparentid] = useState("0");
  const [url1, setUrl1] = useState();
  const [url2, setUrl2] = useState();
  const [resultComponent, setResultComponent] = useState();
  const [check, setCheck] = useState(false);
  const [alertId, setAlertId] = useState();

  useEffect(() => {
    setCheck(false);
  }, [processId]);
  useEffect(() => {
    console.log("parent changed");
    setCheck(false);
    if (parentId.localeCompare("0") == 0) {
      setProcess([]);
      setService([]);
      setUrl1("http://localhost:8080/api/v1/getServiceByParent?parentId=");
      setUrl2(
        `http://localhost:8080/api/v1/getProcessByService?parentId=&serviceId=`
      );
      setserviceid("0");
      setprocessid("0");
    } else {
      setProcess([]);
      setService([]);
      setUrl1(
        `http://localhost:8080/api/v1/getServiceByParent?parentId=${parentId}`
      );
      setUrl2(
        `http://localhost:8080/api/v1/getProcessByService?parentId=${parentId}&serviceId=`
      );
      setserviceid("0");
      setprocessid("0");
    }
  }, [parentId]);

  useEffect(() => {
    axios.get(url1).then(
      (result) => {
        setService(result.data);
      },
      (error) => {
        console.log("Error fetch data.");
      }
    );
  }, [url1]);

  useEffect(() => {
    console.log("Service changed!");
    setCheck(false);
    if (serviceId.localeCompare("0") == 0 && parentId.localeCompare("0") == 0) {
      setProcess([]);
      setUrl2(
        "http://localhost:8080/api/v1/getProcessByService?parentId=&serviceId="
      );
      setprocessid("0");
    } else if (!serviceId.localeCompare("0") == 0) {
      setProcess([]);
      setUrl2(
        `http://localhost:8080/api/v1/getProcessByService?parentId=&serviceId=${serviceId}`
      );
      setprocessid("0");
    } else if (
      // อาจจะไม่ใช้
      !parentId.localeCompare("0") == 0
    ) {
      setProcess([]);
      setUrl2(
        `http://localhost:8080/api/v1/getProcessByService?parentId=${parentId}&serviceId=`
      );
      // setprocessid("0");
    }
  }, [serviceId]);

  useEffect(() => {
    url2 && console.log(url2);
    axios.get(url2).then(
      (result) => {
        setProcess(result.data);
      },
      (error) => {
        console.log("Error fetch data.");
      }
    );
  }, [url2]);

  return (
    <div className="grid-container">
      {serviceId &&
        parentId &&
        console.log(`${parentId} : ${serviceId} : ${processId}`)}
      <div className="grid-container-form">
        <div class="alert alert-primary" role="alert">
          {alertId}
        </div>
        <Form style={{ marginBottom: "10px" }}>
          <Form.Row
            className="align-items-center"
            style={{ marginBottom: "10px" }}
          >
            <Col xs="auto" className="my-1">
              <Form.Label
                className="mr-sm-2"
                htmlFor="inlineFormCustomSelect"
                // srOnly
              >
                พันธกิจ
              </Form.Label>
              <Form.Control
                as="select"
                className="mr-sm-2"
                size="sm"
                id="inlineFormCustomSelect"
                custom
                onChange={(e) => setparentid(e.target.value)}
              >
                <option value="0">-</option>
                <option value="1">บริการพื้นฐานทั่วไป</option>
                <option value="8">
                  การให้บริการสนับสนุนการเรียนการสอนและชีวิตความเป็นอยู่ของนิสิต
                </option>
                <option value="13">
                  การบริการสนับสนุนการวิจัยและการบริการวิชาการ
                </option>
                <option value="16">
                  การบริการสนับสนุนการบริหารจัดการทั่วไป
                </option>
              </Form.Control>

              <Form.Label
                className="mr-sm-2"
                htmlFor="inlineFormCustomSelect"
                // srOnly
              >
                บริการ
              </Form.Label>
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                custom
                onChange={(e) => setserviceid(e.target.value)}
              >
                <option value="0">-</option>
                {service &&
                  service.map((cur) => (
                    <option key={cur.id} value={cur.id}>
                      {cur.description}
                    </option>
                  ))}
              </Form.Control>

              <Form.Label
                className="mr-sm-2"
                htmlFor="inlineFormCustomSelect"
                // srOnly
              >
                กระบวนการ
              </Form.Label>
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                custom
                onChange={(e) => setprocessid(e.target.value)}
              >
                <option value="0">-</option>
                {process &&
                  process.map((cur) => (
                    <option key={cur.id} value={cur.id}>
                      {cur.description}
                    </option>
                  ))}
              </Form.Control>
            </Col>
          </Form.Row>
        </Form>
        {/* <Link
          to={{
            pathname: "/result",
            state: {
              parentId,
              serviceId,
              processId,
            },
          }}
        > */}
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            setCheck(true);
          }}
        >
          ค้นหา
        </Button>
        {/* </Link> */}

        {check ? (
          <ResultFilter state={{ parentId, serviceId, processId }} />
        ) : (
          "" 
        )}
      </div>
    </div>
  );
}

export default DatePickerTest;
