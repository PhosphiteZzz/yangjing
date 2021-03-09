import { data } from "jquery";
import axios from "./http";

//登录接口
export function loginRequest(data) {
  return axios({
    url: "/api/member/login",
    method: "POST",
    data: data
  });
}

//获取验证码
export function getCode(data) {
  return axios({
    url: "/api/member/getCode",
    method: "POST",
    data: data
  });
}

//检测账号是否存在
export function getCodeExist(data) {
  return axios({
    url: "/api/member/check/exist",
    method: "POST",
    data
  });
}

//注册
export function registRequest(data) {
  return axios({
    url: "/api/member/register",
    method: "POST",
    data: data
  });
}

//提交资质审核
export function examineRequest(data) {
  return axios({
    url: "/api/member/submitInfo",
    method: "POST",
    data: data
  });
}

//获取行业下拉
export function getIndustryList() {
  return axios({
    url: "/api/web/industry/selectList",
    method: "GET"
  });
}

//修改密码
export function editPassword(data) {
  return axios({
    url: "/api/member/resetPwd",
    method: "POST",
    data: data
  });
}

//获取行业类型
export function getIndustry() {
  return axios({
    url: "/api/views/member/industry",
    method: "GET"
  });
}

//检验是否登录
export function checkLogin() {
  return axios({
    url: "/api/views/check/login",
    method: "GET"
  });
}
