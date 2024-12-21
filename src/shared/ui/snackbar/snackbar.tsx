import Iconify from 'components/iconify';

import { StyledToaster } from './styles';
import { toasterClasses } from './classes';

// ----------------------------------------------------------------------

export function Snackbar() {
  return (
    <StyledToaster
      gap={12}
      closeButton
      offset={16}
      position="top-right"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: toasterClasses.toast,
          icon: toasterClasses.icon,
          // content
          content: toasterClasses.content,
          title: toasterClasses.title,
          description: toasterClasses.description,
          // button
          actionButton: toasterClasses.actionButton,
          cancelButton: toasterClasses.cancelButton,
          closeButton: toasterClasses.closeButton,
          // state
          default: toasterClasses.default,
          info: toasterClasses.info,
          error: toasterClasses.error,
          success: toasterClasses.success,
          warning: toasterClasses.warning,
        },
      }}
      icons={{
        loading: <span className={toasterClasses.loadingIcon} />,
        info: <Iconify className={toasterClasses.iconSvg} icon="solar:info-circle-bold" />,
        success: <Iconify className={toasterClasses.iconSvg} icon="solar:check-circle-bold" />,
        warning: <Iconify className={toasterClasses.iconSvg} icon="solar:danger-triangle-bold" />,
        error: <Iconify className={toasterClasses.iconSvg} icon="solar:danger-bold" />,
      }}
    />
  );
}
