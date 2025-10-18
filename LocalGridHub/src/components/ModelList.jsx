import ModelCard from './ModelCard'
import Pagination from './Pagination'

function ModelList({ models, totalModels, currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="model-list">
      <div className="results-info">
        <p>Showing {models.length} of {totalModels} models (Page {currentPage} of {totalPages})</p>
      </div>
      
      <div className="models-grid">
        {models.length > 0 ? (
          models.map((model, index) => (
            <ModelCard key={model.name} model={model} />
          ))
        ) : (
          <div className="no-results">
            <p>No models found matching your search criteria.</p>
          </div>
        )}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default ModelList
