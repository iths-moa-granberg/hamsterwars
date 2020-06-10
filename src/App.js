import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const url = `/api/hamsters/1`;
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {      
      try {
        let response = await fetch(url);
        const json = await response.json();        
        setData(json);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [url]);

  return (
    <div>
      {data && data.favFood}
    </div>
  );
}

export default App;
