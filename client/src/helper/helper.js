
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