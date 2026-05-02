export default function AppShell({ children }) {
  return (
    <main className="min-h-screen bg-[#f5f7f6] flex justify-center">
      <section className="w-full max-w-[430px] min-h-screen bg-white shadow-sm">
        {children}
      </section>
    </main>
  )
}