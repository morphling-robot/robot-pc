import electron from 'electron';

export default function install(Vue) {
    Vue.prototype.$dialog = {
        confirmChange() {
            const { dialog } = electron.remote;

            return new Promise((resolve, reject) => {
                dialog.showMessageBox({
                    type: 'warning',
                    title: '提示',
                    message: '当前有未保存修改, 直接切换可能造成修改丢失!是否继续？',
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