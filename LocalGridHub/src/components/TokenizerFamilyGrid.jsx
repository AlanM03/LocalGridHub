import TokenizerFamilyCard from './TokenizerFamilyCard'

function TokenizerFamilyGrid({ families, onFamilyClick }) {
  return (
    <div className="families-grid">
      {families.map((family, index) => (
        <TokenizerFamilyCard 
          key={family.name} 
          family={family} 
          onClick={() => onFamilyClick(family)}
        />
      ))}
    </div>
  )
}

export default TokenizerFamilyGrid