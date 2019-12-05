export const _normalizeKey = key => {
  const re = /[0-9]./;
  const rs = /\s/g;
  const rc = /[A-Z]/;
  return key
    .replace(re, '')
    .replace(rs, '')
    .replace(rc, x => x.toLowerCase());
};

export const _keys =
  'keys' in Object ? Object.keys : Object.getOwnPropertyNames;

export const normalizeObject = obj => {
  if (!obj) {
    return obj;
  }
  const nobj = {};
  _keys(obj).map(part => {
    const k = _normalizeKey(part);
    nobj[k] = obj[part];
    return part;
  });
  return nobj;
};

export const normalizeData = data => {
  if (!data) {
    return [];
  }
  const ndata = [];
  data.map(part => {
    ndata.push(normalizeObject(part));
    return part;
  });
  return ndata;
};

const _scaleValue = (value, start1, stop1, start2, stop2) =>
  ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;

/**
 * Just to show more steep in graph I'm scaling the values between 0 to 100;
 */
const formatTimeSeries = series => {
  let highMax = -Infinity;
  let lowMin = Infinity;
  series.forEach(part => {
    highMax = Math.max(part.high, highMax);
    lowMin = Math.min(part.low, lowMin);
  });
  return series.map(part => {
    // Let's scale the range between 0 to 100;
    return {
      high: _scaleValue(part.high, lowMin, highMax, 0, 100),
      low: _scaleValue(part.low, lowMin, highMax, 0, 100),
      open: _scaleValue(part.open, lowMin, highMax, 0, 100),
      close: _scaleValue(part.close, lowMin, highMax, 0, 100),
      time: part.time
    };
  });
};

export const normalizeSeriesData = data => {
  if (!data) {
    return [];
  }

  const ndata = [];
  _keys(data).map(part => {
    const tm = normalizeObject(data[part]);
    tm.high = parseFloat(tm.high);
    tm.low = parseFloat(tm.low);
    tm.open = parseFloat(tm.open);
    tm.close = parseFloat(tm.close);
    ndata.push({
      ...tm,
      time: part
    });
    return part;
  });
  return formatTimeSeries(ndata);
};

export const getQueryParams = key => {
  const { search } = window.location;
  let value;
  search
    .substr(1)
    .split('&')
    .forEach(item => {
      if (item.indexOf(key) > -1) {
        value = item.split('=')[1];
      }
    });
  return value;
};
