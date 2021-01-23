# autoSaveActivityConfiguration
1. 使用`view.getViewTreeObserver().addOnDrawListener`该api, 随时监听界面配置变化
2. 只适用于比较简单的界面
3. 是按照控件顺序, 来保存界面配置的, 还原也是要对应, 保存时的控件顺序
4. 不支持动态增删改查view的布局, 因为动态增删view, 顺序就不对了
5. 感谢`HyunMai`提供的界面监听api