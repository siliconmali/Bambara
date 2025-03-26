"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface TranslationChartsProps {
  total: number;
  monthCount: number;
  pending: number;
  languageCounts: {
    bambara: number;
    nko: number;
    frenbam: number;
    english: number;
  };
  averageContributions: number | string;
}

export const TranslationCharts: React.FC<TranslationChartsProps> = ({
  total,
  monthCount,
  pending,
  languageCounts,
  averageContributions,
}) => {
  const languageData = [
    { name: "Bambara", value: languageCounts.bambara },
    { name: "N'Ko", value: languageCounts.nko },
    { name: "Français", value: languageCounts.frenbam },
    { name: "Anglais", value: languageCounts.english },
  ];
  const COLORS = ["#008751", "#FCD116", "#CE1126"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Traductions Générales</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={[
              { name: "Total", value: total },
              { name: "Ce Mois", value: monthCount },
              { name: "Incomplètes", value: pending },
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[5, 5, 0, 0]}>
              {[
                { name: "Total", value: total },
                { name: "Ce Mois", value: monthCount },
                { name: "Incomplètes", value: pending },
              ].map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Langues Traduites</h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={languageData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {languageData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
