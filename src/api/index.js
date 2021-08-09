import { data } from "jquery";
import axios from "./http";

//采购公告列表
export function getNoticeList(params) {
  return axios({
    url: "/api/views/notice/list",
    method: "GET",
    params: params
  });
}

//主体信息
export function getMainInfo(params) {
  return axios({
    url: "/api/views/main/info/list",
    method: "GET",
    params: params
  });
}

//查询轮播图
export function getBannerList() {
  return axios({
    url: "/api/views/news/banners",
    method: "GET"
  });
}

//查询各类信息
export function getMoreInfo(query, params) {
  return axios({
    url: `/api/views/news/news/${query}`,
    method: "GET",
    params: params
  });
}

//查询澄清答疑
export function getExplanation(params) {
  return axios({
    url: "/api/views/explanation/list",
    method: "GET",
    params: params
  });
}

//获取公示/ gonggao 开标数
export function getTypeNum() {
  return axios({
    url: "/api/views/notice/todayNum",
    method: "GET"
  });
}

export function getProjectNum(query) {
  return axios({
    url: `/api/views/notice/projectNum/${query}`,
    method: "GET"
  });
}

//获取字典类型
export function getDicts(dictType) {
  return axios({
    url: `/api/common/type/${dictType}`,
    method: "GET"
  });
}

//成交结果公示
export function getHitlist(params) {
  return axios({
    url: "/api/views/notice/hit/list",
    method: "GET",
    params: params
  });
}

//查询项目日历某个月有哪几天有日程
export function getDateOfMonth(query) {
  return axios({
    url: `/api/views/project/calendar/${query}`,
    method: "GET"
  });
}

//查询某一天的项目
export function getScheduleByDay(query) {
  return axios({
    url: `/api/views/project/day/${query}`,
    method: "GET"
  });
}

//查询周项目
export function getScheduleByWeek(query) {
  return axios({
    url: "/api/views/project/week/" + query,
    method: "GET"
  });
}

//首页搜索
export function searchIndex(params) {
  return axios({
    url: "/api/views/search/list",
    method: "POST",
    params: params
  });
}

//详情内容
export function getDetails(query) {
  return axios({
    url: `/api/views/news/detail/${query}`,
    method: "GET"
  });
}

//查询交易信息
export function getTradeInfo(params) {
  return axios({
    url: "/api/views/notice/transactionList",
    method: "GET",
    params: params
  });
}

//交易信息详情
export function getTradeDetails(noticeId) {
  return axios({
    url: `/api/views/notice/detail/${noticeId}`,
    method: "GET"
  });
}

//澄清答疑详情
export function getExplanationDetails(params) {
  return axios({
    url: "/api/views/explanation/info",
    method: "GET",
    params
  });
}

//成交结果公示详情
export function getResultDetails(id) {
  return axios({
    url: `/api/views/notice/hit/${id}`,
    method: "GET"
  });
}

//成交结果公示详情 Nid
export function getResultDetailsByNid(id) {
  return axios({
    url: `/api/views/notice/noticeHit/${id}`,
    method: "GET"
  });
}

// 查询公告相关日期
export function getFullTime(id) {
  return axios({
    url: `/api/views/notice/timeList/${id}`,
    method: "GET"
  });
}

//订单下单前条件验证(供应商用)
export function getConditionVali(data) {
  return axios({
    url: "/api/order/verify",
    method: "POST",
    data
  });
}

//获取订单二维码
export function getOrderCode(data) {
  return axios({
    url: "/api/order/toPay",
    method: "POST",
    data
  });
}

//下载招标文件
export function downloadFiles(noticeId) {
  return axios({
    url: `/api/web/notice/download/${noticeId}`,
    method: "GET"
  });
}

//检查websocket是否在线
export function checkSocketStatus(params) {
  return axios({
    url: `/api/views/check/socket/${params.userType}/${params.userId}/${params.randomCode}`,
    method: "GET"
  });
}

//验证邮箱
export function checkEmailCode(data) {
  return axios({
    url: "/api/member/check/email/code",
    method: "POST",
    data
  });
}

//查询交易状态
export function checkAlipayStatus(orderNum) {
  return axios({
    url: `/api/order/check/alipay/${orderNum}`,
    method: "GET"
  });
}
