/**
 * 避免全局变量污染
 */

var IcePlayer = {};

/**
 * 一些工具函数的封装
 */

IcePlayer.utils = {
    toggleClass: function(el, className) {
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

    addClass: function(el, className) {
        if (el.classList) el.classList.add(className);
        else el.className += ' ' + className;
    },

    removeClass: function(el, className) {
        if (el.classList) el.classList.remove(className);
        else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    },

    getAbsLeft: function(el) {
        var left = el.offsetLeft;
        while (el.offsetParent) {
            el = el.offsetParent;
            left += el.offsetLeft;
        }
        return left;
    },

    parseSec: function(sec) {
        var tempMin = sec / 60 | 0;
        var tempSec = sec % 60 | 0;
        var curMin = tempMin < 10 ? '0' + tempMin : tempMin;
        var curSec = tempSec < 10 ? '0' + tempSec : tempSec;
        return curMin + ':' + curSec;
    },
}

/**
 * 主函数
 */

IcePlayer.init = function(options) {
    // 检查必须项
    // if (!playlistId) {
    //     console.error('必须指定歌单哦~');
    //     return;
    // }

    var defaultState = {};
    defaultState.ctrlModImgSrc = "images/switch.png";
    defaultState.volToggleBtnImgSrc = "images/vol-on.png";
    defaultState.volToggleBtnImgAlt = "vol-on";
    // 判断音乐是否自动播放
    if (options.autoPlay) {
        defaultState.autoPlay = "autoplay";
        defaultState.playerShowImgSrc = "images/pause.png";
        defaultState.ctrlPlayImgSrc = "images/pause.png";
        defaultState.ctrlPlayImgAlt = "pause";
    } else {
        defaultState.autoPlay = "";
        defaultState.playerShowImgSrc = "images/play.png";
        defaultState.ctrlPlayImgSrc = "images/play.png";
        defaultState.ctrlPlayImgAlt = "play";
    }

    // 初始化播放器
    var target = document.querySelector('#music_hub_content');
    HTMLcontent = '<div id="music_hub">';
    HTMLcontent += '    <audio src="' + options.src + '" preload="auto"' + defaultState.autoPlay + '></audio>';
    HTMLcontent += '        <div class="iceplayer">';
    HTMLcontent += '        <div class="info">';
    HTMLcontent += '            <div class="cover"><img src="' + options.cover + '" alt="cd-cover"></div>';
    HTMLcontent += '            <div class="meta">';
    HTMLcontent += '                <div class="meta_title">' + options.title + '</div>';
    HTMLcontent += '                <div class="meta_author">' + options.author + '</div>';
    HTMLcontent += '            </div>';
    HTMLcontent += '        </div>';
    HTMLcontent += '        <div class="ctrl_play"><img src="' + defaultState.ctrlPlayImgSrc + '" alt="' + defaultState.ctrlPlayImgAlt + '" class="ctrl_play_img"></div>';
    HTMLcontent += '        <div class="ctrl">';
    HTMLcontent += '            <div class="ctrl_list"><img src="images/list.png" alt="list"></div>';
    HTMLcontent += '            <div class="ctrl_lrc"><img src="images/lrc.png" alt="lrc"></div>';
    HTMLcontent += '            <div class="ctrl_mod"><img src="' + defaultState.ctrlModImgSrc + '" alt="mod"></div>';
    HTMLcontent += '            <div class="ctrl_vol">';
    HTMLcontent += '                <img src="' + defaultState.volToggleBtnImgSrc + '" alt="' + defaultState.volToggleBtnImgAlt + '" id="vol_toggle_btn">';
    HTMLcontent += '                <div class="vol_progress_inner"><div class="vol_progress_bar"><img src="images/dot.png" alt="dot" id="vol_progress_dot"></div></div>';
    HTMLcontent += '            </div>';
    HTMLcontent += '            <div class="ctrl_next"><img src="images/next.png" alt="next"></div>';
    HTMLcontent += '        </div>';
    HTMLcontent += '        <div class="remaining_sign"><img src="images/clock.png" alt="mod"><span class="remaining_sign_text"></span></div>';
    HTMLcontent += '        <div class="loading_sign"><img src="images/loading.png" alt="loading"><span class="loading_sign_text">loading</span></div>';
    HTMLcontent += '        <div class="timeline_bg"><div class="timeline"><div class="timeline_passed"></div></div></div>';
    HTMLcontent += '        <div class="hide" id="playerHide"><img src="images/close.png" alt="hide"></div>';
    HTMLcontent += '        </div>';
    HTMLcontent += '    <div class="lrc"></div>';
    HTMLcontent += '    <div class="list"></div>';
    HTMLcontent += '</div>';
    HTMLcontent += '<div class="show" id="playerShow"><img src="' + defaultState.playerShowImgSrc + '" alt="show"></div>';

    target.innerHTML = HTMLcontent;

    // 获取所需节点
    var musicHub = document.querySelector('#music_hub');
    var btnShow = document.querySelector('#playerShow');
    var showPlayerImg = btnShow.querySelector('img');
    var btnHide = document.querySelector('#playerHide');
    var ctrlPlay = document.querySelector('.ctrl_play');
    var ctrlPlayImg = document.querySelector('.ctrl_play_img');
    var audio = musicHub.querySelector('audio');
    var volToggleBtnImg = document.querySelector('#vol_toggle_btn');
    var ctrlVol = document.querySelector('.ctrl_vol');
    var volProgressInner = document.querySelector('.vol_progress_inner');
    var volProgressBar = document.querySelector('.vol_progress_bar');
    var volProgressDot = document.querySelector('#vol_progress_dot');
    var remainingSign = musicHub.querySelector('.remaining_sign');
    var loadingSign = musicHub.querySelector('.loading_sign');
    var remainingSignText = remainingSign.querySelector('.remaining_sign_text');
    var timelineBg = document.querySelector('.timeline_bg');
    var timelinePassed = document.querySelector('.timeline_passed');

    // 设置初始音量为60%
    audio.volume = 0.6;
    var duration;

    // 判断播放器默认显示还是隐藏
    if (options.defaultShow) {
        setTimeout(showPlayer, 100);
    }

    eventInit();

    // 绑定各种事件
    function eventInit() {
        btnShow.addEventListener('click', showPlayer);
        btnHide.addEventListener('click', hidePlayer);
        ctrlPlay.addEventListener('click', playToggle);
        volToggleBtnImg.addEventListener('click', volToggle);
        ctrlVol.addEventListener('click', volProgress);
        timelineBg.addEventListener('click', timeProgress);

        // 播放器事件
        audio.addEventListener('canplaythrough', handleCanPlayThrough);
        audio.addEventListener('timeupdate', handleTimeUpdate);
    }

    // canplaythrough事件处理
    function handleCanPlayThrough() {
        duration = this.duration;
        setTimeout(function() {
            remainingSignText.innerText = IcePlayer.utils.parseSec(duration.toFixed(0));
            remainingSign.style.opacity = "1";
            loadingSign.style.opacity = "0";
        }, 1000);
    }

    // timeupdate事件处理
    function handleTimeUpdate() {
        duration = this.duration;
        var curTime = audio.currentTime;
        var playPercent = 100 * (curTime / duration);
        var remTime = duration - curTime;

        console.log(remTime);

        timelinePassed.style.width = playPercent.toFixed(2) + '%';
        remainingSignText.innerText = IcePlayer.utils.parseSec(remTime);

    }

    // 音量调节
    function timeProgress() {
        var clickPercent = (event.pageX - IcePlayer.utils.getAbsLeft(this)) / this.offsetWidth;
        if (0 <= clickPercent && clickPercent <= 1) {
            timelinePassed.style.width = clickPercent * 100 + '%';
            audio.currentTime = (clickPercent * duration).toFixed(0);
        }
    }

    //显示播放器
    function showPlayer() {
        IcePlayer.utils.addClass(musicHub, "hub_show");
    }

    //隐藏播放器
    function hidePlayer() {
        IcePlayer.utils.removeClass(musicHub, "hub_show");
    }

    // 播放/暂停
    function playToggle() {
        if (ctrlPlayImg.alt === "play") {
            audio.play();
            showPlayerImg.src = "../images/pause.png";
            ctrlPlayImg.src = "../images/pause.png";
            ctrlPlayImg.alt = "pause";
        } else {
            audio.pause();
            showPlayerImg.src = "../images/play.png";
            ctrlPlayImg.src = "../images/play.png";
            ctrlPlayImg.alt = "play";
        }
    }

    // 音量开/关
    function volToggle() {
        if (volToggleBtnImg.alt === "vol-off") {
            audio.muted = false;
            volToggleBtnImg.src = "../images/vol-on.png";
            volToggleBtnImg.alt = "vol-on";
            IcePlayer.utils.removeClass(volProgressDot, "ctrl_vol_off");
        } else {
            audio.muted = true;
            volToggleBtnImg.src = "../images/vol-off.png";
            volToggleBtnImg.alt = "vol-off";
            IcePlayer.utils.addClass(volProgressDot, "ctrl_vol_off");
        }
    }

    // 音量调节
    function volProgress() {
        var clickPercent = (event.pageX - IcePlayer.utils.getAbsLeft(this)) / this.offsetWidth;
        if (0 <= clickPercent && clickPercent <= 1) {
            volProgressBar.style.width = clickPercent * 100 + '%';
            volProgressDot.style.left = 50 * clickPercent - 10 + 'px';
            audio.volume = clickPercent.toFixed(2);
        }
    }

    console.log(options.playList);
}
