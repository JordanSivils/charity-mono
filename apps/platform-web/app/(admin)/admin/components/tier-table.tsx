import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TierType } from "@/lib/actions/tier/tier-types"

interface CoumnDef<T> {
  key: keyof T
  label: string
  sortable: boolean
}

const columns: CoumnDef<TierType>[] = [
  { key: "name", label: "Name", sortable: false},
  { key: "dailyLimit", label: "Daily Request Limit", sortable: false},
  { key: "resultLimit", label: "Standard Result Limit", sortable: false},
  { key: "nearbyRadiusMaxMiles", label: "Max Radius", sortable: false},
  { key: "nearbyResultLimit", label: "Nearby Result Limit", sortable: false},
]

interface TierTableProps {
  tiers: TierType[]
}
export function TierTable({ tiers }: TierTableProps) {
    return (
    <Card>
        <CardContent>
            <div className='space-y-4'>
                <div className='relative'>
                    <Table className='relative'>
                    <TableHeader>
                        <TableRow>
                        {columns.map((column) => (
                            <TableHead
                            key={String(column.key)}
                            >
                            <div className='flex items-center gap-2'>
                                {column.label}
                            </div>
                            </TableHead>
                        ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tiers.length === 0 ? (
                        <TableRow>
                                <TableCell>No Data to show.</TableCell>
                            </TableRow>
                        ) : (
                        tiers.map((tier) => (
                            <TableRow key={tier.id}>
                                <TableCell>{tier.name}</TableCell>
                                <TableCell>{tier.dailyLimit}</TableCell>
                                <TableCell>{tier.resultLimit}</TableCell>
                                <TableCell>{tier.nearbyRadiusMaxMiles}</TableCell>
                                <TableCell>{tier.nearbyResultLimit}</TableCell>
                            </TableRow>
                            )
                        )
                        )}
                    </TableBody>
                    </Table>
                </div>
                </div>
        </CardContent>
    </Card>
    
  )
}