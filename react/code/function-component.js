import React from 'react'

// functional component
function APP(props) {
  return <h1>Hello, {props.name}</h1>;
}

export default App;

function Button({color='color', text='Confirm'}) {
  return (
    <button className={`btn btn-${color}`}>
      <em>{text}</em>
    </button>
  )
}