window.addEventListener('load', () => {
    document.getElementById('upFile').addEventListener('change', async evt => {
        let fileList = evt.target.files
        for (let i = 0; i < fileList.length; i++) {
            getFileContent(fileList[i]).then(res => {
                let jsonStr = jsonLinesParse(res)
                download(fileList[i].name, jsonStr, "text/plain;charset=utf-8");
            })
        }
    })
})

function getFileContent(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        //todo 读取操作被中断
        reader.onabort = evt => {
            console.log('读取中断', evt);
        }
        //todo 读取操作完成
        reader.onload = evt => {
            resolve(evt.target.result)
        };
        //todo 读取操作发生错误
        reader.onerror = evt => {
            console.log('读取错误', evt);
            reject('读取错误')
        }
        //todo 读取操作开始
        reader.onloadstart = evt => {
            console.log('开始读取', evt);
        }
        //todo 读取操作结束
        reader.onloadend = evt => {
            console.log('读取结束', evt);
        }
        //todo 正在读取
        reader.onprogress = evt => {
            console.log('正在读取', evt);
        }
        reader.readAsText(file);
    })
}

function jsonLinesParse(jsonLines) {
    let jsonLinesList = jsonLines.trim().split('\n')
    return '[' + jsonLinesList.join(',') + ']'
}

/**
 * 创建并下载文件
 * @param  {String} fileName 文件名
 * @param  {String} content  文件内容
 * @param  {String} contentType  文件类型
 */
function download(filename, content, contentType) {
    if (!contentType) contentType = 'application/octet-stream';
    var aTag = document.createElement('a');
    var blob = new Blob([content], {
        'type': contentType
    });
    aTag.href = window.URL.createObjectURL(blob);
    aTag.download = filename;
    aTag.click();
    window.URL.createObjectURL(blob);
}