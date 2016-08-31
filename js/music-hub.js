/**
 * 配置文件
 */

ICEPLAYERCONFIG = {
    playlistId: 112212728,
    autoPlay: true,
    defaultShow: true,
}

/**
 * 一些工具函数的封装
 */

var utils = {
    toggleClass : function(el, className) {
        if (el.classList) {
            el.classList.toggle(className);
        } else {
            var classes = el.className.split(' ');
            var existingIndex = classes.indexOf(className);

            if (existingIndex >= 0) classes.splice(existingIndex, 1);
            else classes.push(className);

            el.className = classes.join(' ');
        }
    },

    addClass : function(el, className) {
        if (el.classList) el.classList.add(className);
        else el.className += ' ' + className;
    },

    removeClass : function(el, className) {
        if (el.classList) el.classList.remove(className);
        else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    },

    getAbsLeft : function(el) {
        var left = el.offsetLeft;
        while (el.offsetParent) {
            el = el.offsetParent;
            left += el.offsetLeft;
        }
        return left;
    },

    parseSec : function(sec) {
        var tempMin = sec / 60 | 0;
        var tempSec = sec % 60 | 0;
        var curMin = tempMin < 10 ? '0' + tempMin : tempMin;
        var curSec = tempSec < 10 ? '0' + tempSec : tempSec;
        return curMin + ':' + curSec;
    }

}

/**
 * 避免全局变量污染
 */

var IcePlayer = {};

/**
 * 主函数
 */

IcePlayer.init = function() {
    // 获取所需节点
    var music_hub = document.querySelector('#music_hub');
    var btnShow = document.querySelector('#music_hub .show');
    var btnHide = document.querySelector('#music_hub .iceplayer .hide');

    // 检查必须项
    if (!ICEPLAYERCONFIG.playlistId) {
        console.error('必须指定歌单哦~');
        return;
    }

    // 判断播放器默认显示还是隐藏
    if (ICEPLAYERCONFIG.defaultShow) {
        utils.addClass(music_hub, "hub_show")
    }

    // 绑定各种事件
    function eventInit() {
        btnShow.addEventListener('ended', handleAudioEnd);
        audio.addEventListener('canplaythrough', handleCanPlayThrough);
        audio.addEventListener('durationchange', handleDurationChange);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        playBtn.addEventListener('click', handlePlayClick);
        timeLine.addEventListener('click', handleTimeLineClick);
    }

    console.log(utils.addClass);
}

IcePlayer.init();

