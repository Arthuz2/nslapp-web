import { Filter } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function ExamsFilter() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <Input
              placeholder="Buscar por disciplina, professor ou tópico..."
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Disciplina" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="math">Matemática</SelectItem>
                <SelectItem value="history">História</SelectItem>
                <SelectItem value="portuguese">Português</SelectItem>
                <SelectItem value="biology">Biologia</SelectItem>
                <SelectItem value="physics">Física</SelectItem>
                <SelectItem value="chemistry">Química</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="available">Disponíveis</SelectItem>
                <SelectItem value="submitted">Enviadas</SelectItem>
                <SelectItem value="corrected">Corrigidas</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
