import { Badge } from "@/components/ui/badge"

interface StatsBadgesProps {
  library: {
    name: string
  }
}

export default function StatsBadges({ library }: StatsBadgesProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="outline">Platform: iOS & Android</Badge>
      <Badge variant="outline">Web Support</Badge>
      <Badge variant="outline">TypeScript</Badge>
      <Badge variant="outline">Maintained</Badge>
    </div>
  )
}
