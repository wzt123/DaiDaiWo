var fav = false;
apiready = function () {

    api.showProgress({
        title: '加载中...',
        modal: false
    });


    var dataId = api.pageParam.dataId; //activity id

    var getActivityById = '/article?filter=';
    var urlParam = {
        where: {
            id: dataId
        }
    };
    ajaxRequest(getActivityById + JSON.stringify(urlParam), 'GET', '', function (ret, err) {
        if (ret) {
            var content = $api.byId('act-detail');
            var tpl = $api.byId('act-template').text;
            var tempFn = doT.template(tpl);
            content.innerHTML = tempFn(ret[0]);
            $("#activeId").off('click').on('click', function () {
                collect(this, 'act_fav');
            })
            var uid = $api.getStorage('uid');
            if (uid) {
                var getUserAct_favUrl = '/user?filter=';
                var act_urlParam = {
                    fields: {"act_fav": true},
                    include: ["act_fav"],
                    where: {
                        id: uid
                    }
                };
                ajaxRequest(getUserAct_favUrl + JSON.stringify(act_urlParam), 'GET', '', function (ret, err) {
                    if (ret) {
                        var act_favArr = ret[0].act_fav;
                        for (var i = 0; i < act_favArr.length; i++) {
                            if (act_favArr[i].activity == api.pageParam.dataId) {
                                fav = true;
                                if (fav) {
                                    $api.html($api.byId('activeId'), "已收藏");
                                    $("#activeId").off('click').on('click', function () {
                                        uncollect('act_fav', act_favArr[i].id, this);
                                    })
                                }
                                break;
                            }
                        }

                    } else {
                        api.toast({msg: err.msg, location: 'middle'})
                    }

                })

            }
        } else {
            api.toast({msg: err.msg, location: 'middle'})
        }
        api.hideProgress();
    });


};