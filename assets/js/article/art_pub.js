$(function() {
    var layer = layui.layer;
    var form = layui.form;


    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                layer.msg('初始化文章分类成功！');
                // 调用模板引擎渲染分类的下拉菜单
                var htmlStr = template('tpl-cat', res);
                $('[name="cate_id"]').html(htmlStr);
                //渲染完成一定要调用form.render()  让layui重新在加载页面
                form.render()
            }
        });
    }
    initCate();
    // 初始化富文本编辑器
    initEditor();
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    // 为选中封面的按钮，绑定点击事件处理函数
    $('#btnChooseImage').on('click', function(e) {
        // e.preventDefault()
        $('#coverFile').click()
    })

    // 监听coverFile的change事件，获取用户选中的文件列表
    $('#coverFile').on('change', function(e) {
        // 获取到文件的列表数组
        var files = e.target.files;
        if (files.length === 0) {
            return
        }
        // 根据文件，创建对应的url地址
        var newImgURL = URL.createObjectURL(files[0])

        // 为裁剪区域重新设置
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域




    })

    // 自定义文章的发布状态
    var art_state = '已发布';

    // 为 存为草稿 按钮绑定点击事件
    $('#btnSave2').on('click', function() {
        art_state = '草稿'
    })

    // 为表单监听sunbit事件
    $('#form-pub').on('submit', function(e) {
            // 1.阻止表单默认行为
            e.preventDefault();
            // 2.基于form表单，快速创建一个 FormData 对象
            var fd = new FormData($(this)[0]);
            // 3.将文章的发布状态存到 fd 中
            fd.append('state', art_state)
                // 4.将封面裁剪过后的图片。输出为一个文件对象
            $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                    // 5.得到文件对象后，进行后续的操作
                    fd.append('cover_img', blob);
                    // 6.调用发布文章的方法
                    publishArticle(fd)
                    $('#ret').click()
                })

        })
        // 定义一个发布文章的方法
    function publishArticle(fd) {
        $.ajax({
            method: "POST",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                location.href = '/article/art_list.html';

            }
        });
    }
})