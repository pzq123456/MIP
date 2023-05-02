
// 此文件和代码目的让ts识别vue文件格式

/// <reference types="vite/client" />
declare module "*.vue" {
    import type { DefineComponent } from "vue";

    const vueComponent: DefineComponent<{}, {}, any>;

    export default vueComponent;
}
