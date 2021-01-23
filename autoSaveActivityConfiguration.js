const storage = storages.create("autoSaveActivityConfiguration");
// 如果出错了, 就先清空本地存储, 再试一次.
// storage.clear();
const storageKey = "autoSaveActivityConfiguration";

const whiteList = [
  "android.widget.EditText",
  "android.widget.RadioButton",
  "android.widget.CheckBox",
  "android.widget.Switch",
  "android.widget.CheckedTextView",
  "android.widget.SeekBar",
];

function filterView(view, arr) {
  arr = arr || [];
  if (view instanceof android.view.ViewGroup) {
    let childCount = view.childCount;
    for (var i = 0; i < childCount; i++) {
      let chileView = view.getChildAt(i);
      filterView(chileView, arr);
    }
  } else {
    let accessibilityClassName = view.accessibilityClassName;
    if (!!~whiteList.indexOf(accessibilityClassName)) {
      arr.push(view);
    }
  }
  return arr;
}
function handleView(view, orderNumber) {
  let value;
  switch (view.accessibilityClassName) {
    case "android.widget.EditText":
      value = view.text();
      break;
    case "android.widget.RadioButton":
      value = view.checked;
      break;
    case "android.widget.CheckBox":
      value = view.checked;
      break;
    case "android.widget.Switch":
      value = view.checked;
      break;
    case "android.widget.CheckedTextView":
      value = view.parent.getSelectedItem();
      break;
    case "android.widget.SeekBar":
      value = view.getProgress();
      break;
    default:
      throw new Error("控件不在白名单中");
  }
  return {
    orderNumber: orderNumber,
    accessibilityClassName: view.accessibilityClassName,
    value: value,
  };
}

function setSpinnerItemSelectedByValue(spinner, value) {
  let adapter = spinner.getAdapter(); //得到Spinner Adapter对象
  let count = adapter.getCount();
  for (let i = 0; i < count; i++) {
    if (value.equals(adapter.getItem(i).toString())) {
      spinner.setSelection(i, true); // 默认选中项
      break;
    }
  }
}

function restoreView(view, value) {
  switch (view.accessibilityClassName) {
    case "android.widget.EditText":
      view.setText(value);
      break;
    case "android.widget.RadioButton":
      view.checked = value;
      break;
    case "android.widget.CheckBox":
      view.checked = value;
      break;
    case "android.widget.Switch":
      view.checked = value;
      break;
    case "android.widget.CheckedTextView":
      setSpinnerItemSelectedByValue(view.parent, value);
      break;
    case "android.widget.SeekBar":
      view.setProgress(value);
      break;
    default:
      throw new Error("控件不在白名单中");
  }
}

function main(view) {
  let viewList = filterView(view);

  var len = viewList.length;
  let viewDataList = [];
  for (var i = 0; i < len; i++) {
    let currentView = viewList[i];
    let viewData = handleView(currentView, i);
    viewDataList.push(viewData);
  }
  storage.put(storageKey, JSON.stringify(viewDataList));
}
function restore(view, value) {
  let viewList = filterView(view);

  var len = viewList.length;
  let viewDataList = JSON.parse(value);
  for (var i = 0; i < len; i++) {
    let currentView = viewList[i];
    let currentViewAccessibilityClassName = currentView.accessibilityClassName;
    if (
      currentViewAccessibilityClassName === viewDataList[i].accessibilityClassName &&
      i === viewDataList[i].orderNumber
    ) {
      restoreView(currentView, viewDataList[i].value);
    }
  }
}
function autoSaveActivityConfiguration(view) {
  ui.post(function () {
    view = view || ui.view;

    let value = storage.get(storageKey);
    if (value) {
      // 先还原之前的界面配置
      restore(view, value);
    }
    const interValTime = 1000;
    let currentTime = new Date().getTime();
    let lastTime = currentTime;
    view.getViewTreeObserver().addOnDrawListener({
      onDraw: function () {
        currentTime = new Date().getTime();
        if (currentTime - lastTime > interValTime) {
          lastTime = currentTime;
          main(view);
        }
      },
    });
  }, 200);
}

module.exports = autoSaveActivityConfiguration;
