
// Helper with getting CEO first & last name
export const getFirstAndLastWords = (text) => {
    if (text != null) {
        text.toString()
        var text_arr = text.split(" ");
        return text_arr[0] + " " + text_arr[text_arr.length-1];
    }
}

export const formatNumber = (num) => {
    if (num != null) {
        return num.toLocaleString();
    }
}

export const formatDate = (date) => {
    return date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}

export const getNWords = (str, n) => {
    if (str != null) {
        if (str.length <= n) {
            return str;
        } else {
            return str.split(/\s+/).slice(0,n).join(" ") + "...";
        }
    }
}

export const addMonths = (date, months) => {
    date.setMonth(date.getMonth() + months);
    return date;
  }

export const findSum = (data) => {
    var result = 0;

    if (!data) {
        return 0;
    }
    else {
        for (var i = 0; i < data.length; i++) {
            result += data[i];
        }
        return result;
    }
}

// converts 1230 -> 1.23K, etc...
export const formatLargeToShortForm = (labelValue) => {
    // Billions
    return Math.abs(Number(labelValue)) >= 1.0e+12

    ? parseFloat(Math.abs(Number(labelValue)) / 1.0e+12).toFixed(2) + "T"

    // Billions
    : Math.abs(Number(labelValue)) >= 1.0e+9

    ? parseFloat(Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"

    // Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? parseFloat(Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    // Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? parseFloat(Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

    : Math.abs(Number(labelValue));
}

const quarters = ['Q1', 'Q2', 'Q3', 'Q4']

export const dateToQuarter = (date) => {
  	var month = date.slice(5, 7)
    return quarters[(Math.ceil(month / 3))-1] + ' ' + date.slice(0, 4);
}

export function extractValueFromKey(arr, key) {
    for (var i=0; i<arr.length; i++) {
        if (arr[i]['dataCode'] === key) {
            return arr[i]['value'];
        }
    }
    return "Null"
}