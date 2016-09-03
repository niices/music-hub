window.onload = function() {
    /**
     * 配置文件
     */
    // 歌曲来源：来自网易云音乐歌单信息请填 true ，来自本地自定义歌曲信息请填 false 。
    IcePlayer.musicSource = true;
    // 自动播放
    IcePlayer.autoPlay = true;
    IcePlayer.defaultShow = true;
    // 网易云歌单ID：登陆网页版网易云音乐，进入歌单详情后，在url中可找到歌单id，例：'http://music.163.com/#/playlist?id=445719932')。
    IcePlayer.netEasePlayListId = 445719932;


    /**
     * 自定义歌曲信息
     */
    IcePlayer.localList = [{
        src: 'http://niices.qiniudn.com/%E5%B0%8F%E5%B9%B8%E8%BF%90.mp3',
        cover: 'http://my-typecho-blog.b0.upaiyun.com/usr/uploads/2016/02/462344463.jpg',
        title: '小幸运',
        author: '田馥甄',
        lrc: '[00:24.600]温柔的晚风\n[00:27.830]轻轻吹过 爱人的梦中\n[00:36.690]温柔的晚风\n[00:39.129]轻轻吹过 故乡的天空\n[00:47.690]温柔的晚风\n[00:50.749]轻轻吹过 城市的灯火\n[00:59.119]今夜的晚风\n[01:02.439]你去哪里 请告诉我\n[01:08.249]\n[01:10.879]温柔的晚风\n[01:14.590]轻轻吹过 爱人的梦中\n[01:22.179]温柔的晚风\n[01:25.549]轻轻吹过 故乡的天空\n[01:33.809]温柔的晚风\n[01:37.539]轻轻地吹过 城市的灯火\n[01:46.509]今夜的晚风\n[01:49.919]你要去哪里 请告诉我\n[01:56.419]\n[02:37.140]温柔的晚风\n[02:40.740]轻轻吹过 爱人的梦中\n[02:49.060]温柔的晚风\n[02:52.370]轻轻吹过 故乡的天空\n[03:00.680]温柔的晚风\n[03:03.860]轻轻吹过 城市的灯火\n[03:12.190]今夜的晚风\n[03:15.440]你要去哪里 请告诉我\n[03:21.370]\n[03:23.620]温柔的晚风\n[03:27.090]轻轻吹过 爱人的梦中\n[03:35.280]温柔的晚风\n[03:39.570]轻轻吹过 故乡的天空\n[03:47.620]温柔的晚风\n[03:50.880]轻轻地吹过 城市的灯火\n[03:59.180]今夜的晚风\n[04:02.680]你要去哪里 请告诉我\n[04:08.800]\n[04:33.830]温柔的晚风\n[04:37.350]请你带走 我昨天的梦\n[04:45.350]今夜的晚风\n[04:48.960]我要去哪里 请告诉我\n[04:59.690]\n'
    }, {
        src: 'http://niices.qiniudn.com/%E5%B0%8F%E5%B9%B8%E8%BF%90.mp3',
        cover: 'http://my-typecho-blog.b0.upaiyun.com/usr/uploads/2016/02/462344463.jpg',
        title: '小幸运',
        author: '田馥甄',
        lrc: '[00:24.600]温柔的晚风\n[00:27.830]轻轻吹过 爱人的梦中\n[00:36.690]温柔的晚风\n[00:39.129]轻轻吹过 故乡的天空\n[00:47.690]温柔的晚风\n[00:50.749]轻轻吹过 城市的灯火\n[00:59.119]今夜的晚风\n[01:02.439]你去哪里 请告诉我\n[01:08.249]\n[01:10.879]温柔的晚风\n[01:14.590]轻轻吹过 爱人的梦中\n[01:22.179]温柔的晚风\n[01:25.549]轻轻吹过 故乡的天空\n[01:33.809]温柔的晚风\n[01:37.539]轻轻地吹过 城市的灯火\n[01:46.509]今夜的晚风\n[01:49.919]你要去哪里 请告诉我\n[01:56.419]\n[02:37.140]温柔的晚风\n[02:40.740]轻轻吹过 爱人的梦中\n[02:49.060]温柔的晚风\n[02:52.370]轻轻吹过 故乡的天空\n[03:00.680]温柔的晚风\n[03:03.860]轻轻吹过 城市的灯火\n[03:12.190]今夜的晚风\n[03:15.440]你要去哪里 请告诉我\n[03:21.370]\n[03:23.620]温柔的晚风\n[03:27.090]轻轻吹过 爱人的梦中\n[03:35.280]温柔的晚风\n[03:39.570]轻轻吹过 故乡的天空\n[03:47.620]温柔的晚风\n[03:50.880]轻轻地吹过 城市的灯火\n[03:59.180]今夜的晚风\n[04:02.680]你要去哪里 请告诉我\n[04:08.800]\n[04:33.830]温柔的晚风\n[04:37.350]请你带走 我昨天的梦\n[04:45.350]今夜的晚风\n[04:48.960]我要去哪里 请告诉我\n[04:59.690]\n'
    }, ];


    /**
     * 初始化播放器
     */
    if (!IcePlayer.musicSource) {
        IcePlayer.init({
            playList: IcePlayer.localList,
            autoPlay: IcePlayer.autoPlay,
            defaultShow: IcePlayer.defaultShow,
        })
    }

    /**
     * 请求并解析网易云音乐歌单信息
     */
    if (IcePlayer.musicSource) {
        IcePlayer.netEaseList = [];
        IcePlayer.netEaseHandle = function() {
            var data;
            IcePlayer.utils.ajax({
                url: "http://www.niices.com/api/netEaseMusic/?playlist_id=" + IcePlayer.netEasePlayListId,
                success: function(responseText) {
                    data = JSON.parse(responseText);
                    for (var i = 0; i < data.result.trackCount; i++) {
                        var musicInfo = {};
                        var datum = data.result.tracks[i];
                        var datumArtistLen = datum.artists.length;
                        // 基本信息
                        musicInfo.id = datum.id;
                        musicInfo.src = datum.mp3Url;
                        musicInfo.cover = datum.album.blurPicUrl;
                        musicInfo.title = datum.name;
                        musicInfo.author = datum.artists[0].name;
                        for (var j = 1; j < datumArtistLen; j++) {
                            musicInfo.author += ("/" + datum.artists[j].name);
                        };
                        IcePlayer.netEaseList.push(musicInfo);
                    }
                    IcePlayer.init({
                        playList: IcePlayer.netEaseList,
                        autoPlay: IcePlayer.autoPlay,
                        defaultShow: IcePlayer.defaultShow,
                    })
                },
                fail: function() {
                    console.error("拉取歌单失败")
                }
            })
        }
        IcePlayer.netEaseHandle()
    }
}
