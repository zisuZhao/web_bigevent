$(function() {
    // 点击注册链接
    $('#link_login').on('click', function() {
        $('.login_box').hide()
        $('.reg_box').show()
    })

    //点击登录链接
    $('#link_reg').on('click', function() {
        $('.reg_box').hide()
        $('.login_box').show()
    })

    //自定义密码框的校验规则
    //1.从Layui中拿到form对象
    var form = layui.form;
    var layer = layui.layer;

    //2.通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg_box [name =password]').val();
            if (pwd !== value) {
                return '确认密码不一致！'
            }
        }

    })

    //注册请求
    $('#form_reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
            // 2. 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')

            // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    //登录请求
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})