"use client"

import React from "react"
import { Phone, Shield, Lock, Eye, MapPin, Clock, Mail } from "lucide-react"
import Header from "@/components/reshape/Header"
import Footer from "@/components/reshape/Footer"

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="reshape flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-[#fbf8f5] py-8 sm:py-12">
        <section className="mx-auto w-full max-w-4xl rounded-lg bg-white px-4 py-8 leading-relaxed text-gray-800 shadow-md sm:px-6 md:px-8">
          {/* Decorative element */}
          <div className="mb-6 flex justify-center">
            <div className="h-1 w-16 rounded-full bg-[#22395f]"></div>
          </div>

          {/* Title */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold text-black sm:text-3xl md:text-4xl">Privacy Policy</h1>
            <p className="text-gray-500">thereshape — Advanced Hair Trinity Program</p>
          </div>

          {/* Intro */}
          <div className="mb-8 rounded-lg border-l-4 border-[#22395f] bg-[#fef5ef] p-4 sm:p-6">
            <p className="text-base text-gray-700 sm:text-lg">
              At <span className="font-semibold text-[#22395f]">thereshape</span>, we are committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, and safeguard your personal informations when you
              interact with us.
            </p>
          </div>

          {/* 1. Information We Collect */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-[#22395f] p-2">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-[#22395f] sm:text-xl">1. Information We Collect</h2>
            </div>
            <p className="mb-3 text-gray-700">
              When you fill out a form on our website, book an appointment, or contact us, we collect the following details:
            </p>
            <ul className="mb-6 grid grid-cols-1 gap-2 text-gray-800 sm:grid-cols-2">
              {[
                "Full Name",
                "Mobile Number",
                "Email Address",
                "Pincode / Location",
                "Health concerns and medical history",
                "Appointment preferences",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#22395f]"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 2. How We Use Your Information */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-[#22395f] p-2">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-[#22395f] sm:text-xl">2. How We Use Your Information</h2>
            </div>
            <p className="mb-3 text-gray-700">We use your information to:</p>
            <ul className="mb-6 space-y-3 text-gray-800">
              {[
                "Contact you regarding your inquiry or appointment.",
                "Provide personalized treatment recommendations and solutions.",
                "Schedule and manage your appointments at our clinic.",
                "Send important health updates or information about our services (only with your consent).",
                "Improve our services and enhance your patient experience.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Data Protection & Security */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-[#22395f] p-2">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-[#22395f] sm:text-xl">3. Data Protection &amp; Security</h2>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 sm:p-5">
              <p className="text-gray-700">
                We implement strict security measures to protect your personal and health information from unauthorized
                access, misuse, or disclosure. Your information is stored securely and is{" "}
                <strong>never shared or sold</strong> to third parties without your explicit consent, except as required by
                law.
              </p>
            </div>
          </div>

          {/* 4. Your Rights & Choices */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-[#22395f] p-2">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-[#22395f] sm:text-xl">4. Your Rights &amp; Choices</h2>
            </div>
            <p className="mb-3 text-gray-700">You have the right to:</p>
            <ul className="mb-6 grid grid-cols-1 gap-3 text-gray-800 sm:grid-cols-2">
              {[
                "Request access to your health and personal data.",
                "Correct or update your information.",
                "Request deletion of your personal information.",
                "Opt out of promotional communications.",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 rounded-md bg-gray-50 p-3">
                  <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#22395f]"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Contact Us */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-[#22395f] p-2">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-[#22395f] sm:text-xl">5. Contact Us</h2>
            </div>
            <p className="mb-4 text-gray-700">
              For any questions or concerns about your privacy, or to exercise your rights regarding your personal data,
              please reach out to us at:
            </p>

            <div className="mb-6 rounded-lg bg-gray-50 p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-full bg-[#22395f] p-2">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold text-black">+91 86085 51555</span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-full bg-[#22395f] p-2">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <a href="mailto:reshapeclinic01@gmail.com" className="text-gray-700 hover:text-[#22395f]">
                  reshapeclinic01@gmail.com
                </a>
              </div>

              <div className="mb-3 flex items-start gap-3">
                <div className="rounded-full bg-[#22395f] p-2">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-700">
                  No: 149, No: 1 Luz Church Road, Bhaskarapuram, Mylapore, Chennai - 600004
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#22395f] p-2">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-700">Mon – Sun: 10:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="border-t pt-6">
            <p className="text-center text-sm text-gray-600">
              By using our website and services, you agree to this Privacy Policy. We may update it from time to time, so
              please check back periodically for any changes.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default PrivacyPolicy
