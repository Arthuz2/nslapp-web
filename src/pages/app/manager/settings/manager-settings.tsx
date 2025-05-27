import { Database, Lock, Save, Settings, Shield } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function ManagerSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [autoBackup, setAutoBackup] = useState(true)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-gray-600 to-blue-600">
          <Settings className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Configurações do Sistema</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações gerais da instituição
          </p>
        </div>
      </div>

      <Tabs defaultValue="security" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Segurança</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Sistema</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configurações de Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Senha Atual</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button>
                  <Lock className="mr-2 h-4 w-4" />
                  Alterar Senha
                </Button>
              </div>
              <Separator />
              <div className="space-y-4">
                <Label>Políticas de Senha</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="minLength" defaultChecked />
                    <Label htmlFor="minLength">Mínimo 8 caracteres</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="uppercase" defaultChecked />
                    <Label htmlFor="uppercase">
                      Pelo menos 1 letra maiúscula
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="numbers" defaultChecked />
                    <Label htmlFor="numbers">Pelo menos 1 número</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="symbols" />
                    <Label htmlFor="symbols">
                      Pelo menos 1 símbolo especial
                    </Label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <Label>Configurações de Sessão</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">
                      Timeout da Sessão (minutos)
                    </Label>
                    <Input id="sessionTimeout" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxSessions">
                      Máximo de Sessões Simultâneas
                    </Label>
                    <Input id="maxSessions" defaultValue="3" />
                  </div>
                </div>
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Configurações do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Modo de Manutenção</Label>
                  <p className="text-muted-foreground text-sm">
                    Ativar para realizar manutenções no sistema
                  </p>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Backup Automático</Label>
                  <p className="text-muted-foreground text-sm">
                    Realizar backup automático dos dados diariamente
                  </p>
                </div>
                <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
              </div>
              <Separator />
              <div className="space-y-4">
                <Label>Configurações de Backup</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="backupTime">Horário do Backup</Label>
                    <Input id="backupTime" type="time" defaultValue="02:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retentionDays">Retenção (dias)</Label>
                    <Input id="retentionDays" defaultValue="30" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <Label>Logs do Sistema</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="logLevel">Nível de Log</Label>
                    <Select defaultValue="info">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="error">Error</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="debug">Debug</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logRetention">
                      Retenção de Logs (dias)
                    </Label>
                    <Input id="logRetention" defaultValue="90" />
                  </div>
                </div>
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
