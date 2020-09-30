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
  const [selectedDate2, handleDateChange2] = useState(null);
  const [toFDate, setToFDate] = useState(moment());
  const [toTDate, setToTDate] = useState(moment());
  const [endFDate, setEndFDate] = useState(null);
  const [endTDate, setEndTDate] = useState(null);
  const [toDis, setToDis] = useState(true);
  const [type, setType] = useState(props.location.state.outputId.type);
  const [outputId, setOutputId] = useState(props.location.state.outputId.id);
  const [key, setKey] = useState(null);
  useEffect(() => {
    if (type == 15) {
      axios
        .get(`http://localhost:8080/api/v1/getConfigByValue?value=${outputId}`)
        .then(
          (result) => {
            // console.log(result.data.key);
            setKey(result.data.key);
          },
          (error) => {
            console.log(error.response.data.message);
          }
        );
    }
    // ต้องดูปีการศึกษาด้วย
    if (moment(selectedDate).month() + 1 >= 8 && selectedDate2 == null) {
      setEndTDate(moment(selectedDate));
      setToTDate(
        moment(`${moment(selectedDate).year() + 3}-${7}-${31}`).format(
          "YYYY-MM-DD"
        )
      );
    } else if (moment(selectedDate).month() + 1 < 8 && selectedDate2 == null) {
      setEndTDate(moment(selectedDate));
      setToTDate(
        moment(`${moment(selectedDate).year() + 2}-${7}-${31}`).format(
          "YYYY-MM-DD"
        )
      );
    } else if (
      selectedDate != null &&
      selectedDate2 != null &&
      moment(selectedDate).month() + 1 >= 8
    ) {
      setToTDate(
        moment(`${moment(selectedDate).year() + 3}-${7}-${31}`).format(
          "YYYY-MM-DD"
        )
      );
      setEndTDate(selectedDate);
      handleDateChange2(null);
    } else if (
      selectedDate != null &&
      selectedDate2 != null &&
      moment(selectedDate).month() + 1 < 8
    ) {
      setToTDate(
        moment(`${moment(selectedDate).year() + 2}-${7}-${31}`).format(
          "YYYY-MM-DD"
        )
      );
      setEndTDate(selectedDate);
      handleDateChange2(null);
    }
    if (selectedDate != null) setToDis(false);
  }, [selectedDate]);

  useEffect(() => {
    if (moment(selectedDate2).month() + 1 >= 8 && selectedDate == null) {
      setEndFDate(
        moment(`${moment(selectedDate2).year() - 2}-${8}-${1}`).format(
          "YYYY-MM-DD"
        )
      );
      setToFDate(selectedDate2);
    } else if (moment(selectedDate2).month() + 1 < 8 && selectedDate == null) {
      setEndFDate(
        moment(`${moment().year() - 3}-${8}-${1}`).format("YYYY-MM-DD")
      );
      setToFDate(selectedDate2);
    }
    // else if (selectedDate2 != null) {
    //   setEndFDate(null);
    // }
  }, [selectedDate2]);

  // Function to check Type Graph
  const fetchGraphData = () => {
    console.log(props.location.state.outputId.description);
    if ([1, 5, 6, 7, 9, 13].includes(outputId)) {
      // API 1
      // outputId
      console.log("--------contains type normal");
    } else if (type == 15) {
      if (key.localeCompare("midOutput1") == 0) console.log("midoutPut 1 OKK");
      else if (key.localeCompare("midOutput1") == 0)
        // API 2
        //Type 3
        console.log("midoutPut 2 OKK");
      else if (key.localeCompare("midOutput2") == 0)
        // API 2
        //Type 2
        console.log("midoutPut 2 OKK");
      else if (key.localeCompare("midOutput3") == 0)
        // API 7
        //Type 4
        console.log("midoutPut 3 OKK");
      else if (key.localeCompare("midOutput4") == 0)
        // API 3
        console.log("midoutPut 4 OKK");
      else if (key.localeCompare("midOutput5") == 0)
        // API 9
        console.log("midoutPut 5 OKK");
      else if (key.localeCompare("midOutput6") == 0)
        // API 1
        // TYPE 13
        // OutputID ดูoutputอีกที
        console.log("midoutPut 6 OKK");
      else if (key.localeCompare("midOutput7") == 0)
        // API 8
        console.log("midoutPut 7 OKK");
      else if (key.localeCompare("midOutput8") == 0)
        // API 6
        // TYPE 8
        console.log("midoutPut 8 OKK");
      else if (key.localeCompare("midOutput9") == 0)
        //  ========================
        console.log("midoutPut 9 OKK");
      else if (key.localeCompare("midOutput10") == 0)
        //  ========================
        console.log("midoutPut 10 OKK");
      else if (key.localeCompare("midOutput11") == 0)
        // API 1
        // TYPE 6
        // อย่าลืืมไปเพิ่ม output_map_input ด้วยของ outputนี้
        console.log("midoutPut 11 OKK");
      else if (key.localeCompare("midOutput12") == 0)
        // API 1
        // TYPE 6
        // อย่าลืืมไปเพิ่ม output_map_input ด้วยของ outputนี้
        console.log("midoutPut 12 OKK");
      else if (key.localeCompare("midOutput13") == 0)
        // API 1
        // TYPE 1
        // อย่าลืืมไปเพิ่ม output_map_input ด้วยของ outputนี้
        console.log("midoutPut 13 OKK");
    }

    // axios
    //   .get(
    //     `http://localhost:8080/api/v1/scoregroup?startDate=${fromDate}&endDate=${toDate}&type=2`
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.data);
    //       // setDataFetch(result.data);
    //     },
    //     (error) => {
    //       console.log("Error fetch data.");
    //     }
    //   );
  };

  return (
    <div className="grid-container test">
      {type && outputId && console.log(`${type} + ${outputId}`)}
      {selectedDate &&
        selectedDate2 != null &&
        selectedDate2 &&
        console.log(`${selectedDate} >> ${selectedDate2}`)}
      <div>
        <MuiPickersUtilsProvider utils={MomentUtils} locale="th">
          <DatePicker
            label="* กรูณาเลือกวันที่"
            format="ddd D/MMM/yyyy"
            // pickerHeaderFormat="ddd D MMM"
            allowKeyboardControl="true"
            yearOffset={543}
            value={selectedDate}
            onChange={(date) =>
              handleDateChange(moment(date).format("YYYY-MM-DD"))
            }
            minDate={new Date(endFDate)}
            maxDate={new Date(toFDate)}
            // onAccept={(date) => console.log("complete")}
          />
        </MuiPickersUtilsProvider>
      </div>

      <div>
        <MuiPickersUtilsProvider utils={MomentUtils} locale="th">
          <DatePicker
            label="* กรูณาเลือกวันที่"
            format="ddd D/MMM/yyyy"
            allowKeyboardControl="true"
            disabled={toDis ? "disabled" : null}
            yearOffset={543}
            value={selectedDate2}
            maxDate={new Date(toTDate)}
            minDate={new Date(endTDate)}
            onChange={(date) =>
              handleDateChange2(moment(date).format("YYYY-MM-DD"))
            }
            // onAccept={(date) => console.log("complete")}
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
