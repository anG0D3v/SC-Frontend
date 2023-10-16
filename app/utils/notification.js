import { NOTIFICATION_PERMISSION } from './constants';

export const notification = (
    title,
    body,
    data,
    icon,
    image,
    tag,
    actions,
    badge,
) => {
  return Notification.requestPermission().then((permission) => {
        const ntf = new Notification(title, {
            body,
            data,
            icon,
            image,
            tag,
            actions,
            badge,
        });
        if (permission === NOTIFICATION_PERMISSION.GRANTED) {
            return ntf;
        } else {
            return ntf.addEventListener('error', (err) => {
                window.alert('Error!', err)
            })
        }
    });
};
