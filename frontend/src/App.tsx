import StatsSection from "./components/molecules/StatsSection"
import Header from "./components/organisms/Header"

function App() {

  return (
    <>
      <Header/>
      <main className="w-full flex justify-center py-12 px-8">
        <div className="w-full max-w-7xl">
          <StatsSection/>
        </div>
      </main>
    </>
  )
}

export default App
