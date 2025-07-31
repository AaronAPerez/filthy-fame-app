import React from 'react'
import { Suspense } from 'react'
import ResetPasswordForm from './ResetPasswordForm'

// Loading component for Suspense fallback
function ResetPasswordLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Loading...
          </h2>
          <p className="text-gray-600">
            Preparing password reset form
          </p>
        </div>
      </div>
    </div>
  )
}

// Main page component with Suspense boundary
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordForm />
    </Suspense>
  )
}
// import React from 'react'
// import { Suspense } from 'react'
// import ResetPasswordForm from './ResetPasswordForm'

// // Loading component for Suspense fallback
// function ResetPasswordLoading() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             Loading...
//           </h2>
//           <p className="text-gray-600">
//             Preparing password reset form
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Main page component with Suspense boundary
// export default function ResetPasswordPage() {
//   return (
//     <Suspense fallback={<ResetPasswordLoading />}>
//       <ResetPasswordForm />
//     </Suspense>
//   )
// }