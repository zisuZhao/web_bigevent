$(function() {
    var form = layui.form;
    var layer = layui.layer;
    // 自定义昵称规范
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '字符必须在1~6位之间'
            }
        }
    })

    // 用户信息初始化
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息获取失败')
                }
                console.log(res);
                // 调用form.val()方法 完成赋值
                form.val('formUserInof', res.data)
            }
        });
    }
    initUserInfo()

    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        // 在调用一次initUserInfo方法,重置数据
        initUserInfo()
    })


    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                }
                // console.log('ok');.
                // 调用父页面中的方法,重新渲染用户头像
                window.parent.getUserInfo()
                layer.msg('更新用户性息成功')
            }
        })
    })


})