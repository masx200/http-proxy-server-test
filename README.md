# http-proxy-server-test

这是个实验项目

#### 介绍

代理服务器测试

可以使用`DNS OVER TLS` 来解析域名

使用了`dns-over-tls`

https://www.npmjs.com/package/dns-over-tls

域名解析后对于 ipv6 和 ipv4 地址,可同时连接,选择连接更快的地址.

可以把`http`请求重定向到`https`

也支持了代理转发`websocket`的功能

#### 软件架构

软件架构说明

使用`nodejs` 提供 `DNS OVER TLS`的能力

使用`deno` 提供代理转发的能力

#### 安装教程

1. `nodejs` v18.1.0

2. `Deno` 1.21.1

3. `yarn install`

#### 使用说明

1. `npm run serve`

2. `deno task serve`

3. 设置代理服务器 地址 `127.0.0.1` 端口 `19001`

4. `nodejs`服务器在端口 19002 提供 dns 服务
