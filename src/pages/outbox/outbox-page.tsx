import { Helmet } from 'react-helmet-async';

import { useTitle } from 'routes/hooks';

import { OutboxView } from 'sections/outbox';

// ----------------------------------------------------------------------

export default function OutboxPage() {
  const title = useTitle();

  return (
    <>
      <Helmet>
        <title> {title} </title>
      </Helmet>

      <OutboxView />
    </>
  );
}
