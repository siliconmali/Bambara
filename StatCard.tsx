import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string; // Hex code or Tailwind color code like "#4F46E5"
  bgColor?: string; // Background color, also passed as code
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color = "#4F46E5", 
  bgColor = "#E0E7FF", 
}) => {
  return (
    <div className="flex items-center p-2 shadow rounded-lg bg-light-default">
      <div
        className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 rounded-full mr-6"
        style={{
          color: color,
          backgroundColor: bgColor,
        }}
      >
        {icon}
      </div>
      <div>
        <span className="block text-2xl font-bold" style={{color: color}}>{value}</span>
        <span className="block text-content-tertiary">{title}</span>
      </div>
    </div>
  );
};