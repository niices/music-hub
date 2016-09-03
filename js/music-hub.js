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

    ajax: function(options) {
        var options = options || {};
        var xhr = new XMLHttpRequest();
        xhr.open('GET', options.url);
        xhr.send(null);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        };
    }
}

/**
 * 主函数
 */

IcePlayer.init = function(options) {
    // 初始状态数据
    var defaultState = {};
    defaultState.index = 0;
    defaultState.playMod = 0;
    // 判断音乐是否自动播放
    if (options.autoPlay) {
        defaultState.autoPlay = "autoplay";
        defaultState.playerShowImgSrc = "images/pause.png";
        defaultState.ctrlPlayImgSrc = "images/pause.png";
        defaultState.ctrlPlayImgTitle = "暂停";
    } else {
        defaultState.autoPlay = "";
        defaultState.playerShowImgSrc = "images/play.png";
        defaultState.ctrlPlayImgSrc = "images/play.png";
        defaultState.ctrlPlayImgTitle = "播放";
    }

    // 初始化播放器
    var target = document.querySelector('#music_hub_content');
    HTMLcontent = '<div id="music_hub">';
    HTMLcontent += '    <audio src="' + options.playList[0].src + '" preload="auto"' + defaultState.autoPlay + '></audio>';
    HTMLcontent += '        <div class="iceplayer">';
    HTMLcontent += '        <div class="info">';
    HTMLcontent += '            <div class="cover"><img src="' + options.playList[0].cover + '" title="cd-cover"></div>';
    HTMLcontent += '            <div class="meta">';
    HTMLcontent += '                <div class="meta_title">' + options.playList[0].title + '</div>';
    HTMLcontent += '                <div class="meta_author">' + options.playList[0].author + '</div>';
    HTMLcontent += '            </div>';
    HTMLcontent += '        </div>';
    HTMLcontent += '        <div class="ctrl_play"><img src="' + defaultState.ctrlPlayImgSrc + '" title="' + defaultState.ctrlPlayImgTitle + '" class="ctrl_play_img"></div>';
    HTMLcontent += '        <div class="ctrl">';
    HTMLcontent += '            <div class="ctrl_list" title="歌单"><img src="images/list.png"></div>';
    HTMLcontent += '            <div class="ctrl_lrc" title="歌词"><img src="images/lrc.png"></div>';
    HTMLcontent += '            <div class="ctrl_mod" title="顺序播放"><img src="images/order.png"></div>';
    HTMLcontent += '            <div class="ctrl_vol">';
    HTMLcontent += '                <img src="images/vol-on.png" title="静音" id="vol_toggle_btn">';
    HTMLcontent += '                <div class="vol_progress_inner"><div class="vol_progress_bar"><img src="images/dot.png" id="vol_progress_dot"></div></div>';
    HTMLcontent += '            </div>';
    HTMLcontent += '            <div class="ctrl_next" title="下一首"><img src="images/next.png"></div>';
    HTMLcontent += '        </div>';
    HTMLcontent += '        <div class="remaining_sign"><img src="images/clock.png" title="mod"><span class="remaining_sign_text"></span></div>';
    HTMLcontent += '        <div class="loading_sign"><img src="images/loading.png" title="loading"><span class="loading_sign_text">loading</span></div>';
    HTMLcontent += '        <div class="timeline_bg"><div class="timeline"><div class="timeline_passed"></div></div></div>';
    HTMLcontent += '        <div class="hide" id="playerHide"><img src="images/close.png" title="关闭"></div>';
    HTMLcontent += '        </div>';
    HTMLcontent += '    <div class="lrc" style="height: 0px;">';
    HTMLcontent += '    </div>';
    HTMLcontent += '    <div class="list" style="height: 0px;">';
    HTMLcontent += '        <ul class="list_box">';
    for (var item in options.playList) {
        HTMLcontent += '            <li class="list_one">';
        HTMLcontent += '                <div class="cur"></div>';
        HTMLcontent += '                <div class="index">' + (parseInt(item) + 1) + '</div>';
        HTMLcontent += '                <div class="name" title="' + options.playList[item].title + '">' + options.playList[item].title + '</div>';
        HTMLcontent += '                <div class="by">' + options.playList[item].author + '</div>';
        HTMLcontent += '            </li>';
    }
    HTMLcontent += '        </ul>';
    HTMLcontent += '    </div>';
    HTMLcontent += '</div>';
    HTMLcontent += '<div class="show" id="playerShow"><img src="' + defaultState.playerShowImgSrc + '" title="播放器"></div>';

    target.innerHTML = HTMLcontent;

    // 获取所需节点
    var music_hub_content = document.querySelector('#music_hub_content');
    var musicHub = music_hub_content.querySelector('#music_hub');
    var btnShow = music_hub_content.querySelector('#playerShow');
    var showPlayerImg = btnShow.querySelector('img');
    var btnHide = music_hub_content.querySelector('#playerHide');
    var ctrlPlay = music_hub_content.querySelector('.ctrl_play');
    var ctrlPlayImg = music_hub_content.querySelector('.ctrl_play_img');
    var audio = musicHub.querySelector('audio');
    var info = musicHub.querySelector('.info');
    var ctrlVol = music_hub_content.querySelector('.ctrl_vol');
    var volToggleBtnImg = music_hub_content.querySelector('#vol_toggle_btn');
    var volProgressInner = music_hub_content.querySelector('.vol_progress_inner');
    var volProgressBar = music_hub_content.querySelector('.vol_progress_bar');
    var volProgressDot = music_hub_content.querySelector('#vol_progress_dot');
    var remainingSign = musicHub.querySelector('.remaining_sign');
    var loadingSign = musicHub.querySelector('.loading_sign');
    var remainingSignText = remainingSign.querySelector('.remaining_sign_text');
    var timelineBg = music_hub_content.querySelector('.timeline_bg');
    var timelinePassed = music_hub_content.querySelector('.timeline_passed');
    var ctrlList = music_hub_content.querySelector('.ctrl_list');
    var list = music_hub_content.querySelector('.list');
    var ctrlLrc = music_hub_content.querySelector('.ctrl_lrc');
    var lrc = music_hub_content.querySelector('.lrc');
    var ctrlNext = music_hub_content.querySelector('.ctrl_next');
    var musicCoverImg = info.querySelector('.cover>img');
    var musicTitle = info.querySelector('.meta_title');
    var musicAuthor = info.querySelector('.meta_author');
    var ctrlMod = musicHub.querySelector('.ctrl_mod');
    var ctrlModImg = ctrlMod.querySelector('img');
    var list = musicHub.querySelector('.list');
    var listOne = list.querySelectorAll('.list_one');


    // 设置初始音量为60%
    audio.volume = 0.6;
    var duration;

    // 判断播放器默认显示还是隐藏
    if (options.defaultShow) {
        setTimeout(showPlayer, 100);
    }

    // 默认播放歌单第一首,此为背景
    IcePlayer.utils.addClass(listOne[0], "current_playing");

    eventInit();

    // 绑定各种事件
    function eventInit() {
        btnShow.addEventListener('click', showPlayer);
        btnHide.addEventListener('click', hidePlayer);
        ctrlPlay.addEventListener('click', playToggle);
        volToggleBtnImg.addEventListener('click', volToggle);
        ctrlVol.addEventListener('click', volProgress);
        timelineBg.addEventListener('click', timeProgress);
        ctrlList.addEventListener('click', listToggle);
        ctrlLrc.addEventListener('click', lrcToggle);
        ctrlMod.addEventListener('click', ctrlPlayMod);
        ctrlNext.addEventListener('click', nextPlay);
        for (var i = 0; i < listOne.length; i++) {
            listOne[i].addEventListener('click', (function(index) {
                return function() {
                    IcePlayer.utils.removeClass(listOne[defaultState.index], "current_playing");
                    defaultState.index = index;
                    switchMusic(index);
                }
            })(i));
        }

        // 播放器事件
        audio.addEventListener('canplaythrough', handleCanPlayThrough);
        audio.addEventListener('timeupdate', handleTimeUpdate);
    }

    audio.onended = function() {
        nextPlay();
    };

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
        if (ctrlPlayImg.title === "播放") {
            audio.play();
            showPlayerImg.src = "../images/pause.png";
            ctrlPlayImg.src = "../images/pause.png";
            ctrlPlayImg.title = "暂停";
        } else {
            audio.pause();
            showPlayerImg.src = "../images/play.png";
            ctrlPlayImg.src = "../images/play.png";
            ctrlPlayImg.title = "播放";
        }
    }

    // 音量开/关
    function volToggle() {
        if (volToggleBtnImg.title === "静音") {
            audio.muted = true;
            volToggleBtnImg.src = "../images/vol-off.png";
            volToggleBtnImg.title = "取消静音";
            IcePlayer.utils.addClass(volProgressDot, "ctrl_vol_off");
            IcePlayer.utils.addClass(volProgressBar, "vol_progress_bar_off");
        } else {
            audio.muted = false;
            volToggleBtnImg.src = "../images/vol-on.png";
            volToggleBtnImg.title = "静音";
            IcePlayer.utils.removeClass(volProgressDot, "ctrl_vol_off");
            IcePlayer.utils.removeClass(volProgressBar, "vol_progress_bar_off");
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

    // 歌单显示/隐藏
    function listToggle() {
        if (list.style.height == "0px" && lrc.style.height == "0px") {
            list.style.height = "210px";
            musicHub.style.height = "302px";
            ctrlList.style.opacity = "1";
        } else if (list.style.height == "0px" && lrc.style.height == "80px") {
            lrc.style.height = "0px";
            ctrlLrc.style.opacity = "0.7";
            list.style.height = "210px";
            musicHub.style.height = "302px";
            ctrlList.style.opacity = "1";
        } else {
            list.style.height = "0px";
            musicHub.style.height = "92px";
            ctrlList.style.opacity = "0.7";
        }
    }

    // 歌词显示/隐藏
    function lrcToggle() {
        if (lrc.style.height == "0px" && list.style.height == "0px") {
            lrc.style.height = "80px";
            musicHub.style.height = "172px";
            ctrlLrc.style.opacity = "1";
        } else if (lrc.style.height == "0px" && list.style.height == "210px") {
            list.style.height = "0px";
            ctrlList.style.opacity = "0.7";
            lrc.style.height = "80px";
            musicHub.style.height = "172px";
            ctrlLrc.style.opacity = "1";
        } else {
            lrc.style.height = "0px";
            musicHub.style.height = "92px";
            ctrlList.style.opacity = "0.7";
        }
    }

    // 下一首
    function nextPlay() {
        if (defaultState.playMod == 0) {
            orderPlay();
        } else if (defaultState.playMod == 1) {
            repeatPlay();
        } else {
            shufflePlay();
        }
    }

    // 切歌
    function switchMusic(index) {
        audio.src = options.playList[index].src;
        musicCoverImg.src = options.playList[index].cover;
        musicTitle.innerHTML = options.playList[index].title;
        musicAuthor.innerHTML = options.playList[index].author;
        IcePlayer.utils.addClass(listOne[index], "current_playing");
        remainingSign.style.opacity = "0";
        loadingSign.style.opacity = "1";
    }

    // 顺序播放
    function orderPlay() {
        IcePlayer.utils.removeClass(listOne[defaultState.index], "current_playing");
        ++defaultState.index;
        if (defaultState.index >= options.playList.length) {
            defaultState.index = 0;
        }
        switchMusic(defaultState.index);
    }

    // 单曲循环
    function repeatPlay() {
        switchMusic(defaultState.index);
    }

    // 随机播放
    function shufflePlay() {
        IcePlayer.utils.removeClass(listOne[defaultState.index], "current_playing");
        defaultState.index = Math.floor(Math.random() * options.playList.length);
        switchMusic(defaultState.index);
    }

    // 播放模式
    function ctrlPlayMod() {
        if (defaultState.playMod == 0) {
            defaultState.playMod = 1;
            ctrlMod.title = "单曲循环";
            ctrlModImg.src = "../images/repeat.png";
        } else if (defaultState.playMod == 1) {
            defaultState.playMod = 2;
            ctrlMod.title = "随机播放";
            ctrlModImg.src = "../images/shuffle.png";
        } else {
            defaultState.playMod = 0;
            ctrlMod.title = "顺序播放";
            ctrlModImg.src = "../images/order.png";
        }
    }
}
