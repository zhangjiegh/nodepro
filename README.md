<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
<h2>程序相关</h2>
<p>发现bug,能指点我的发问题到13144126585@163.com,先谢过</p>
<p>包含了grunt,layui,微信相关,后台模版,waterline</p>
<p>网络请求需要先经过过滤器 在core/config里面配置,没有配置将回到index界面</p>
<p>微信相关 需要配置wx/config里面配置 然后使用微信模拟器,并修改C:\Windows\System32\drivers\etc\hosts</p>
<h2>加载依赖包</h2>
<p>npm install</p>
<h2>启动</h2>
<p>启动 npm start</p>
<h2>启动 实时监听</h2>
<p>启动grunt grunt server</p>
<h2>工程目录</h2>
<ul>
<li>bin (服务启动)</li>
<li>core (工具,核心代码)</li>
<li>dist (生成压缩包)</li>
<li>logs (通过../core/util/logger 生成本地log)</li>
<li>node_modules (依赖包)</li>
<li>public (前端静态文件)</li>
<li>routes (后端js接口) </li>
<li>views (前端模板页) </li>
<li>app.js    (程序入口文件)</li>
<li>package,json (工程依赖说明)</li>
<li>Gruntfile.js(构建工具)</li>
</ul>
<h2>打包</h2>
<p>配置路径</p>
<p>命令grunt install 打包</p>

</body></html>
