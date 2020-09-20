$(function() {
    getUserInfo();

    // 给退出按钮绑定单击事件
    $('#bynLogout').on('click', function() {
        // console.log('ok');
        // 提示用户是否退出
        var layer = layui.layer;
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //1. 清空本地存储的token
            localStorage.removeItem('token');
            //2. 跳转到注册页面
            location.href = '/login.html'

            //layui的方法，关闭弹出层
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: "/my/userinfo",
        data: "data",
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //renderAvatar() 渲染用户的头像
            renderAvatar(res.data)
        },
        // 无论成功或者失败都会调用xomplete函数
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1. 强制清空 token
        //         localStorage.removeItem('token');
        //         // 2. 强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    });
}
// 渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户的名字
    var name = user.nickname || user.username;
    // 2.设置ui结构里面用户的名称
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
        //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2渲染文字图像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
    }
}