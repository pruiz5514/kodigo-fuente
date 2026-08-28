const Header = () => {
  return (
    <header className="border border-border-color flex justify-center py-5 px-8">
        <div className="w-full max-w-7xl flex justify-between items-center">
            <img src="/logo.png" alt="logo" className="w-40"/>
            <h1 className="text-4xl text-muted font-semibold">Prueba promociones</h1>
        </div>
    </header>
  )
}

export default Header