/**
 * 加0
 * @param {*} m
 */
function addZero(m) {
  let num = Number(m) < 10 ? "0" + m : m;
  return num;
}
export default {
  // 回显数据字典
  selectDictLabel(datas, value) {
    var actions = [];
    Object.keys(datas).some(key => {
      if (datas[key].dictValue == "" + value) {
        actions.push(datas[key].dictLabel);
        return true;
      }
    });
    return actions.join("");
  },
  formatDate() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    var h = date.getHours();
    h = h < 10 ? "0" + h : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return y + "-" + m;
  },
  formatDateAll(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    var h = date.getHours();
    h = h < 10 ? "0" + h : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return y + "-" + m + "-" + d;
  },
  /** 2021-01-28 09:29:33 */
  formatComplete(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    var h = date.getHours();
    h = h < 10 ? "0" + h : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    // return y + "-" + m + "-" + d ;
    return `${y}-${m}-${d} ${h}:${minute}:${second}`;
  },
  formatDateStr(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    var h = date.getHours();
    h = h < 10 ? "0" + h : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return y + "年" + m + "月" + d + "日";
  },
  /**
   * 时间戳转换str
   * @param {*} timestamp
   */
  timestampToTime(timestamp, bool = false) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    var h =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var m =
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":";
    var s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var str = bool ? h + m + s : Y + M + D + h + m + s;
    return str;
  },
  /**
   * 时间戳转换日期  时分秒
   * @param {*} timestamp
   */
  timestampToSwitch(timestamp, bool = false) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    var h =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var m =
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":";
    var s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var str = bool ? Y + M + D : h + m + s;
    return str;
  },
  /**
   * 相差的时间戳
   * @param {*} startTime endTime
   */
  intervalTime(startTime, endTime) {
    // var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数
    var date3 = endTime - startTime; //时间差的毫秒数
    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    //计算出小时数

    var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));

    //计算相差秒数

    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    if (minutes === 60) {
      minutes = 0;
      hours += 1;
    }
    if (seconds === 60) {
      // debugger;
      seconds = 0;
      minutes += 1;
    }
    return addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
  },
  timeTransFor(time) {
    return time.split(" ")[0];
  },
  downloadFiles(fileName) {
    window.location.href =
      "/api/common/download?delete=true&fileName=" + encodeURI(fileName);
  }
};
