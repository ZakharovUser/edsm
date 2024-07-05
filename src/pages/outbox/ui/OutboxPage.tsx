import { Helmet } from 'react-helmet-async';

import { OutboxView } from 'sections/outbox';

import { NAVIGATION_CONFIG } from 'shared/navigation/config';

// ----------------------------------------------------------------------

export default function OutboxPage() {
  return (
    <>
      <Helmet>
        <title> {NAVIGATION_CONFIG.INBOX.title} </title>
      </Helmet>

      <OutboxView />
    </>
  );
}
