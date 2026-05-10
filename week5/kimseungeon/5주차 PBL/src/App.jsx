// src/App.jsx
import lions from './data/lions.js'
import ControlBar from './components/ControlBar.jsx'
import ViewOptions from './components/ViewOptions.jsx'
import AddForm from './components/AddForm.jsx'
import CardGrid from './components/CardGrid.jsx'
import DetailList from './components/DetailList.jsx'

function App() {
  return (
    <main className="page">
      <ControlBar totalCount={lions.length} />
      <ViewOptions />
      <AddForm />
      <CardGrid lions={lions} />
      <DetailList lions={lions} />
    </main>
  )
}

export default App
