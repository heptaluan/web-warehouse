$(document).ready(function () {
    var str = '',
        data = [

            { url: '', title: '1' },
            { url: '', title: '2' },
            { url: '', title: '3' },
            { url: '', title: '4' },
            { url: '', title: '5' },
            { url: '', title: '6' },
            { url: '', title: '7' },
            { url: '', title: '8' },
            { url: '', title: '9' },
            { url: '', title: '10' }
        ];

    for (var i = 0; i < data.length; i++) {
        var items = data[i];
        var a = items.title;
        var atitle = a.substring(0, 2);
        str += '<span class="content"><a href="' + items.url + '" target="_blank" title="' + a + '">' + atitle + '</a></span>';

    }

    document.getElementById('ol').innerHTML = str;

    var oL = document.getElementById('ol');
    var oSpan = oL.getElementsByTagName('span');
    for (var i = 0; i < oSpan.length; i++) {
        oSpan[i].onmouseover = function () {
            this.style.backgroundColor = '#' + changeColor();
            this.style.webkitBoxShadow = '#ccc 1px 2px 3px';
            this.style.cursor = 'pointer';

        }
        oSpan[i].onmouseout = function () {
            this.style.backgroundColor = '#' + changeColor();
        }
    }

    //随机颜色选取；
    function changeColor() {
        var r = parseInt(Math.random() * 255);
        var g = parseInt(Math.random() * 255);
        var b = parseInt(Math.random() * 255);
        return colorHex = r.toString(16) + g.toString(16) + b.toString(16);
    }

});






