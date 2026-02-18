export default function Quote() {
  return (
    <div className="relative hidden lg:flex flex-1 items-center justify-center p-12 min-h-screen border-r" style={{ backgroundColor: '#0F172A', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 water-pattern-dark"></div>

      {/* Gradient blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 rounded-full blur-[80px]" style={{ backgroundColor: 'rgba(46, 144, 255, 0.1)' }}></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 rounded-full blur-[80px]" style={{ backgroundColor: 'rgba(46, 144, 255, 0.05)' }}></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Water Drop Icon */}
        <div className="mb-10 flex justify-center">
          <div className="w-28 h-28 rounded-2xl flex items-center justify-center border transition-transform duration-500 hover:rotate-0 rotate-3" style={{ backgroundColor: 'rgba(46, 144, 255, 0.1)', borderColor: 'rgba(46, 144, 255, 0.2)' }}>
            <svg className="w-16 h-16" style={{ color: '#2E90FF' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0z" />
            </svg>
          </div>
        </div>

        <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Advanced Analysis</h3>
        <p className="text-slate-400 text-base max-w-sm mx-auto leading-relaxed">
          High-precision water quality monitoring and sample tracking for mission-critical environmental engineering.
        </p>

        {/* Features List */}
        <div className="mt-12 space-y-4 inline-block text-left">
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <span className="rounded-full p-1 shrink-0" style={{ backgroundColor: 'rgba(46, 144, 255, 0.1)', color: '#2E90FF' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </span>
            <span>Neural Sample Categorization</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <span className="rounded-full p-1 shrink-0" style={{ backgroundColor: 'rgba(46, 144, 255, 0.1)', color: '#2E90FF' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </span>
            <span>Real-time Spectrometry Data</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <span className="rounded-full p-1 shrink-0" style={{ backgroundColor: 'rgba(46, 144, 255, 0.1)', color: '#2E90FF' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </span>
            <span>Secure Chain of Custody</span>
          </div>
        </div>
      </div>

      {/* Wave SVG at bottom */}
      <div className="absolute bottom-0 left-0 w-full opacity-30">
        <svg className="w-full h-auto" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,165.3C960,139,1056,117,1152,117.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="#2E90FF"></path>
        </svg>
      </div>
    </div>
  )
}
