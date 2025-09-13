import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xs tracking-[0.15em] text-gray-500 mb-4">NAVIGATION</h3>
            <div className="space-y-2">
              <Link href="/collections" className="block text-xs hover:underline">Collections</Link>
              <Link href="/lab" className="block text-xs hover:underline">Lab</Link>
              <Link href="/archive" className="block text-xs hover:underline">Archive</Link>
              <Link href="/about" className="block text-xs hover:underline">About</Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs tracking-[0.15em] text-gray-500 mb-4">CONTACT</h3>
            <div className="space-y-2 text-xs">
              <p>hello@cinchlab.com</p>
              <p>press@cinchlab.com</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs tracking-[0.15em] text-gray-500 mb-4">SOCIAL</h3>
            <div className="space-y-2 text-xs">
              <a href="#" className="block hover:underline">Instagram</a>
              <a href="#" className="block hover:underline">Twitter</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs tracking-[0.15em] text-gray-500 mb-4">LEGAL</h3>
            <div className="space-y-2 text-xs">
              <Link href="/privacy" className="block hover:underline">Privacy Policy</Link>
              <Link href="/terms" className="block hover:underline">Terms of Service</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            © 2024 CINCH LAB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}