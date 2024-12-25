import CONFIG_GLOBAL from 'config-global';

import SvgColor from '../../../components/svg-color';

export const icon = (name: string) => (
  <SvgColor
    src={`${CONFIG_GLOBAL.assetsDir}/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
  // OR
  // <Iconify icons="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);
