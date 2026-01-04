const Features = () => (
  <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
    {[
      "Dual-Intelligence: Online + Offline",
      "Mission-specific ISRO training",
      "Offline capability via JSON",
      "Real-time chat interface",
      "Logs for learning & growth",
      "API accessible",
      "Lightweight & deployable",
    ].map((feature, idx) => (
      <div key={idx} className="p-4 border rounded shadow hover:shadow-lg transition">
        <h4 className="text-lg font-medium">{feature}</h4>
      </div>
    ))}
  </div>
);
export default Features;
