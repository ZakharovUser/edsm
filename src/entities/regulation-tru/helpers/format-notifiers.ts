import { TaskNotified } from 'entities/task/model';

export function formatNotifiers(notifiers: string[]): Array<TaskNotified> {
  return notifiers.reduce((notifications: Array<TaskNotified>, value) => {
    const notifier = value.match(/^[^:]+/);

    if (!notifier) return notifications;

    const groupId = parseInt(notifier[0], 10);

    if (groupId) {
      notifications.push({ type: 'group', value: groupId });
    } else {
      notifications.push({ type: 'user', value: notifier[0] });
    }

    return notifications;
  }, []);
}
