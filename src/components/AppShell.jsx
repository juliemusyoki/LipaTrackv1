export default function AppShell({ children, wide = false }) {
  return (
    <main className="min-h-screen bg-[#f3f6f4] flex justify-center">
      <section
        className={`w-full min-h-screen bg-white shadow-sm ${
          wide ? "max-w-[1200px]" : "max-w-[430px]"
        }`}
      >
        {children}
      </section>
    </main>
  )
}