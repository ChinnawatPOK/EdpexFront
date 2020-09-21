import React, { useState, useEffect } from "react";

function SelectedGraph(props) {
  const [outputId, setOutputId] = useState(props.location.state.outputId);

  return <div>{outputId.type}</div>;
}

export default SelectedGraph;
