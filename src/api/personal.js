import axios from "./http";

//获取供应商修改的信息
export function getEditInfo(data) {
  return axios({
    url: `/api/member/modify`,
    method: "POST",
    data
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
export function returnHome() {
  return axios({
    url: "/api/member/reSubmitModify",
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

//递交标书
export function postTenderFile(data, onUploadProgress) {
  return axios({
    url: "/api/web/member/tenderfile/submit",
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress
  });
}


//邀请招标
export function invitationBidding(params) {
  return axios({
    url: "/api/web/invite/inviteList",
    method: "GET",
    params
  })
}

//招标报价
export function invitationSubmit(data) {
  return axios({
    url: "/api/web/notice/quote/submit",
    method: "POST",
    data
  })
}

//邀请招标详情
export function invitationDetail(params) {
  return axios({
    url: "/api/web/invite/inviteInfo",
    method: "GET",
    params
  })
}

//报价
export function quoteRequest(data) {
  return axios({
    url: "/api/web/member/tenderfile/submitQuote",
    method: "POST",
    data
  })
}
