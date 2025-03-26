import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


interface StatsChartsProps {
  users: any[];
}

export function StatsCharts({ users }: StatsChartsProps) {

  const userActivityData = users.map(user => ({
    name: `${user.surname} ${user.lastName}`,
    // uploads: user.data.length,
    // translations: user.translations.length,
  }));


  const roleDistribution = users.reduce((acc: { name: string; value: number }[], user) => {
    const roleIndex = acc.findIndex(item => item.name === user.role);
    if (roleIndex === -1) {
      acc.push({ name: user.role, value: 1 });
    } else {
      acc[roleIndex].value += 1;
    }
    return acc;
  }, []);

  const COLORS = ['#008751', '#FCD116', '#CE1126'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Activite des Utilisateurs</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userActivityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uploads" fill="#008751" name="Uploads" />
            <Bar dataKey="translations" fill="#FCD116" name="Translations" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Distribution des Roles</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={roleDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {roleDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}