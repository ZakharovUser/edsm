import { Helmet } from 'react-helmet-async';

import { InboxView } from 'sections/inbox';

import { NAVIGATION_CONFIG } from 'shared/navigation/config';

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
