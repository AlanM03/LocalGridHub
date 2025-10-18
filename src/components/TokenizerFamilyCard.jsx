function TokenizerFamilyCard({ family, onClick }) {
  return (
    <div className="family-card" onClick={onClick}>
      <div className="family-content">
        <div className="family-header">
          <h3 className="family-name">{family.name}</h3>
          <span className="arrow">→</span>
        </div>
        <p className="family-count">{family.count} models</p>
      </div>
      <div className="accent-bar"></div>
    </div>
  )
}

export default TokenizerFamilyCard
