const utils = {
  // 将utc日期（2017-06-19T15:44:53.396Z）格式化为年月日格式（2017-06-19）
  // @time utc日期
  formatToYMD (time = new Date()) {
    time = new Date(time);
    let year = time.getFullYear();
    let month = time.getMonth();
    let date = time.getDate();

    month = month.toString().length === 1 ? `0${month}` : month;
    date = date.toString().length === 1 ? `0${date}` : date;

    return `${year}-${month}-${date}`;
  },
  // 将utc日期（2017-06-19T15:44:53.396Z）格式化为时分秒格式（23:44:53）
  // @time utc日期
  formatToHMS (time = new Date()) {
    time = new Date(time);
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();

    hour = hour.toString().length === 1 ? `0${hour}` : hour;
    minute = minute.toString().length === 1 ? `0${minute}` : minute;
    second = second.toString().length === 1 ? `0${second}` : second;

    return `${hour}:${minute}:${second}`;
  },
  // 将utc日期（2017-06-19T15:44:53.396Z）格式化为年月日 + 时分秒格式（2017-06-19 23:44:53）
  // @time utc日期
  formatDate (time) {
    return `${this.formatToYMD(time)} ${this.formatToHMS(time)}`;
  }
};

export default utils;
