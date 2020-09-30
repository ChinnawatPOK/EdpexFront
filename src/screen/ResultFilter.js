import React, { useState, useEffect } from "react";
import { Form, Col, Button, Fade } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function ResultFilter(props) {
  const [dataId, setDataId] = useState(props.state);
  const [dataFetch, setDataFetch] = useState([]);

  useEffect(() => {
    dataId && console.log(dataId);
    axios
      .get(
        `http://localhost:8080/api/v1/filterData?parentId=${dataId.parentId}&serviceId=${dataId.serviceId}&processId=${dataId.processId}`
      )
      .then(
        (result) => {
          console.log(result.data);
          setDataFetch(result.data);
          // result.data.map((cur,index) => {
          //   if(cur.category == null)  setCard5(false)
          // })
        },
        (error) => {
          console.log("Error fetch data.");
        }
      );
  }, [dataId]);
  const subData = [
    {
      category: 1,
      data: [
        {
          ก: "7.1ก. ผลลัพธ์ด้านบริการและบริการที่มุ่งเน้นลูกค้า",
        },
        {
          ข: "7.1ข. ผลลัพธ์ด้านประสิทธิผลของกระบวนการทำงาน",
        },
        {
          ค: "7.1ค. ผลลัพธ์ด้านการจัดการห่วงโซ่อุปทาน",
        },
      ],
    },
    {
      category: 2,
      data: [
        {
          ก: "7.2ก. ผลลัพธ์ด้านการมุ่งเน้นลูกค้า",
        },
      ],
    },
    {
      category: 3,
      data: [
        {
          ก: "7.3ก. ผลลัพธ์ด้านการมุ่งเน้นบุคลากร",
        },
      ],
    },
    {
      category: 4,
      data: [
        {
          ก:
            "7.4ก. ผลลัพธ์ด้านการนำองค์การ การกำกับดูแล และความรับผิดชอบต่อสังคม",
        },
        {
          ข: "7.4ข. ผลลัพธ์ด้านการนำกลยุทธ์ไปปฏิบัติ",
        },
      ],
    },
    {
      category: 5,
      data: [
        {
          ก: "7.5ก. ผลลัพธ์ด้านงบประมาณ การเงินและตลาด ",
        },
      ],
    },
  ];

  return (
    <div class="accordion" id="accordionExample">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h2 class="mb-0">
            <button
              class="btn btn-link btn-block text-left"
              type="button"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              7.1 ผลลัพธ์ด้านการผลิตภัณฑ์และกระบวนการ
            </button>
          </h2>
        </div>

        <div
          id="collapseOne"
          class="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            <ul className="bullet">
              {subData &&
                subData[0].data.map((cur, index1) => (
                  <div>
                    <li className="bullet text-bold">{cur.ก}</li>
                    {/* ---- */}
                    <ul className="bullet">
                      {dataFetch &&
                        index1 == 0 &&
                        dataFetch.map((cur) => (
                          <div>
                            <li className="bullet">
                              <div id="example-fade-text">
                                <ul className="bullet">
                                  {cur.outputList != null &&
                                    cur.outputList.ก != null &&
                                    cur.category.localeCompare("7.1") == 0 &&
                                    cur.outputList.ก.map((io) => (
                                      <li
                                        className="bullet"
                                        style={{ display: "flex" }}
                                      >
                                        <div>{io.description}</div>
                                        <Link
                                          to={{
                                            pathname: "/showGraph",
                                            state: { outputId: io },
                                          }}
                                        >
                                          <Button
                                            variant="primary"
                                            style={{
                                              width: `15px`,
                                              height: `15px`,
                                            }}
                                            onClick={() => console.log(io.id)}
                                          >
                                            ...
                                          </Button>
                                        </Link>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </li>
                          </div>
                        ))}
                    </ul>
                    {/* --- */}
                  </div>
                ))}
              {/* =================================== */}
              {subData &&
                subData[0].data.map((cur, index1) => (
                  <div>
                    <li className="text-bold">{cur.ข}</li>
                    {/* ---- */}
                    <ul>
                      {dataFetch &&
                        index1 == 1 &&
                        dataFetch.map((cur, inx) => (
                          <div>
                            {/* <li> */}
                              <div id="example-fade-text">
                                <ul className="bullet">
                                  {cur.outputList != null &&
                                    cur.outputList.ข != null &&
                                    cur.category.localeCompare("7.1") == 0 &&
                                    cur.outputList.ข.map((io) => (
                                      <li
                                        className="bullet"
                                        style={{ display: "flex" }}
                                      >
                                        <div>{io.description}</div>
                                        <Link
                                          to={{
                                            pathname: "/showGraph",
                                            state: { outputId: io },
                                          }}
                                        >
                                          <Button
                                            variant="primary"
                                            style={{
                                              width: `15px`,
                                              height: `15px`,
                                            }}
                                            onClick={() => console.log(io.id)}
                                          >
                                            ...
                                          </Button>
                                        </Link>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            {/* </li> */}
                          </div>
                        ))}
                    </ul>
                    {/* --- */}
                  </div>
                ))}
              {/* =================================== */}
              {subData &&
                subData[0].data.map((cur, index1) => (
                  <div>
                    <li className="bullet text-bold">{cur.ค}</li>
                    {/* ---- */}
                    <ul className="bullet">
                      {dataFetch &&
                        index1 == 2 &&
                        dataFetch.map((cur) => (
                          <div>
                            <li className="bullet">
                              <div id="example-fade-text">
                                <ul className="bullet">
                                  {cur.outputList != null &&
                                    cur.outputList.ค != null &&
                                    cur.category.localeCompare("7.1") == 0 &&
                                    cur.outputList.ค.map((io) => (
                                      <li
                                        className="bullet"
                                        style={{ display: "flex" }}
                                      >
                                        <div>{io.description}</div>
                                        <Link
                                          to={{
                                            pathname: "/showGraph",
                                            state: { outputId: io },
                                          }}
                                        >
                                          <Button
                                            variant="primary"
                                            style={{
                                              width: `15px`,
                                              height: `15px`,
                                            }}
                                            onClick={() => console.log(io.id)}
                                          >
                                            ...
                                          </Button>
                                        </Link>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </li>
                          </div>
                        ))}
                    </ul>
                    {/* --- */}
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header" id="headingTwo">
          <h2 class="mb-0">
            <button
              class="btn btn-link btn-block text-left collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              7.2 ผลลัพธ์ด้านลูกค้า
            </button>
          </h2>
        </div>
        <div
          id="collapseTwo"
          class="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            <ul className="bullet">
              {subData &&
                subData[1].data.map((cur, index2) => (
                  <div>
                    <li className="bullet text-bold">{cur.ก}</li>
                    {/* ---- */}
                    <ul className="bullet">
                      {dataFetch &&
                        index2 == 0 &&
                        dataFetch.map((cur) => (
                          <div>
                            <li className="bullet">
                              <div id="example-fade-text">
                                <ul className="bullet">
                                  {cur.outputList != null &&
                                    cur.outputList.ก != null &&
                                    cur.category.localeCompare("7.2") == 0 &&
                                    cur.outputList.ก.map((io) => (
                                      <li
                                        className="bullet"
                                        style={{ display: "flex" }}
                                      >
                                        <div>{io.description}</div>
                                        <Link
                                          to={{
                                            pathname: "/showGraph",
                                            state: { outputId: io },
                                          }}
                                        >
                                          <Button
                                            variant="primary"
                                            style={{
                                              width: `15px`,
                                              height: `15px`,
                                            }}
                                            onClick={() => console.log(io.id)}
                                          >
                                            ...
                                          </Button>
                                        </Link>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </li>
                          </div>
                        ))}
                    </ul>
                    {/* --- */}
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingThree">
          <h2 class="mb-0">
            <button
              class="btn btn-link btn-block text-left collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              7.3 ผลลัพธ์ด้านการมุ่งเน้นบุคลากร
            </button>
          </h2>
        </div>
        <div
          id="collapseThree"
          class="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            <ul className="bullet">
              {subData &&
                subData[2].data.map((cur, index3) => (
                  <div>
                    <li className="bullet text-bold">{cur.ก}</li>
                    {/* ---- */}
                    <ul className="bullet">
                      {dataFetch &&
                        index3 == 0 &&
                        dataFetch.map((cur) => (
                          <div>
                            <li className="bullet">
                              <div id="example-fade-text">
                                <ul className="bullet">
                                  {cur.outputList != null &&
                                    cur.outputList.ก != null &&
                                    cur.category.localeCompare("7.3") == 0 &&
                                    cur.outputList.ก.map((io) => (
                                      <li
                                        className="bullet"
                                        style={{ display: "flex" }}
                                      >
                                        <div>{io.description}</div>
                                        <Link
                                          to={{
                                            pathname: "/showGraph",
                                            state: { outputId: io },
                                          }}
                                        >
                                          <Button
                                            variant="primary"
                                            style={{
                                              width: `15px`,
                                              height: `15px`,
                                            }}
                                            onClick={() => console.log(io.id)}
                                          >
                                            ...
                                          </Button>
                                        </Link>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </li>
                          </div>
                        ))}
                    </ul>
                    {/* --- */}
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header" id="headingFour">
          <h2 class="mb-0">
            <button
              class="btn btn-link btn-block text-left collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              7.4 ผลลัพธ์ด้านการนำองค์กร การกำกับดูแลและความรับผิดชอบต่อสังคม
            </button>
          </h2>
        </div>
        <div
          id="collapseFour"
          class="collapse"
          aria-labelledby="headingFour"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            <ul className="bullet">
              {subData &&
                subData[3].data.map((cur, index4) => (
                  <div>
                    <li className="bullet text-bold">{cur.ก}</li>
                    {/* ---- */}
                    <ul className="bullet">
                      {dataFetch &&
                        index4 == 0 &&
                        dataFetch.map((cur) => (
                          <div>
                            <li className="bullet">
                              <div id="example-fade-text">
                                <ul className="bullet">
                                  {cur.outputList != null &&
                                    cur.outputList.ก != null &&
                                    cur.category.localeCompare("7.4") == 0 &&
                                    cur.outputList.ก.map((io) => (
                                      <li
                                        className="bullet"
                                        style={{ display: "flex" }}
                                      >
                                        <div>{io.description}</div>
                                        <Link
                                          to={{
                                            pathname: "/showGraph",
                                            state: { outputId: io },
                                          }}
                                        >
                                          <Button
                                            variant="primary"
                                            style={{
                                              width: `15px`,
                                              height: `15px`,
                                            }}
                                            onClick={() => console.log(io.id)}
                                          >
                                            ...
                                          </Button>
                                        </Link>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </li>
                          </div>
                        ))}
                    </ul>
                    {/* --- */}
                  </div>
                ))}
              {/* ======================= */}
              {subData &&
                subData[3].data.map((cur, index4) => (
                  <div>
                    <li className="bullet text-bold">{cur.ข}</li>
                    {/* ---- */}
                    <ul className="bullet">
                      {dataFetch &&
                        index4 == 1 &&
                        dataFetch.map((cur) => (
                          <div>
                            <li className="bullet">
                              <div id="example-fade-text">
                                <ul className="bullet">
                                  {cur.outputList != null &&
                                    cur.outputList.ข != null &&
                                    cur.category.localeCompare("7.4") == 0 &&
                                    cur.outputList.ข.map((io) => (
                                      <li
                                        className="bullet"
                                        style={{ display: "flex" }}
                                      >
                                        <div>{io.description}</div>
                                        <Link
                                          to={{
                                            pathname: "/showGraph",
                                            state: { outputId: io },
                                          }}
                                        >
                                          <Button
                                            variant="primary"
                                            style={{
                                              width: `15px`,
                                              height: `15px`,
                                            }}
                                            onClick={() => console.log(io.id)}
                                          >
                                            ...
                                          </Button>
                                        </Link>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </li>
                          </div>
                        ))}
                    </ul>
                    {/* --- */}
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header" id="headingFive">
          <h2 class="mb-0">
            <button
              class="btn btn-link btn-block text-left collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              7.5ผลลัพธ์ด้านงบประมาณ การเงิน และตลาด
            </button>
          </h2>
        </div>
        <div
          id="collapseFive"
          class="collapse"
          aria-labelledby="headingFive"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            <ul className="bullet">
              {subData &&
                subData[4].data.map((cur, index5) => (
                  <div>
                    <li className="bullet text-bold">{cur.ก}</li>
                    {/* ---- */}
                    <ul className="bullet">
                      {dataFetch &&
                        index5 == 0 &&
                        dataFetch.map((cur) => (
                          <div>
                            <li className="bullet">
                              <div id="example-fade-text">
                                <ul className="bullet">
                                  {cur.outputList != null &&
                                    cur.outputList.ก != null &&
                                    cur.category.localeCompare("7.5") == 0 &&
                                    cur.outputList.ก.map((io) => (
                                      <li
                                        className="bullet"
                                        style={{ display: "flex" }}
                                      >
                                        <div>{io.description}</div>
                                        <Link
                                          to={{
                                            pathname: "/showGraph",
                                            state: { outputId: io },
                                          }}
                                        >
                                          {" "}
                                          <Button
                                            variant="primary"
                                            style={{
                                              width: `15px`,
                                              height: `15px`,
                                            }}
                                            onClick={() => console.log(io.id)}
                                          >
                                            ...
                                          </Button>
                                        </Link>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </li>
                          </div>
                        ))}
                    </ul>
                    {/* --- */}
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultFilter;
