window.onload = function() {
    /**
     * 配置文件
     */
    // 歌曲来源：来自网易云音乐歌单信息请填 true ，来自本地自定义歌曲信息请填 false 。
    IcePlayer.musicSource = false;
    // 自动播放
    IcePlayer.autoPlay = true;
    IcePlayer.defaultShow = true;
    // 网易云歌单ID：登陆网页版网易云音乐，进入歌单详情后，在url中可找到歌单id，例：'http://music.163.com/#/playlist?id=445719932')。
    IcePlayer.netEasePlayListId = 445719932;


    /**
     * 自定义歌曲信息
     */
    IcePlayer.localList = [{
        src: "http://niices.qiniudn.com/Tomorrow.mp3",
        cover: "http://niices.qiniudn.com/4z9_R3ULj-Yz8lcgJ0JEQg%253D%253D%252F6627856092328736.jpg",
        title: "Tomorrow",
        author: "Tablo/太阳",
        lrc: "[00:00.00] 作曲 : Tablo\n[00:01.03] 作词 : Tablo\n[00:04.010]No' no' no' no more tomorrow.\n[00:08.360]No' no' no' no more tomorrow.\n[00:17.100]사랑은 받는다고 갖는 게\n[00:18.970]시간은 걷는다고 가는 게\n[00:21.230]사람은 숨 쉰다고 사는 게\n[00:23.470]아닌데.\n[00:24.780]Baby there's no' no tomorrow.\n[00:28.550]그때 그대로 난 멈춰있고.\n[00:32.850]마지막 그 순간에 머문 시간.\n[00:37.410]너에겐 그저 지난날이지만.\n[00:41.390]Baby there's no' no' no' no more tomorrow.\n[00:50.300]Baby there's no' no' no' no more tomorrow.\n[00:58.800]찢던 가슴을 그 기억이 달력을 찢고 한해처럼 저물어가.\n[01:02.540]너를 잊고 사는 척 하기도 해. 아직도 내 세상은 변함없어.\n[01:06.790]너만 없어. 사람들은 다' 돌아보면 웃게 되는 거래.\n[01:10.350]너를 향했던 고개를 틀기도 힘든 내게.\n[01:12.530]듣기도 싫은데 왜 떠들까? 난 여기서 머문다.\n[01:16.160]하지마라' 내일은 해가 뜬다는 말.\n[01:18.400]너와의 밤보다 캄캄한 아침일 테니.\n[01:20.700]비온 뒤에 땅이 굳는다는 말.\n[01:22.570]너와의 근심보다 답답한 안심일 테니.\n[01:24.890]다 엉망이잖아.\n[01:26.330]너에게는 다시 봄이지만 내 계절은 변하지 않아.\n[01:29.390]내 마음이 또 싹튼다 해도 I've got no tomorrow.\n[01:32.800]Baby there's no' no tomorrow.\n[01:36.490]그때 그대로 난 멈춰있고.\n[01:40.780]마지막 그 순간에 머문 시간.\n[01:45.030]너에겐 그저 지난날이지만.\n[01:49.340]Baby there's no' no' no' no more tomorrow.\n[01:58.180]Baby there's no' no' no' no more tomorrow.\n[02:07.100]텅 속은 빈 죽은 미소인데\n[02:09.310]너를 만날 때보다 좋아 보인대.\n[02:11.440]이젠 한숨이 놓인대. 난 숨이 조이네.\n[02:14.060]미소가 나만 못 속이네.\n[02:16.770]평범해지긴 했어. 마음이 짐이 돼서 많이 비워냈어.\n[02:20.020]정말 미치겠어.\n[02:21.090]내겐 들리지 않는 위로들 제발 그만해.\n[02:23.810]사랑은 다른 사랑으로 잊는다는 말.\n[02:26.300]나에겐 이별보다 쓸쓸한 만남일 테니.\n[02:28.620]시간이 다 해결해준다는 말.\n[02:30.570]나에겐 매순간이 죽은듯한 삶일 테니.\n[02:33.070]그래' 사랑이란 건 받는다고 갖는 게...\n[02:35.370]시간이란 건 걷는다고 가는 게...\n[02:37.440]사람은 숨을 쉰다고 사는 게 아닌 걸 이젠 아는데.\n[02:42.250]No' no more tomorrow.\n[02:50.530]No' no more tomorrow.\n[02:56.080]네가 돌아올 때까진.\n[02:59.250]No' no' no more tomorrow.\n[03:04.550]내게 돌아올 때까진.\n[03:07.810]No' no' no more tomorrow.\n[03:14.370]Baby there's no' no tomorrow.\n[03:18.420]그때 그대로 난 멈춰있고.\n[03:22.590]마지막 그 순간에 머문 시간.\n[03:26.960]너에겐 그저 지난날이지만.\n[03:31.330]Baby there's no' no' no' no more tomorrow.\n[03:37.820]Till you come back' everyday is yesterday.\n[03:40.440]Baby there's no' no' no' no more tomorrow.\n[03:45.980]Till you come back to me.\n[03:48.290]Baby there's no' no' no' no more tomorrow.\n[03:54.660]Till you come back' everyday is yesterday.\n[03:57.460]Baby there's no' no' no' no more tomorrow.\n"
    }, {
        src: "http://niices.qiniudn.com/Tomorrow.mp3",
        cover: "http://niices.qiniudn.com/4z9_R3ULj-Yz8lcgJ0JEQg%253D%253D%252F6627856092328736.jpg",
        title: "Tomorrow",
        author: "Tablo/太阳",
        lrc: "[00:00.00] 作曲 : Tablo\n[00:01.03] 作词 : Tablo\n[04:00.010]No' no' no' no more tomorrow.\n[00:08.360]No' no' no' no more tomorrow.\n[00:17.100]사랑은 받는다고 갖는 게\n[00:18.970]시간은 걷는다고 가는 게\n[00:21.230]사람은 숨 쉰다고 사는 게\n[00:23.470]아닌데.\n[00:24.780]Baby there's no' no tomorrow.\n[00:28.550]그때 그대로 난 멈춰있고.\n[00:32.850]마지막 그 순간에 머문 시간.\n[00:37.410]너에겐 그저 지난날이지만.\n[00:41.390]Baby there's no' no' no' no more tomorrow.\n[00:50.300]Baby there's no' no' no' no more tomorrow.\n[00:58.800]찢던 가슴을 그 기억이 달력을 찢고 한해처럼 저물어가.\n[01:02.540]너를 잊고 사는 척 하기도 해. 아직도 내 세상은 변함없어.\n[01:06.790]너만 없어. 사람들은 다' 돌아보면 웃게 되는 거래.\n[01:10.350]너를 향했던 고개를 틀기도 힘든 내게.\n[01:12.530]듣기도 싫은데 왜 떠들까? 난 여기서 머문다.\n[01:16.160]하지마라' 내일은 해가 뜬다는 말.\n[01:18.400]너와의 밤보다 캄캄한 아침일 테니.\n[01:20.700]비온 뒤에 땅이 굳는다는 말.\n[01:22.570]너와의 근심보다 답답한 안심일 테니.\n[01:24.890]다 엉망이잖아.\n[01:26.330]너에게는 다시 봄이지만 내 계절은 변하지 않아.\n[01:29.390]내 마음이 또 싹튼다 해도 I've got no tomorrow.\n[01:32.800]Baby there's no' no tomorrow.\n[01:36.490]그때 그대로 난 멈춰있고.\n[01:40.780]마지막 그 순간에 머문 시간.\n[01:45.030]너에겐 그저 지난날이지만.\n[01:49.340]Baby there's no' no' no' no more tomorrow.\n[01:58.180]Baby there's no' no' no' no more tomorrow.\n[02:07.100]텅 속은 빈 죽은 미소인데\n[02:09.310]너를 만날 때보다 좋아 보인대.\n[02:11.440]이젠 한숨이 놓인대. 난 숨이 조이네.\n[02:14.060]미소가 나만 못 속이네.\n[02:16.770]평범해지긴 했어. 마음이 짐이 돼서 많이 비워냈어.\n[02:20.020]정말 미치겠어.\n[02:21.090]내겐 들리지 않는 위로들 제발 그만해.\n[02:23.810]사랑은 다른 사랑으로 잊는다는 말.\n[02:26.300]나에겐 이별보다 쓸쓸한 만남일 테니.\n[02:28.620]시간이 다 해결해준다는 말.\n[02:30.570]나에겐 매순간이 죽은듯한 삶일 테니.\n[02:33.070]그래' 사랑이란 건 받는다고 갖는 게...\n[02:35.370]시간이란 건 걷는다고 가는 게...\n[02:37.440]사람은 숨을 쉰다고 사는 게 아닌 걸 이젠 아는데.\n[02:42.250]No' no more tomorrow.\n[02:50.530]No' no more tomorrow.\n[02:56.080]네가 돌아올 때까진.\n[02:59.250]No' no' no more tomorrow.\n[03:04.550]내게 돌아올 때까진.\n[03:07.810]No' no' no more tomorrow.\n[03:14.370]Baby there's no' no tomorrow.\n[03:18.420]그때 그대로 난 멈춰있고.\n[03:22.590]마지막 그 순간에 머문 시간.\n[03:26.960]너에겐 그저 지난날이지만.\n[03:31.330]Baby there's no' no' no' no more tomorrow.\n[03:37.820]Till you come back' everyday is yesterday.\n[03:40.440]Baby there's no' no' no' no more tomorrow.\n[03:45.980]Till you come back to me.\n[03:48.290]Baby there's no' no' no' no more tomorrow.\n[03:54.660]Till you come back' everyday is yesterday.\n[03:57.460]Baby there's no' no' no' no more tomorrow.\n"
    }, ];


    /**
     * 初始化播放器
     */
    if (!IcePlayer.musicSource) {
        IcePlayer.init({
            musicSource: IcePlayer.musicSource,
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
                        musicSource: IcePlayer.musicSource,
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
