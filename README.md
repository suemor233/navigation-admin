## 这里是 navigation 后台管理系统

使用了以下技术

- Vue3
- Vite
- TSX
- Tailwindcss
- Pinia
- UmiRequest
- NaiveUI

## 项目结构

```
.
src
├─ api  				# umi-request 请求封装
├─ common				# 常量
├─ components		    # 组件
├─ hooks				# hook 函数，一般以 use-xxx.ts 命名
├─ layouts 			# 页面布局文件，用作分割布局，如下图左右两边在此分开，右边为一个 RouterView，2，3 则为插槽，只需在 views 中为插槽填入内容即可
├─ views				# 视图层，也是主要编写代码的地方，因为 layouts 进行了分割，所以我们只要往 2，3 插槽离填入内容就可以了
├─ models				# typescript 类型文件
├─ router				# 路由配置
├─ store				# pinia 状态管理
├─ styles				# 全局样式
├─ utils				# 工具类
```

## 预览

<p align="middle">
<img src="https://fastly.jsdelivr.net/gh/suemor233/static@main/img/navigation-admin-1.jpg" width="1000" alt="初始化" />
<img src="https://fastly.jsdelivr.net/gh/suemor233/static@main/img/navigation-admin-2.jpg" width="1000" alt="登录" />
<img src="https://fastly.jsdelivr.net/gh/suemor233/static@main/img/n-admin-7.jpg" width="1000" alt="仪表盘" />
<img src="https://fastly.jsdelivr.net/gh/suemor233/static@main/img/n-admin-6.jpg" width="1000" alt="关于" />
<img src="https://fastly.jsdelivr.net/gh/suemor233/static@main/img/n-admin-5.jpg" width="1000" alt="我的" />
</p>

## Reference
项目参考了 [mx-admin](https://github.com/mx-space/mx-admin)

## 补充

[navigation前端仓库地址](https://github.com/suemor233/Navigation) 

[navigation后端仓库地址](https://github.com/suemor233/navigation-server) 
