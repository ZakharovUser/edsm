export function formatNotifiers(notifiers: string[]) {
  return notifiers.reduce(
    (notifications: Array<{ type: string; value: string | number }>, value) => {
      const notifier = value.match(/^[^:]+/);

      if (!notifier) return notifications;

      const groupId = parseInt(notifier[0], 10);

      if (groupId) {
        notifications.push({ type: 'group', value: groupId });
      } else {
        notifications.push({ type: 'user', value: notifier[0] });
      }

      return notifications;
    },
    []
  );
}
