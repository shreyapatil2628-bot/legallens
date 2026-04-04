export default function RiskMeter({ score }) {
  const getColor = () => {
    if (score >= 7) return "bg-red-500";
    if (score >= 4) return "bg-orange-500";
    return "bg-green-500";
  };

  const getLabel = () => {
    if (score >= 7) return { text: "HIGH RISK", color: "text-red-400" };
    if (score >= 4) return { text: "MEDIUM RISK", color: "text-orange-400" };
    return { text: "LOW RISK", color: "text-green-400" };
  };

  const { text, color } = getLabel();
  const percent = (score / 10) * 100;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 mb-4">
      <h3 className="font-bold text-white mb-3 flex items-center gap-2">
        🎯 Overall Risk Score
      </h3>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className={`${getColor()} h-4 rounded-full transition-all duration-1000`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-white">{score}/10</span>
          <p className={`text-xs font-bold ${color}`}>{text}</p>
        </div>
      </div>
    </div>
  );
}