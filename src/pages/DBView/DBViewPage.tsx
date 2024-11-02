import React, { useEffect, useState } from 'react';

function DBViewPage(): React.ReactElement {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    const fetchDb = async () => {
      const res = await fetch('/api/db');
      const returnedData = await res.json();
      setData(returnedData);
    };
    fetchDb();
  }, []);
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DBViewPage;
