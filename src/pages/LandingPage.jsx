import React from "react";
import VadicaUI from "./VadicaUI"; // Optional, only import if used

const LandingPage = () => {
  return (
    <div>

      {/* Hero Section */}
      <div
        className="relative min-h-[500px] flex items-center justify-center bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('/banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative z-10 p-10 text-center text-white">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to Vadica</h1>
          <p className="text-lg max-w-3xl mx-auto">
            A mission-aware, dual-intelligence ISRO assistant built to offer real-time support even without internet connectivity.
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">What is Vadica?</h2>
        <p className=" text-lg">
          Vadica is an intelligent assistant developed to support ISRO’s operational, mission-critical environments. It combines advanced AI capabilities with offline access, ensuring you have access to critical information and assistance even in disconnected or restricted networks.
        </p>
      </section>

      {/* Features Section */}
      <section className="bg-surface py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary p-6 rounded shadow">
              <h3 className="text-xl font-bold mb-2">Offline Capability</h3>
              <p className="">
                Operates seamlessly without internet, ideal for remote mission zones or launch pads.
              </p>
            </div>
            <div className="bg-primary p-6 rounded shadow">
              <h3 className="text-xl font-bold mb-2">Mission Awareness</h3>
              <p className="">
                Context-aware AI tailored for specific ISRO missions, adapting its responses in real time.
              </p>
            </div>
            <div className="bg-primary p-6 rounded shadow">
              <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
              <p className="">
                Designed with security and reliability at its core to assist in high-stakes operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">Where Can Vadica Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h4 className="text-xl font-bold mb-2">Launch Control Rooms</h4>
            <p className="">
              Provide instant decision support and telemetry analysis during critical launch phases.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">Remote Satellite Stations</h4>
            <p className="">
              Aid technicians in diagnosing system issues without relying on remote servers.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">Mission Planning & Simulation</h4>
            <p className="">
              Offer intelligent recommendations and simulations for planning new satellite deployments.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">Educational Outreach</h4>
            <p className="">
              Engage students and trainees in ISRO’s learning modules using interactive AI responses.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-surface text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Experience the Power of Vadica</h2>
        <p className="max-w-2xl mx-auto mb-6 text-lg">
          Whether you’re working on the frontlines of space innovation or in a supporting role, Vadica ensures knowledge and support are always at your side.
        </p>
        <button className="mt-4 px-6 py-3 bg-white text-primary font-semibold rounded shadow hover:bg-gray-100 transition">
          Launch Vadica
        </button>
      </section>
    </div>
    // <VadicaUI/>
  );
};

export default LandingPage;
