// 每次调用get post ajax 请求时
// 都会先调用ajaxPrefilter这个函数
// 在这个函数中我们可以拿到ajax给我们的配置对象
$.ajaxPrefilter(function(options) {
    //在发起请求之前统一给url拼接请求根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})