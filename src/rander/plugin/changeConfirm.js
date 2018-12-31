import electron from 'electron';

export default function install(Vue) {
    Vue.prototype.$dialog = {
        confirmChange(message) {
            const { dialog } = electron.remote;

            return new Promise((resolve, reject) => {
                dialog.showMessageBox({
                    type: 'warning',
                    title: 'Warning',
                    message,
                    buttons: ['No', 'Yes']
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