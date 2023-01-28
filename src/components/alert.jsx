import {  notification } from 'antd';
export const Alert = (type, message, title) => {
    notification[type]({
      message: title ? title : 'Notification',
      description: message,
});
}