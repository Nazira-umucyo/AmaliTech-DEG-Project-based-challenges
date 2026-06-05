import React, { useState } from 'react';
import flowData from './flow_data.json';

const NODE_WIDTH = 180;
const NODE_HEIGHT = 80;

function getCenter(position) {
  return {
    x: position.x + NODE_WIDTH / 2,
    y: position.y + NODE_HEIGHT / 2,
  };
}

function App() {
  const [nodes, setNodes] = useState(flowData.nodes);
  const [selectedNode, setSelectedNode] = useState(null);
  const [editText, setEditText] = useState('');
  const [mode, setMode] = useState('editor'); // 'editor' or 'preview'
  const [currentNodeId, setCurrentNodeId] = useState('1');
  const [chatHistory, setChatHistory] = useState([]);

  const connections = [];
  nodes.forEach(node => {
    node.options.forEach(option => {
      const target = nodes.find(n => n.id === option.nextId);
      if (target) {
        const from = getCenter(node.position);
        const to = getCenter(target.position);
        connections.push({ from, to });
      }
    });
  });

  function handleNodeClick(node) {
    setSelectedNode(node);
    setEditText(node.text);
  }

  function handleSave() {
    setNodes(nodes.map(n =>
      n.id === selectedNode.id ? { ...n, text: editText } : n
    ));
    setSelectedNode(null);
  }

  function handleOptionClick(option) {
    const currentNode = nodes.find(n => n.id === currentNodeId);
    setChatHistory(prev => [...prev, { question: currentNode.text, answer: option.label }]);
    setCurrentNodeId(option.nextId);
  }

  function handleRestart() {
    setCurrentNodeId('1');
    setChatHistory([]);
  }

  const currentNode = nodes.find(n => n.id === currentNodeId);

  return (
    <div style={{ background: '#1a1a2e', minHeight: '100vh', color: 'white', padding: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>SupportFlow Visual Builder</h1>
        <button
          onClick={() => { setMode(mode === 'editor' ? 'preview' : 'editor'); handleRestart(); }}
          style={{ background: '#e94560', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}
        >
          {mode === 'editor' ? '▶ Preview' : '✏ Editor'}
        </button>
      </div>

      {/* EDITOR MODE */}
      {mode === 'editor' && (
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ position: 'relative', width: '1200px', height: '800px', background: '#16213e', borderRadius: '12px' }}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              {connections.map((conn, i) => (
                <line key={i} x1={conn.from.x} y1={conn.from.y} x2={conn.to.x} y2={conn.to.y} stroke="#e94560" strokeWidth="2" strokeDasharray="5,5" />
              ))}
            </svg>
            {nodes.map(node => (
              <div
                key={node.id}
                onClick={() => handleNodeClick(node)}
                style={{
                  position: 'absolute',
                  left: node.position.x,
                  top: node.position.y,
                  background: selectedNode?.id === node.id ? '#e94560' : 
                    node.type === 'start' ? '#1a6b3c' : 
                    node.type === 'end' ? '#6b1a1a' : '#0f3460',
                  border: '2px solid #e94560',
                  borderRadius: '8px',
                  padding: '12px',
                  width: `${NODE_WIDTH}px`,
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <span style={{ 
                 fontSize: '10px', 
                 background: '#e94560', 
                 padding: '2px 6px', 
                 borderRadius: '4px',
                 marginBottom: '6px',
                 display: 'inline-block'
               }}>
                {node.type.toUpperCase()}
              </span>
             <p style={{ margin: '6px 0 0 0' }}>{node.text}</p>
              </div>
            ))}
          </div>

          {selectedNode && (
            <div style={{ background: '#16213e', padding: '20px', borderRadius: '12px', width: '250px' }}>
              <h3>Edit Node</h3>
              <textarea
                value={editText}
                onChange={e => setEditText(e.target.value)}
                style={{ width: '100%', height: '100px', background: '#0f3460', color: 'white', border: '1px solid #e94560', borderRadius: '8px', padding: '8px', fontSize: '14px' }}
              />
              <button
                onClick={handleSave}
                style={{ marginTop: '10px', background: '#e94560', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', width: '100%' }}
              >
                Save
              </button>
            </div>
          )}
        </div>
      )}

      {mode === 'preview' && (
        <div style={{ maxWidth: '500px', margin: '0 auto', background: '#16213e', borderRadius: '12px', padding: '20px' }}>
          <h2 style={{ textAlign: 'center' }}>🤖 Support Bot</h2>

          {chatHistory.map((item, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ background: '#0f3460', padding: '10px', borderRadius: '8px', marginBottom: '6px' }}>
                🤖 {item.question}
              </div>
              <div style={{ background: '#e94560', padding: '10px', borderRadius: '8px', textAlign: 'right' }}>
                You: {item.answer}
              </div>
            </div>
          ))}

          {currentNode.options.length > 0 ? (
            <div>
              <div style={{ background: '#0f3460', padding: '10px', borderRadius: '8px', marginBottom: '16px' }}>
                🤖 {currentNode.text}
              </div>
              {currentNode.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(option)}
                  style={{ display: 'block', width: '100%', background: '#0f3460', color: 'white', border: '1px solid #e94560', padding: '10px', borderRadius: '8px', cursor: 'pointer', marginBottom: '8px', fontSize: '14px' }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : (
            <div>
              <div style={{ background: '#0f3460', padding: '10px', borderRadius: '8px', marginBottom: '16px' }}>
                🤖 {currentNode.text}
              </div>
              <button
                onClick={handleRestart}
                style={{ display: 'block', width: '100%', background: '#e94560', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}
              >
                🔄 Restart
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default App;