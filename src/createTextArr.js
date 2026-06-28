export function createTextArr(text, charLimit) {
    let lines = [];
    let result = [];
    if (text) lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
        result.push({
            text: lines[i],
            newLine: true
        });
        let tempText = lines[i];
        let tempArr = [];
        let cmptext = '';
        tempArr.push(tempText);
        while (tempText.length > charLimit && (!tempArr.length || tempArr[0] != cmptext)) {
            cmptext = tempArr[0];
            tempText = tempArr[0].substr(0, tempArr[0].length / 2);
            for (let j = 0; j < tempArr.length; j = j + 2) {
                let splitIndex = tempArr[j].length / 2;
                while (tempArr[j].charAt(splitIndex) != ' ' && splitIndex < tempArr[j].length) {
                    splitIndex++;
                }
                tempArr.splice(j + 1, 0, tempArr[j].substr(splitIndex));
                tempArr.splice(j, 1, tempArr[j].substr(0, splitIndex));
            }
        }
        lines.splice(i, 1, tempArr[0]);
        result.splice(i, 1, {
            text: tempArr[0],
            newLine: tempArr.length == 1 ? true : false
        });
        for (let j = 1; j < tempArr.length; j++) {
            lines.splice(i + j, 0, tempArr[j]);
            result.splice(i + j, 0, {
                text: tempArr[j],
                newLine: j == (tempArr.length - 1) ? true : false
            });
            i++;
        }
    }
    return result;
}
