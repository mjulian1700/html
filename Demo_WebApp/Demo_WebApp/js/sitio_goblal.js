document.onload(function () {

})

function getHtmlContent(url) {
    const divContent = document.getElementById('html-dynamic-content')
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.setRequestHeader('Cache-Control',
        'no-cache, no-store, max-age=0')
    xhr.setRequestHeader('Expires', 'Thu, 1 Jan 1970 00:00:00 GMT')
    xhr.setRequestHeader('Pragma', 'no-cache')
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            divContent.innerHTML = this.responseText
        }
    }
}