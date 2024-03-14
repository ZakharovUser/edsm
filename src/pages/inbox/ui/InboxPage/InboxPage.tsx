import { Helmet } from 'react-helmet-async';

import { NAVIGATION_CONFIG } from 'src/shared/navigation/config';

import { InboxView } from 'src/sections/inbox';

// ----------------------------------------------------------------------

export default function InboxPage() {
  return (
    <>
      <Helmet>
        <title> {NAVIGATION_CONFIG.INBOX.title} </title>
      </Helmet>

      <InboxView />
    </>
  );
}
