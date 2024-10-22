import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import {Grid, TextField, Typography} from "@mui/material";
import ExternalLabel from "asseco-commons/dist/utils/ExternalLabel";
import {translate} from "../lang/translate-wrapper";

const maskEnum = ["DD-MM-YYYY", "MM-YYYY", "YYYY"];

const ThreeFieldsDatePicker = (props) => {
  const {
    autoFocus = true,
    label,
    field,
    form: {
      touched,
      errors,
      values,
      setFieldValue,
      setFieldTouched,
        setFieldError,
      isSubmitting,
    },
    format,
    outputFormat,
    selectablePattern = false,
    inputVariant,
    size,
      margin,
      externalLabel=false,
      onChange,
    ...other
  } = props;

  const errorText = _.get(errors, field.name);
  const hasError = _.get(touched, field.name) && errorText !== undefined;
  const formikVal = _.get(values, field.name);
  const maskFieldName = field.name + "Mask";
  const maskVal = _.get(values, maskFieldName,"DD-MM-YYYY");

  const [year, setYear] = useState("" );
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [internalErrorText,setInternalErrorText] = useState();

  const dayRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();


  useEffect(()=>{

    if(!formikVal) {
        setYear("")
        setMonth("");
        setDay("")
    }

    let date = moment(formikVal, outputFormat ? outputFormat : "YYYY-MM-DDTHH:mm:ss.SSS");

    if(date.isValid()) {
      if(internalErrorText)
        setInternalErrorText(undefined);

      if(maskVal===maskEnum[0])
        setDay(date.date().toString().padStart(2,'0'));
      else setDay("");


      if(maskVal===maskEnum[0] || maskVal===maskEnum[1])
        setMonth((date.month() + 1).toString().padStart(2,'0'));
      else setMonth("")

      if(maskVal===maskEnum[0] || maskVal===maskEnum[1] || maskVal===maskEnum[2])
      setYear(date.year().toString().padStart(4,'0'));

    } else {
      if(formikVal)
        setInternalErrorText("Cant render date");
    }

  },[formikVal,maskVal])



  const setFormikVal = () => {
    if(!day && !month && !year) {
      setFieldValue(field.name, undefined)
      setFieldValue(maskFieldName,undefined)
      onChange && onChange(undefined);
      setInternalErrorText(undefined);
      return;
    }

    if(year) {

      let tempMask = `${day&&month&&year?"DD-":""}${month&&year?"MM-":""}YYYY`;
      let tempDay = day?day.toString().padStart(2, '0'):"01";
      let tempMonth = month?month.toString().padStart(2, '0'):"01";
      let tempYear = year.toString().padStart(4, '0');

      let date = moment(`${tempYear}-${tempMonth}-${tempDay}`, "YYYY-MM-DD").startOf("day");
      const dateValid = date.isValid();
      if (dateValid) {
        if(internalErrorText)
          setInternalErrorText(undefined);

        let result = date.format("YYYY-MM-DD");

        if (result !== formikVal) {
          setFieldValue(field.name, result)
          onChange && onChange(result);
        }

        if(tempMask !== _.get(values,maskFieldName)) {//ne e isto so maskVal, tamu ima inicijalna sostojba
          setFieldValue(maskFieldName,tempMask)
        }

      } else {
        setInternalErrorText(translate("app.dateField.invalidDate"))
      }
    } else {
      setInternalErrorText(translate("app.dateField.requiredYear"));
    }
  }

  const debouncedBlur = _.debounce(()=>{
    if(!isRefFocused(dayRef) & !isRefFocused(monthRef) && !isRefFocused(yearRef))
      setFieldTouched(field.name, true);
  },100);

  const handleBlur = () => {
    debouncedBlur();
    setFormikVal();
  }
  const handleKeyUp = _.debounce((value,key) => {

    if((/[\d]/).test(key) && value && dayRef && monthRef && yearRef) {
      if (isRefFocused(dayRef)) {
        if (value.length >= 2)
          monthRef.current.focus();
      } else if (isRefFocused(monthRef)) {
        if (value.length >= 2)
          yearRef.current.focus();
      } else if (isRefFocused(yearRef)) {
        if (value.length >= 4)
          setFormikVal();
      }
    }
  },40)

  const handleKeyDown = (e) => {
    if(e.target)
    {
      if ((e.key === "Backspace" || e.key === "ArrowLeft") && (e.target.selectionStart === 0 && e.target.selectionEnd === 0)) {
        if (isRefFocused(monthRef)) {
          dayRef.current.focus();
        } else if (isRefFocused(yearRef)) {
          monthRef.current.focus();
        }
      }
      else if (e.key === "ArrowRight" && (e.target.selectionStart === e.target.value.length && e.target.selectionEnd === e.target.value.length)) {
        if (isRefFocused(dayRef)) {
          monthRef.current.focus();
        } else if (isRefFocused(monthRef)) {
          yearRef.current.focus();
        }
      }
    }
  }

  return (
      <div title={`${formikVal} ${maskVal}`} >
      <ExternalLabel enabled={externalLabel} label={label} labelWidth={other.externalLabelWidth}  disabled={other.disabled} labelXS={other.labelXS} >
        <Grid container spacing={1} name={field.name} >
          <Grid item xs={3}>
            <TextField
                inputRef={dayRef}
                placeholder={translate("app.dateField.day")}
                onBlur={handleBlur}
                onFocus={()=>{dayRef.current.select();}}
                onKeyUp={(e)=>{if(autoFocus)handleKeyUp(e.target.value,e.key)}}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  //e.target.value = e.target.value.slice(-2)
                  setDay(e.target.value);
                }}
                value={day}
                size={size}
                margin={margin}
                variant={"outlined"}
                inputProps={{style: {textAlign: "right"}}}
                {...other}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
                inputRef={monthRef}
                placeholder={translate("app.dateField.month")}
                onBlur={handleBlur}
                onFocus={()=>{monthRef.current.select();}}
                onKeyUp={(e)=>{if(autoFocus)handleKeyUp(e.target.value,e.key)}}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setMonth(e.target.value);
                }}
                value={month}
                size={size}
                margin={margin}
                variant={"outlined"}
                inputProps={{style: {textAlign: "right"}}}
                {...other}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
                inputRef={yearRef}
                placeholder={translate("app.dateField.year")}
                onBlur={handleBlur}
                onFocus={()=>{yearRef.current.select();}}
                onKeyUp={(e)=>{if(autoFocus)handleKeyUp(e.target.value,e.key)}}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
                value={year}
                size={size}
                margin={margin}
                variant={"outlined"}
                inputProps={{style: {textAlign: "right"}}}
                {...other}
            />
          </Grid>
          {(internalErrorText || errorText) && (
              <Grid item xs={12} >
                <Typography
                    variant="caption"
                    component={"div"}
                    style={{
                      borderTop: "1px solid red",
                      width: "100%",
                      color: "red",
                      fontSize: "12px",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                    }}
                >
                {internalErrorText?internalErrorText:errorText}
              </Typography>
              </Grid>
          )}

        </Grid>

      </ExternalLabel>
      </div>
  );
};

ThreeFieldsDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    dirty: PropTypes.bool,
    errors: PropTypes.object,
  }).isRequired,
  fullWidth: PropTypes.bool,
  margin: PropTypes.oneOf(["none", "dense", "normal"]),
  pattern: PropTypes.string,
  outputFormat: PropTypes.string,
  size: PropTypes.string,
  inputVariant: PropTypes.oneOf(["outlined", "standard", "filled"]),
};

ThreeFieldsDatePicker.defaultProps = {
  fullWidth: true,
  margin: "none",
  size: "small",
  inputVariant: undefined,
};

const isRefFocused = (ref) => {
  return document.activeElement === ref.current;
}

export default ThreeFieldsDatePicker;
