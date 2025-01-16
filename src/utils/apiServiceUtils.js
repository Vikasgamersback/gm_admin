//import dependencies
import axios from "axios";

//import files
import constants from "../json/constants.json";

export const invokeApi = async (url, params, cookies) => {
  try {
    let headers = {
      "Content-Type": "application/json",
    };
    if (cookies[constants.ADMINDATA]) {
      headers.authorization =
        "Bearer " + cookies[constants.ADMINDATA].accessToken;
    }
    const response = await axios.post(url, params, { headers: headers });

    // const encryptedData = await helperUtils.dataDcryption(response.data);
    return response.data;
  } catch ({ response }) {
    return response.data;
  }
};

export const invokeFormDataApi = async (url, formData) => {
  try {
    let headers = {
      "Content-Type": "multipart/form-data",
    };
    let response = await axios.post(url, formData, { headers: headers });
    return response.data;
  } catch ({ response }) {
    return response.data;
  }
};

export const apiList = {
  adminLogin: "/admin/login",
  forgotPassword: "/admin/forgotPassword",
  changePassword: "/admin/changePassword",
  addAdmin: "/admin/addAdmin",
  editAdmin: "/admin/editAdmin",
  singleImage: "/upload/singleImage",
  getAdminsList: "/admin/getAdminsList",
  changeStatusAdmin: "/admin/changeStatusAdmin",
  archiveAdmin: "/admin/archiveAdmin",
  getAdminDetail: "/admin/getAdminDetail",
  getUserList: "/admin/getUserList",
  getUserDetail: "/admin/getUserDetail",
  archiveUser: "/admin/archiveUser",
  changeStatusUser: "/admin/changeStatusUser",
  getGamepediaList: "/admin/getGamepediaList",
  changeStatusGamepedia: "/admin/changeStatusGamepedia",
  getGamepediaDetail: "/admin/getGamepediaDetail",
  addGamepedia: "/admin/addGamepedia",
  editGamepedia: "/admin/editGamepedia",
  getThemesList: "/admin/getThemesList",
  addTheme: "/admin/addTheme",
  editTheme: "/admin/editTheme",
  getThemeDetail: "/admin/getThemeDetail",
  changeStatusTheme: "/admin/changeStatusTheme",
  deleteTheme: "/admin/deleteTheme",
  getJobList: "/admin/getJobList",
  addJob: "/admin/addJob",
  editJob: "/admin/editJob",
  getJobDetail: "/admin/getJobDetail",
  deleteJob: "/admin/deleteJob",
  changeStatusJob: "/admin/changeStatusJob",
  getReportsList: "/admin/getReportsList",
  getReportDetail: "/admin/getReportDetail",
  getBlogList: "/admin/getBlogList",
  getBlogDetail: "/admin/getBlogDetail",
  changeStatusBlog: "/admin/changeStatusBlog",
  addBlog: "/admin/addBlog",
  editBlog: "/admin/editBlog",
  deleteBlog: "/admin/deleteBlog",
};
