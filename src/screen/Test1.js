import React, { useState, useEffect } from "react";
import { Input, Space, Button, Form } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { ConfigProvider } from "antd";
import axios from "axios";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";

export default function Test1(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const userData = Cookie.getJSON("userData");

  // กรณีที่ login แล้วแต่จะกลับมา หน้า login อีกจะไม่ได้
  useEffect(() => {
    if (userData) {
      // Test ไป user ดูอีกทีว่าจะให้ไปไหน
      props.history.push("/user");
    }
    return () => {};
  }, []);

  const onClickBtn = () => {
    console.log(username);
    console.log(password);
    axios
      .post("http://localhost:8080/token/generate-token", {
        username,
        password,
      })
      .then(
        (res) => {
          Cookie.set("userData", JSON.stringify(res.data));
          console.log(res.data);
          console.log("Login Pass");
          console.log(res.data.userInfo.roles);
          const arr = [];
          res.data.userInfo.roles.forEach((cur, index) => {
            arr.push(cur.id);
          });
          console.log(arr);
          // Admin Login
          if (arr.includes(1)) {
            props.history.push("/admin");
          } else if (arr.includes(2)) {
            props.history.push("/user");
          }
          // window.location.reload();
          return res.data;
        },
        (error) => {
          if (error.response.status != 200) {
            console.log("Not pass Test");
            console.log(error.response.data.message);
          }
        }
      );
  };

  return (
    <div className="grid-container">
      <section className="left-section">
        <div className="news">
          <strong className="font-header">ข่าวสารประชาสัมพันธ์</strong>
        </div>
      </section>
      <div className="right-section">
        <div className="right-detail">
          <img src="logo.png" alt="logo-ku"></img>

          <div className="set">
            <Input
              size="large"
              placeholder="กรุณากรอกชื่อผู้ใช้"
              bordered={true}
              onChange={(e) => setUserName(e.target.value)}
              prefix={<UserOutlined />}
            />

            <br />
            <br />

            <Input.Password
              placeholder="กรุณาใส่รหัสผ่าน"
              size="large"
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <br />
            <br />

            <Button type="default" size="middle" onClick={onClickBtn}>
              เข้าสู่ระบบ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
