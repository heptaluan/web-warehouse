// 保存函数
const STORAGE_KEY = "todos-vuejs"

export default {
    // 读取 getItem
    fetch () {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    },
    // 保存 setItem
    save (items) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
}
