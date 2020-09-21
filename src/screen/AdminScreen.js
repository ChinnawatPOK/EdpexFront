import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function AdminScreen(props) {
  const [content, setContent] = useState([]);
  const [err, setErr] = useState("");
  const userData = Cookie.getJSON("userData");

  // localhost:8080/api/v1/graphCorrectDate?startDate=2017-01-01&endDate=2020-08-29
  useEffect(() => {
    if (userData && userData.token) {
      axios
        .get("http://localhost:8080/api/v1/graphCorrectDate?startDate=2017-01-01&endDate=2020-08-29")
        .then(
          (result) => {
            setContent(result.data);
            console.log(result.data);
          },
          (error) => {
            console.log("ERRORORORORO");
            setErr(
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            );
          }
        );
    } else {
      setErr("คุณไม่มีสิทธิ์เข้าใช้งานหน้านี้ กรุณาเข้าสู่ระบบ");
    }
  }, []);

  const logout = () => {
    Cookie.remove("userData");
  };

  // เข้าถึงข้อมูลจาก Cookie ได้ OKKKKKK
  return (
    <div>
      {err ? (
        <h3>{err}</h3>
      ) : (
        <div>
          <ul>
            {/* {content && content.map((cur, index) => <li>{cur.description}</li>)} */}
          </ul>
          <a href="/">Logout</a>
        </div>
      )}
    </div>
  );
}
