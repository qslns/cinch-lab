export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        <p className="mt-4 text-white text-sm tracking-widest">LOADING</p>
      </div>
    </div>
  )
}