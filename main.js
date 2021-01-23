"ui";

/*
 * @Description: 自动保存界面配置
 * @Version: 0.0.1
 * @author: 家
 * @QQ: 203118908
 * @bilibili: 晓宇小凡
 * @Date: 2020-02-23 00:31:07
 * @LastEditors: 牙叔
 * @LastEditTime: 2021-01-24 01:23:55
 * @测试机型: 小米8
 * @autojs版本: 8.5.9
 */

let autoSaveActivityConfiguration = require("./autoSaveActivityConfiguration");
autoSaveActivityConfiguration();

let viewHeight = "150px";
let textSize = "20sp";
ui.layout(
  <vertical margin="20">
    <text textSize="25sp" textStyle="bold" gravity="center" textColor="#ff00ff">
      功能: 保存界面配置
    </text>
    <vertical>
      <input id="input1" w="*" h="{{viewHeight}}" tag="EditText" />
      <input id="input2" w="*" h="{{viewHeight}}" tag="EditText" />
      <input id="input3" w="*" h="{{viewHeight}}" tag="EditText" />
    </vertical>
    <radiogroup id="fbName" orientation="horizontal">
      <radio id="radio1" text="选项1"></radio>
      <radio id="radio2" text="选项2"></radio>
      <radio id="radio3" text="选项3"></radio>
      <radio id="radio4" text="选项4"></radio>
      <radio id="radio5" text="选项5"></radio>
    </radiogroup>
    <button id="btn">hello world</button>
    <horizontal weightSum="5">
      <checkbox id="cb1" h="*" w="0dp" layout_weight="1"></checkbox>
      <checkbox id="cb2" h="*" w="0dp" layout_weight="1"></checkbox>
      <checkbox id="cb3" h="*" w="0dp" layout_weight="1"></checkbox>
      <checkbox id="cb4" h="*" w="0dp" layout_weight="1"></checkbox>
      <checkbox id="cb5" h="*" w="0dp" layout_weight="1"></checkbox>
    </horizontal>
    <horizontal>
      <spinner id="spinner1" h="*" w="0dp" layout_weight="1" entries="男|女|未知" />
      <spinner id="spinner2" h="*" w="0dp" layout_weight="1" entries="猪|拱|白菜" />
    </horizontal>
    <horizontal>
      <Switch id="switch1" h="*" w="0dp" layout_weight="1" />
      <Switch id="switch2" h="*" w="0dp" layout_weight="1" />
      <Switch id="switch3" h="*" w="0dp" layout_weight="1" />
    </horizontal>
    <seekbar id="seekbar" w="*" h="100" max="100" />
    <horizontal>
      <text text="作者: " textSize="{{textSize}}" h="*" w="0dp" layout_weight="1"></text>
      <text text="家" textSize="{{textSize}}" h="*" w="0dp" layout_weight="1"></text>
    </horizontal>
    <horizontal>
      <text text="ＱＱ: " textSize="{{textSize}}" h="*" w="0dp" gravity="center_vertical" layout_weight="1"></text>
      <button
        id="qq"
        text="203118908"
        textSize="{{textSize}}"
        textStyle="bold"
        h="*"
        w="0dp"
        layout_weight="1"
        style="Widget.AppCompat.Button.Colored"
      ></button>
    </horizontal>
  </vertical>
);

ui.qq.click(() => {
  setClip(ui.qq.text());
  toastLog("已复制作者QQ号");
  app.startActivity({
    action: "android.intent.action.VIEW",
    data: "mqqwpa://im/chat?chat_type=wpa&uin=" + ui.qq.text(),
  });
});
