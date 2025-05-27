import {
  BookOpen,
  Download,
  Edit,
  Eye,
  FileText,
  FolderOpen,
  ImageIcon,
  MoreHorizontal,
  Search,
  Share,
  Trash2,
  Upload,
  Users,
  Video,
} from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

interface Material {
  id: string
  name: string
  type: 'document' | 'image' | 'video' | 'presentation' | 'audio'
  subject: string
  class: string[]
  size: string
  uploadDate: string
  downloads: number
  shared: boolean
  description: string
}

const mockMaterials: Material[] = [
  {
    id: '1',
    name: 'Exercícios de Álgebra Linear.pdf',
    type: 'document',
    subject: 'Matemática',
    class: ['9º A', '9º B'],
    size: '2.5 MB',
    uploadDate: '2024-01-10',
    downloads: 45,
    shared: true,
    description: 'Lista de exercícios sobre álgebra linear com gabarito',
  },
  {
    id: '2',
    name: 'Revolução Industrial - Slides.pptx',
    type: 'presentation',
    subject: 'História',
    class: ['8º A', '8º B'],
    size: '15.2 MB',
    uploadDate: '2024-01-12',
    downloads: 32,
    shared: true,
    description: 'Apresentação sobre a Revolução Industrial',
  },
  {
    id: '3',
    name: 'Sistema Digestório - Vídeo.mp4',
    type: 'video',
    subject: 'Ciências',
    class: ['7º C'],
    size: '125 MB',
    uploadDate: '2024-01-15',
    downloads: 28,
    shared: false,
    description: 'Vídeo explicativo sobre o sistema digestório humano',
  },
]

const typeIcons = {
  document: FileText,
  image: ImageIcon,
  video: Video,
  presentation: FileText,
  audio: FileText,
}

const typeColors = {
  document: 'bg-blue-100 text-blue-800',
  image: 'bg-green-100 text-green-800',
  video: 'bg-purple-100 text-purple-800',
  presentation: 'bg-orange-100 text-orange-800',
  audio: 'bg-pink-100 text-pink-800',
}

const typeLabels = {
  document: 'Documento',
  image: 'Imagem',
  video: 'Vídeo',
  presentation: 'Apresentação',
  audio: 'Áudio',
}

export function TeacherMaterials() {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject =
      selectedSubject === 'all' || material.subject === selectedSubject
    const matchesType = selectedType === 'all' || material.type === selectedType

    return matchesSearch && matchesSubject && matchesType
  })

  const subjects = Array.from(
    new Set(materials.map((material) => material.subject)),
  )

  const totalMaterials = materials.length
  const totalDownloads = materials.reduce(
    (sum, material) => sum + material.downloads,
    0,
  )
  const sharedMaterials = materials.filter((material) => material.shared).length
  const totalSize = materials.reduce((sum, material) => {
    const size = Number.parseFloat(material.size)
    return sum + (material.size.includes('GB') ? size * 1024 : size)
  }, 0)

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Materiais
            </CardTitle>
            <FolderOpen className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMaterials}</div>
            <p className="text-muted-foreground text-xs">
              Arquivos disponíveis
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDownloads}</div>
            <p className="text-muted-foreground text-xs">Total de downloads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Compartilhados
            </CardTitle>
            <Share className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sharedMaterials}</div>
            <p className="text-muted-foreground text-xs">Materiais públicos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Espaço Usado</CardTitle>
            <BookOpen className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSize.toFixed(1)} MB</div>
            <p className="text-muted-foreground text-xs">De 1 GB disponível</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="library" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="library">Biblioteca</TabsTrigger>
            <TabsTrigger value="shared">Compartilhados</TabsTrigger>
            <TabsTrigger value="recent">Recentes</TabsTrigger>
          </TabsList>

          <Dialog
            open={isUploadDialogOpen}
            onOpenChange={setIsUploadDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Material
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload de Material</DialogTitle>
                <DialogDescription>
                  Faça upload de um novo material didático
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="file">Arquivo</Label>
                  <Input id="file" type="file" />
                  <p className="text-muted-foreground text-sm">
                    Formatos aceitos: PDF, DOC, PPT, MP4, MP3, JPG, PNG (máx.
                    100MB)
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Disciplina</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a disciplina" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="matematica">Matemática</SelectItem>
                        <SelectItem value="portugues">Português</SelectItem>
                        <SelectItem value="historia">História</SelectItem>
                        <SelectItem value="ciencias">Ciências</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="classes">Turmas</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione as turmas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9a">9º A</SelectItem>
                        <SelectItem value="9b">9º B</SelectItem>
                        <SelectItem value="8a">8º A</SelectItem>
                        <SelectItem value="8b">8º B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o conteúdo do material..."
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="shared" />
                  <Label htmlFor="shared">
                    Compartilhar com outros professores
                  </Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsUploadDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={() => setIsUploadDialogOpen(false)}>
                  Fazer Upload
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="library" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                    <Input
                      placeholder="Buscar materiais..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as disciplinas</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="document">Documento</SelectItem>
                    <SelectItem value="presentation">Apresentação</SelectItem>
                    <SelectItem value="video">Vídeo</SelectItem>
                    <SelectItem value="image">Imagem</SelectItem>
                    <SelectItem value="audio">Áudio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Materials Table */}
          <Card>
            <CardHeader>
              <CardTitle>Meus Materiais</CardTitle>
              <CardDescription>
                Todos os seus materiais didáticos organizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Disciplina</TableHead>
                    <TableHead>Turmas</TableHead>
                    <TableHead>Tamanho</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMaterials.map((material) => {
                    const IconComponent = typeIcons[material.type]
                    return (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <IconComponent className="h-4 w-4" />
                            <span>{material.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={typeColors[material.type]}>
                            {typeLabels[material.type]}
                          </Badge>
                        </TableCell>
                        <TableCell>{material.subject}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {material.class.map((cls) => (
                              <Badge
                                key={cls}
                                variant="outline"
                                className="text-xs"
                              >
                                {cls}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{material.size}</TableCell>
                        <TableCell>{material.downloads}</TableCell>
                        <TableCell>
                          {material.shared ? (
                            <Badge className="bg-green-100 text-green-800">
                              Compartilhado
                            </Badge>
                          ) : (
                            <Badge variant="outline">Privado</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Visualizar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share className="mr-2 h-4 w-4" />
                                Compartilhar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shared" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Materiais Compartilhados</CardTitle>
              <CardDescription>
                Materiais compartilhados por outros professores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground py-8 text-center">
                <Users className="mx-auto mb-4 h-12 w-12" />
                <p>Nenhum material compartilhado encontrado</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Materiais Recentes</CardTitle>
              <CardDescription>Seus uploads mais recentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materials.slice(0, 3).map((material) => {
                  const IconComponent = typeIcons[material.type]
                  return (
                    <div
                      key={material.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="text-muted-foreground h-8 w-8" />
                        <div>
                          <p className="font-medium">{material.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {material.subject} •{' '}
                            {new Date(material.uploadDate).toLocaleDateString(
                              'pt-BR',
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={typeColors[material.type]}>
                          {typeLabels[material.type]}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
