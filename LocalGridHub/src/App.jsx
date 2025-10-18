import { useState, useEffect } from 'react'
import modelData from './model_data.json'
import SearchBar from './components/SearchBar'
import TokenizerFamilyGrid from './components/TokenizerFamilyGrid'
import ModelList from './components/ModelList'
import './App.css'

function App() {
  const [models, setModels] = useState([])
  const [tokenizerFamilies, setTokenizerFamilies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentView, setCurrentView] = useState('families')
  const [selectedFamily, setSelectedFamily] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  useEffect(() => {
    const modelsArray = Object.entries(modelData).map(([name, data]) => ({
      name,
      ...data
    }))
    setModels(modelsArray)

    // Groups models by tokenizer_family
    const familyGroups = modelsArray.reduce((acc, model) => {
      const family = model.tokenizer_family
      if (!acc[family]) {
        acc[family] = []
      }
      acc[family].push(model)
      return acc
    }, {})

    //  Convert to array for later use and sorts by the length 
    //  Can prob assume the user wants to use something there is more of
    const familiesArray = Object.entries(familyGroups)
      .map(([family, models]) => ({
        name: family,
        count: models.length,
        models: models
      }))
      .sort((a, b) => b.count - a.count)

    setTokenizerFamilies(familiesArray)
  }, [])

  // If the user types in the search bar it resets search page to 1
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // Filter families based on search
  const filteredFamilies = tokenizerFamilies.filter(family =>
    family.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleFamilyClick = (family) => {
    setSelectedFamily(family)
    setCurrentView('models')
    setCurrentPage(1)
  }

  const handleBackToFamilies = () => {
    setCurrentView('families')
    setSelectedFamily(null)
    setSearchTerm('')
  }

  const filteredModels = selectedFamily ? 
    selectedFamily.models.filter(model =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : []

  const totalPages = Math.ceil(filteredModels.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentModels = filteredModels.slice(startIndex, endIndex)

  return (
    <div className="app">
      <header className="app-header">
        <h1>LocalGrid Supported Models</h1>
        <p>
          {currentView === 'families' 
            ? `Browse ${models.length} models organized by tokenizer family`
            : `Viewing ${selectedFamily?.name} models (${filteredModels.length} total)`
          }
        </p>
        {currentView === 'models' && (
          <button className="back-button" onClick={handleBackToFamilies}>
            ← Back to Families
          </button>
        )}
      </header>
      
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder={currentView === 'families' ? 'Search tokenizer families...' : 'Search models...'}
      />
      
      {currentView === 'families' ? (
        <TokenizerFamilyGrid 
          families={filteredFamilies} 
          onFamilyClick={handleFamilyClick}
        />
      ) : (
        <ModelList 
          models={currentModels}
          totalModels={filteredModels.length}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  )
}

export default App