
#api modify record

###laya core
* bezierCurveTo [Add]
-  xiaohu 2017/10/07
-  /static/lib/laya/laya.core.js 5311

```javascript
case 'bezierCurveTo':
    Render.isWebGL ? ctx.bezierCurveTo(path[1],path[2],path[3],path[4],path[5],path[6]):ctx.arcTo(x+path[1],y+path[2],x+path[3],y+path[4],x+path[5],y+path[6]);
    break ;
```