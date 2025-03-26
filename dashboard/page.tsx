"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { StatsCard } from "@/components/admin/StatCard";
import { StatsCharts } from "@/components/admin/StatsChart";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Data, User } from "@prisma/client";
import {
  CrownIcon,
  FlameIcon,
  UserPlusIcon,
  UsersIcon,
  UserXIcon,
} from "lucide-react";
import { TranslationCharts } from "@/components/admin/TranslationChart";
import { getAudioDuration } from "@/components/admin/TotalAudioDuration";
import { TimerDisplay } from "@/components/admin/Timer";

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [translations, setTranslations] = useState<Data[]>([]);
  const pathname = usePathname();
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [hasUpdated, setHasUpdated] = useState(false);
  const [totalAudioSeconds, setTotalAudioSeconds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    fetchUsers();
    fetchTranslations();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchTranslations = async () => {
    try {
      const response = await fetch("/api/data");
      if (!response.ok) throw new Error("Failed to fetch translations");
      const result = await response.json();
      setTranslations(result);
      const durations = await Promise.all(
        result.map(
          (item: any) =>
            new Promise((resolve) => {
              const audio = new Audio(item.audio);
              audio.addEventListener("loadedmetadata", () => {
                resolve(audio.duration || 0);
              });
              audio.addEventListener("error", () => {
                resolve(0);
              });
            })
        )
      );

      const total = durations.reduce((acc, curr) => acc + curr, 0);
      setTotalDuration(total);
    } catch (error) {}
  };

  const totalUsers = users.length;

  const newUsersThisMonth = users.filter((user) =>
    dayjs(user.createdAt).isAfter(dayjs().startOf("month"))
  ).length;

  const contributorIds = translations.flatMap((t) => t.contributorIds || []);

  const activeContributors = users.filter((user) =>
    contributorIds.includes(user.id)
  );

  const usersWithoutContributions = users.filter(
    (user) => !contributorIds.includes(user.id)
  );

  const contributionsCount: Record<string, number> = {};
  contributorIds.forEach((id) => {
    contributionsCount[id] = (contributionsCount[id] || 0) + 1;
  });

  

  const sortedContributors = Object.entries(contributionsCount)
  .sort((a, b) => b[1] - a[1]); 


const topContributors = sortedContributors.slice(0, 3).map(getContributorInfo);

const bottomContributors = sortedContributors
  .slice(-3) 
  .map(getContributorInfo);

function getContributorInfo([userId, contributions]: [string, number]) {
  const user = users.find((u) => u.id === userId);
  return {
    id: userId,
    name: user ? `${user.surname} ${user.lastName || ""}`.trim() : "Utilisateur supprimé",
    email: user?.email || "N/A",
    contributions,
  };
}


  const totalTranslations = translations.length;

  const translationsThisMonth = translations.filter((t) =>
    dayjs(t.createdAt).isAfter(dayjs().startOf("month"))
  ).length;

  const pendingTranslations = translations.filter(
    (t) => !t.bambara && !t.nko && !t.frenbam && !t.english
  ).length;

  const languageCounts = {
    bambara: translations.filter((t) => t.bambara).length,
    nko: translations.filter((t) => t.nko).length,
    frenbam: translations.filter((t) => t.frenbam).length,
    english: translations.filter((t) => t.english).length,
  };

  const averageContributions = translations.length
    ? (
        translations.reduce(
          (total, t) => total + (t.contributorIds?.length || 0),
          0
        ) / translations.length
      ).toFixed(2)
    : 0;

  return (
    <div className="mt-1">
      <div className="grid grid-cols-4 gap-2">
        <StatsCard
          title="Total Utilisateurs"
          value={totalUsers}
          icon={<UsersIcon />}
          color="#1d75bc"
          bgColor="#e0e7ff"
        />
        <StatsCard
          title="Nouveaux Utilisateurs"
          value={newUsersThisMonth}
          icon={<UserPlusIcon />}
          color="green"
          bgColor="#e6f9ff"
        />
        <StatsCard
          title="Contributeurs Actifs ce Mois"
          value={activeContributors.length}
          icon={<FlameIcon />}
          color="#FCD116"
          bgColor="#fff9e6"
        />
        <StatsCard
          title="Utilsateurs sans Contributions"
          value={usersWithoutContributions.length}
          icon={<UserXIcon />}
          color="red"
          bgColor="#ffebee"
        />
      </div>
      <div className=" w-full flex gap-2 mt-1">
        <div className="mt-3 max-w-xs w-full p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex  justify-center items-center gap-2">
            <CrownIcon className="text-yellow-500" /> Meilleurs Contributions
          </h2>
          {topContributors.length > 0 ? (
            <ul className="space-y-3">
              {topContributors.map((contributor, index) => {
                const medals = ["🥇", "🥈", "🥉"];
                return (
                  <li key={index} className="flex justify-between items-center">
                    <span className="flex items-center gap-2 font-medium">
                      {medals[index] || `${index + 1}.`}
                      {contributor.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      {contributor.contributions} contributions
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500">Aucun contributeur pour le moment.</p>
          )}
        </div>
        <TimerDisplay totalSeconds={totalDuration} />
        <div className="mt-3 max-w-xs w-full p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex  justify-center items-center gap-2">
            <CrownIcon className="text-yellow-500" /> Mauvais Contributions
          </h2>
          {bottomContributors.length > 0 ? (
            <ul className="space-y-3">
              {bottomContributors.map((contributor, index) => {
                const medals = ["🥇", "🥈", "🥉"];
                return (
                  <li key={index} className="flex justify-between items-center">
                    <span className="flex items-center gap-2 font-medium">
                      {medals[index] || `${index + 1}.`}
                      {contributor.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      {contributor.contributions} contributions
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500">Aucun contributeur pour le moment.</p>
          )}
        </div>
      </div>
      <TranslationCharts
        total={totalTranslations}
        monthCount={translationsThisMonth}
        pending={pendingTranslations}
        languageCounts={languageCounts}
        averageContributions={averageContributions}
      />
    </div>
  );
};

export default AdminDashboard;
