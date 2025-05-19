import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function ExamsHeader() {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="border-input bg-input flex w-full items-center gap-1 rounded-md border px-1 not-md:hidden">
        <Search className="h-full w-5" />
        <Input
          placeholder="Pesquise por alguma prova"
          className="placeholder:text-muted-foreground border-0 bg-transparent p-1 text-base font-semibold focus-visible:ring-0 focus-visible:ring-offset-0"
          type="text"
        />
      </div>
      <Select>
        <SelectTrigger className="text-foreground border-input bg-input h-full w-[180px] rounded-md font-semibold">
          <SelectValue placeholder="Matérias" />
        </SelectTrigger>
        <SelectContent className="text-foreground font-semibold">
          <SelectItem value="1">Desenvolvimento de Sistemas</SelectItem>
          <SelectItem value="2">Matéria 2</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="text-foreground border-input bg-input h-full w-[180px] rounded-md font-semibold">
          <SelectValue placeholder="Professores" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="text-foreground font-semibold">
            <SelectItem value="1">Alex Menezes Pereira</SelectItem>
            <SelectItem value="2">Vânia Alves Santana</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
