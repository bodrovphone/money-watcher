function dateFixer(date) {
    // caclulating delta to fix 00:00:00 issue with DatePicker(re fb issue)
    const t = new Date(),
          ml = t.getMilliseconds(),
          sec = t.getSeconds(),
          min = t.getMinutes(),
          delta = ml + (sec*1000) + (min * 60 * 1000);

      return new Date(date.setTime(date.getTime() + delta));
}

export default dateFixer;