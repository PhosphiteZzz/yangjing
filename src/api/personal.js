import axios from "./http";

//获取供应商修改的信息
export function getEditInfo() {
  return axios({
    url: `/api/member/modify`,
    method: "GET"
  });
}

//保存修改信息
export function saveModify(data) {
  return axios({
    url: "/api/member/saveModify",
    method: "POST",
    data
  });
}

//我的项目
export function getMyItem(data) {
  return axios({
    url: "/api/order/member/orders",
    method: "POST",
    data
  });
}

//消息列表
export function getMessageList(params) {
  return axios({
    url: "/api/views/member/message/list",
    method: "GET",
    params
  });
}

//消息列表xiangq
export function getMessageDetails(id) {
  return axios({
    url: `/api/views/member/question/${id}`,
    method: "GET"
  });
}

//返回个人信息主页
export function returnHome(id) {
  return axios({
    url: `/api/member/reSubmitModify/${id}`,
    method: "POST"
  });
}

//修改密码
export function getEditPass(data) {
  return axios({
    url: "/api/member/modifyPassWord",
    method: "POST",
    data
  });
}

//提问投诉
export function getQuestionList(data) {
  return axios({
    url: "/api/views/member/question",
    method: "POST",
    data
  });
}

//回复列表
export function getReplyList(params) {
  return axios({
    url: "/api/views/member/questionList",
    method: "GET",
    params
  });
}
