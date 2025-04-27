import React from 'react'

const FallBack = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
        <p className="mt-4 text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

export default FallBack