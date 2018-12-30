import electron from 'electron';

export default function install(Vue) {
    Vue.prototype.$dialog = {
        confirmChange() {
            return this.commonDialog('当前有未保存修改, 直接切换可能造成修改丢失!是否继续？');
        },
        updateName() {
            return this.commonDialog('当动作内容有修改尚未保存，直接修改名称会造成修改丢失！是否继续？');
        },
        commonDialog(message) {
            const { dialog } = electron.remote;

            return new Promise((resolve, reject) => {
                dialog.showMessageBox({
                    type: 'warning',
                    title: '提示',
                    message,
                    buttons: ['否', '是']
                }, (btnIndex) => {
                    if (btnIndex === 0) {
                        reject();
                    } else if (btnIndex === 1) {
                        resolve();
                    }
                });
            });
        }
    }
}