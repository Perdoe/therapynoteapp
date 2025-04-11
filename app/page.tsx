"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Home() {
  const [hoverTherapist, setHoverTherapist] = useState(false)
  const [hoverPatient, setHoverPatient] = useState(false)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-[40vw] h-[40vw] bg-[#FFB5D0] organic-shape-2 floating-slow opacity-70"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] bg-[#B4F0E0] organic-shape floating opacity-70"></div>
        <div className="absolute top-[40%] right-[20%] w-[25vw] h-[25vw] bg-[#D8B4F0] organic-shape-3 floating-fast opacity-70"></div>
        <div className="absolute bottom-[10%] left-[25%] w-[30vw] h-[30vw] bg-[#F0B4D8] organic-shape floating opacity-70"></div>
      </div>

      <div className="w-full max-w-md">
        <div className="mb-12 text-center relative">
          <div className="absolute top-[-30px] left-[50%] transform -translate-x-1/2 w-[200px] h-[80px] bg-[#B4F0E0] organic-shape-2 -z-10"></div>
          <h1 className="text-5xl font-handwritten text-[#333] relative z-10">Sanare</h1>
          <p className="mt-2 text-[#555]">Simple. Supportive. Secure.</p>
        </div>

        <div className="flex flex-col gap-6 items-center">
          <motion.div
            className="w-full"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              href="/therapist"
              className="block w-full p-6 rounded-2xl bg-[#D8B4F0] text-center font-medium text-lg shadow-md hover:shadow-lg transition-shadow"
              onMouseEnter={() => setHoverTherapist(true)}
              onMouseLeave={() => setHoverTherapist(false)}
            >
              <span className="text-white">Therapist Login</span>
              {hoverTherapist && <p className="mt-2 text-sm text-white/80">Access your notes and sessions</p>}
            </Link>
          </motion.div>

          <motion.div
            className="w-full"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              href="/patient"
              className="block w-full p-6 rounded-2xl bg-[#B4F0E0] text-center font-medium text-lg shadow-md hover:shadow-lg transition-shadow"
              onMouseEnter={() => setHoverPatient(true)}
              onMouseLeave={() => setHoverPatient(false)}
            >
              <span className="text-[#333]">Patient Login</span>
              {hoverPatient && <p className="mt-2 text-sm text-[#333]/80">Track your progress and feelings</p>}
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-4 text-center text-sm text-[#555]">
        <p>A safe space for your mental health journey</p>
      </div>
    </main>
  )
}

