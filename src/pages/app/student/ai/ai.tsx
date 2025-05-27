import { Bot, Send } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: '1',
    content:
      'Olá! 👋 Sou sua assistente de estudos com IA. Posso te ajudar com dúvidas sobre qualquer disciplina escolar. Como posso te ajudar hoje?',
    sender: 'ai',
    timestamp: new Date(),
  },
]

export function AI() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(),
        sender: 'ai',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (): string => {
    return `Interessante pergunta! 🤔 Vou te ajudar com isso.\n\nPara dar uma resposta mais precisa, você poderia me contar:\n• 📚 Qual matéria específica?\n• 📝 É para uma prova ou trabalho?\n• 🎯 Qual sua maior dificuldade?\n\n💡 **Dicas gerais de estudo:**\n• Consulte seus materiais de estudo\n• Pratique com exercícios similares\n• Faça resumos e mapas mentais\n• Peça ajuda ao professor se necessário\n\nComo posso te ajudar de forma mais específica? 😊`
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="flex h-full flex-col space-y-4 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
          <Bot className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">
            Assistente de Estudos IA
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Tire suas dúvidas acadêmicas com inteligência artificial
          </p>
        </div>
      </div>

      {/* Chat */}
      <div className="min-h-0 flex-1">
        <Card className="flex h-[500px] flex-col lg:h-[600px]">
          <CardHeader className="border-b pb-3">
            <CardTitle className="flex items-center gap-2">
              <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
              <Bot className="h-5 w-5" />
              Assistente IA Online
            </CardTitle>
          </CardHeader>

          {/* Messages */}
          <CardContent className="min-h-0 flex-1 p-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-muted text-foreground border shadow-sm'
                      }`}
                    >
                      {message.sender === 'ai' && (
                        <div className="mb-2 flex items-center gap-2">
                          <Bot className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-600">
                            Assistente IA
                          </span>
                        </div>
                      )}
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </div>
                      <div
                        className={`mt-2 text-xs ${
                          message.sender === 'user'
                            ? 'text-blue-100'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted max-w-[85%] rounded-lg border p-3 shadow-sm">
                      <div className="mb-2 flex items-center gap-2">
                        <Bot className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-600">
                          Assistente IA
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-purple-600" />
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-purple-600"
                          style={{ animationDelay: '0.1s' }}
                        />
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-purple-600"
                          style={{ animationDelay: '0.2s' }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Digite sua pergunta sobre qualquer matéria..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage(inputValue)
                  }
                }}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 px-4 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground mt-2 text-xs">
              Pressione Enter para enviar • A IA pode cometer erros, sempre
              verifique informações importantes
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
