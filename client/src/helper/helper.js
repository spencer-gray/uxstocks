
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

export const getNWords = (str, n) => {
    if (str != null) {
        if (str.length <= n) {
            return str;
        } else {
            return str.split(/\s+/).slice(0,n).join(" ") + "...";
        }
    }
}