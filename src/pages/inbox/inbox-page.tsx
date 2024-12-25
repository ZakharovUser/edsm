import { Helmet } from 'react-helmet-async';

import { useTitle } from 'routes/hooks';

import InboxView from 'sections/inbox';

// ----------------------------------------------------------------------

export default function InboxPage() {
  const title = useTitle();

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <InboxView />
    </>
  );
}
