import { useState } from 'react'

function ModelCard({ model }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(model.name)
      setCopied(true)
      setTimeout(() => setCopied(false), 1000) // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const ChainlinkIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  )

  const CheckIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  )

  return (
    <div className="model-card">
      <div className="model-header">
        <h3 className="model-name">{model.name}</h3>
        <button 
          className={`copy-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          title={copied ? 'Copied!' : 'Copy model name'}
        >
          {copied ? <CheckIcon /> : <ChainlinkIcon />}
        </button>
      </div>
      
      <div className="model-details">
        <div className="detail-row">
          <span className="detail-label">Tokenizer Family:</span>
          <span className="detail-value">{model.tokenizer_family}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Size:</span>
          <span className="detail-value">{model.size}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Context:</span>
          <span className="detail-value">{model.context}</span>
        </div>
      </div>
    </div>
  )
}

export default ModelCard
