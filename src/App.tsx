import React from 'react';

interface TitleProps{
  title: string;
}

function Title({ title }: TitleProps) {
  return (
    <h1>{title}</h1>
  )
}

function App() {
  return (
    <div className="App">
      <Title title="Hello NLW #3" />
      <Title title="Title 2" />
      <Title title="Title 3" />
      <Title title="Title 4" />
    </div>
  );
}

export default App;
