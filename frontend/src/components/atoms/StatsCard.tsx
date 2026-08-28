interface StatsCardProps {
  title: string;
  value: number;
}

const StatsCard = ({ title, value }: StatsCardProps) => {
  return (
    <div className="w-full max-w-70 flex flex-col gap-2 p-5 rounded-2xl border border-border-color shadow-sm transition-shadow hover:shadow-md">
      <p className="text-primary text-xs font-medium uppercase tracking-wide">{title}</p>
      <p className="text-muted text-4xl font-bold">{value}</p>
    </div>
  )
}

export default StatsCard