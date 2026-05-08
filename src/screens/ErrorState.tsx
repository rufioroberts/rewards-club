import { Link } from 'react-router-dom';

export function ErrorState() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
        <header className="px-8 lg:px-16 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gray-900" />
            <span className="text-sm font-bold text-gray-900 tracking-tight">Rewards Club</span>
          </div>
        </header>

        <section className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-300 mx-auto mb-6 flex items-center justify-center">
              <span className="text-xl text-gray-400 font-bold">X</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
              Something went wrong
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              We're having trouble loading this page. Please try again in a moment.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3.5 bg-gray-900 text-white font-bold text-sm rounded border border-gray-900 hover:bg-gray-700 transition-colors cursor-pointer"
              >
                Try again
              </button>
              <Link
                to="/"
                className="px-8 py-3 text-gray-500 font-medium text-sm hover:text-gray-700 transition-colors"
              >
                Go back
              </Link>
            </div>
          </div>
        </section>
    </div>
  );
}
