window.onload = function() {
    // 网易云歌单ID
    // 登陆网页版网易云音乐，进入歌单详情后，在url中可找到歌单id，例：'http://music.163.com/#/playlist?id=112212728')
    IcePlayer.netEasePlayListId = 112212728;

    // 请求并解析网易云音乐歌单信息
    IcePlayer.netEase = function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://music.163.com/api/playlist/detail?id=" + IcePlayer.netEasePlayListId);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById("content").innerHTML = xhr.responseText;
            }
        };
    }

    IcePlayer.netEase()







    // 手动配置歌曲信息
    IcePlayer.localList = [{
        src: 'http://niices.qiniudn.com/%E5%B0%8F%E5%B9%B8%E8%BF%90.mp3',
        title: '小幸运',
        author: '田馥甄',
        cover: 'http://my-typecho-blog.b0.upaiyun.com/usr/uploads/2016/02/462344463.jpg',
    }, {
        src: 'http://niices.qiniudn.com/%E5%B0%8F%E5%B9%B8%E8%BF%90.mp3',
        title: '小幸运',
        author: '田馥甄',
        cover: 'http://my-typecho-blog.b0.upaiyun.com/usr/uploads/2016/02/462344463.jpg',
    }, ];
    // IcePlayer.config = {
    //     playlistId: 112212728,
    //     autoPlay: true,
    //     defaultShow: true,
    // };
    IcePlayer.config = {
        playList: IcePlayer.localList,
        autoPlay: true,
        defaultShow: true,
    }



    // 配置文件
    //
    IcePlayer.config = {
        playList: IcePlayer.localList,
        autoPlay: true,
        defaultShow: true,
    }
    IcePlayer.init(IcePlayer.config);
}
