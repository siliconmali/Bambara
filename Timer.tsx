"use client";

import { Card, Statistic } from "antd";
import {
  CalendarOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import { Timer, Watch } from "lucide-react";

interface TimerDisplayProps {
  totalSeconds: number;
}

export function TimerDisplay({ totalSeconds }: TimerDisplayProps) {
  const time = {
    days: Math.floor(totalSeconds / (24 * 60 * 60)),
    hours: Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60)),
    minutes: Math.floor((totalSeconds % (60 * 60)) / 60),
    seconds: Math.floor(totalSeconds % 60),
  };

  const timeUnits = [
    { value: time.days, label: "Jours", icon: <CalendarOutlined /> },
    { value: time.hours, label: "Heures", icon: <HourglassOutlined /> },
    { value: time.minutes, label: "Minutes", icon: <Timer /> },
    { value: time.seconds, label: "Secondes", icon: <Watch /> },
  ];

  return (
    <div className="w-full max-w-xl mx-auto p-3 ">
      <h2 className="text-2xl font-bold text-center mb-2">
        Duration de tous les fichiers 
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {timeUnits.map((unit) => (
          <Card
            key={unit.label}
            className="text-center hover:shadow-lg transition-shadow duration-300"
            bordered={false}
          >
            <Statistic
              title={unit.label}
              value={unit.value}
              prefix={unit.icon}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
