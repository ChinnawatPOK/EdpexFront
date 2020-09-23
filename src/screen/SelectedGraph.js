import "date-fns";
import React, { useState, useEffect } from "react";
import MomentUtils from "@date-io/moment";
import { Button } from "react-bootstrap";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from "material-ui-thai-datepickers";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "moment/locale/th";
import moment from "moment";
import axios from "axios";

function SelectedGraph(props) {
  const [selectedDate, handleDateChange] = useState(null);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [endDate, setEndDate] = useState();
  const [type, setType] = useState(props.location.state.outputId.type);
  const [outputId, setOutputId] = useState(props.location.state.outputId.id);
  useEffect(() => {
    // console.log(moment(selectedDate).get("date"));
    // console.log(moment(selectedDate).month() + 1);
    // console.log(moment(selectedDate).year());
    setFromDate(
      moment(
        `${moment(selectedDate).year()}-${
          moment(selectedDate).month() + 1
        }-${moment(selectedDate).get("date")}`
      ).format("YYYY-MM-DD")
    );
    // setFromDate("2018-02-01");
    // setToDate("2020-08-30");
    setToDate(moment().format("YYYY-MM-DD"));

    // ต้องดูปีการศึกษาด้วย
    if (moment().month() + 1 >= 8) {
      setEndDate(
        moment(`${moment().year() - 2}-${8}-${1}`).format("YYYY-MM-DD")
      );
    } else {
      setEndDate(
        moment(`${moment().year() - 3}-${8}-${1}`).format("YYYY-MM-DD")
      );
    }
    // setEndDate(moment().subtract(3, "years"));
  }, [selectedDate]);

  // Function to check Type Graph
  const fetchGraphData = () => {
    axios
      .get(
        `http://localhost:8080/api/v1/scoregroup?startDate=${fromDate}&endDate=${toDate}&type=2`
      )
      .then(
        (result) => {
          console.log(result.data);
          // setDataFetch(result.data);
        },
        (error) => {
          console.log("Error fetch data.");
        }
      );
  };

  return (
    <div className="grid-container test">
      {type && outputId && console.log(`${type} + ${outputId}`)}
      <div>
        <MuiPickersUtilsProvider utils={MomentUtils} locale="th">
          <DatePicker
            label="กรุณาเลือกวันที่ย้อนหลัง *"
            format="ddd D/MMM/yyyy"
            // pickerHeaderFormat="ddd D MMM"
            allowKeyboardControl="true"
            yearOffset={543}
            value={selectedDate}
            onChange={(date) => handleDateChange(date)}
            maxDate={new Date(moment().subtract(1, "days"))}
            minDate={new Date(endDate)}
            onAccept={(date) => console.log("complete")}
          />
        </MuiPickersUtilsProvider>
      </div>

      <div>
        <MuiPickersUtilsProvider utils={MomentUtils} locale="th">
          <DatePicker
            label="วันปัจจุบัน"
            format="ddd D / MMM / yyyy"
            // pickerHeaderFormat="ddd D MMM"
            disabled="false"
            yearOffset={543}
            value={toDate}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div>
        <Button variant="primary" onClick={() => fetchGraphData()}>
          แสดงกราฟ
        </Button>
      </div>
    </div>
  );
}
export default SelectedGraph;
