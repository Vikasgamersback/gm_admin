//import dependencies
import CryptoJS from "crypto-js";

//import config
import { config } from "./configUtils";

//import files
import constants from "../json/constants.json";

const utils = {};

utils.dataDcryption = (data) => {
  // Decrypt
  const bytes = CryptoJS.AES.decrypt(data, config.secretEncryptKey);
  const originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return originalText;
};

utils.extractHeadingsandSubheadings = (data) => {
  const headings = [];
  const subheadings = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].subheading.length; j++) {
      // console.log(data[i].subheading[j].name)
      if (
        data[i].subheading[j].privilages.view === true ||
        data[i].subheading[j].privilages.add === true ||
        data[i].subheading[j].privilages.edit === true ||
        data[i].subheading[j].privilages.delete === true
      ) {
        headings.push(data[i].heading);
        subheadings.push(data[i].subheading[j].name);
      }
    }
  }
  return [headings, subheadings];
};
utils.fetchTableLimits = (cookies) => {
  const settingsData = cookies[constants.SETTINGSDATA];
  return settingsData.tableLimitSize.reduce((acc, curr) => {
    if (curr.status === true) {
      acc.push(curr.num);
    }
    return acc;
  }, []);
};
utils.getDateFormat = (date, format) => {
  const d = new Date(date);
  let day =
    d.getDate().toString().length === 1
      ? "0" + d.getDate().toString()
      : d.getDate().toString();
  let year = d.getFullYear();
  let month =
    d.getMonth().toString().length === 1
      ? "0" + (d.getMonth() + 1)
      : d.getMonth() + 1;
  switch (format) {
    case "dd/mm/yyyy":
      return `${day}/${month}/${year}`;
    case "mm/dd/yyyy":
      return `${month}/${day}/${year}`;
    case "yyyy/mm/dd":
      return `${year}/${day}/${month}`;
    case "dd-mm-yyyy":
      return `${day}-${month}-${year}`;
    case "yyyy-mm-dd":
      return `${year}-${month}-${day}`;
    default:
      return `${day}/${month}/${year}`;
  }
};

utils.getTimeFormat = (date, format) => {
  const d = new Date(date);
  let hours =
    d.getHours().toString().length === 1
      ? "0" + d.getHours().toString()
      : d.getHours().toString();

  let min =
    d.getMinutes().toString().length === 1
      ? "0" + d.getMinutes().toString()
      : d.getHours().toString();
  let sec =
    d.getSeconds().toString().length === 1
      ? "0" + d.getSeconds().toString()
      : d.getSeconds().toString();
  let millisec =
    d.getMilliseconds().toString().length === 1
      ? "0" + d.getMilliseconds().toString()
      : d.getMilliseconds().toString();
  switch (format) {
    case "hh:mm/:ss":
      return `${hours}:${min}:${sec}`;
    case "hh:mm:ss:ms":
      return `${hours}:${min}:${sec}:${millisec}`;
    case "hh:mm":
      return `${hours}:${min}`;

    default:
      return `${hours}:${min}:${sec}`;
  }
};

utils.greetingHandler = () => {
  let myDate = new Date();
  let hrs = myDate.getHours();
  if (hrs < 12) {
    return "Good Morning";
  } else if (hrs >= 12 && hrs <= 17) {
    return "Good Afternoon";
  } else if (hrs >= 17 && hrs <= 24) {
    return "Good Evening";
  }
};

utils.handlingTimeAndDate = () => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let today = new Date();

  let day = today.getDate();
  let month = monthNames[today.getMonth()];
  let year = today.getFullYear();
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;

  return day + " " + month + " " + year + "  " + strTime;
};

utils.toSentenceCase = (inputString) => {
  if (!inputString || typeof inputString !== "string") {
    return "";
  }

  return inputString.replace(/\w\S*/g, function (word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
};

export default utils;
