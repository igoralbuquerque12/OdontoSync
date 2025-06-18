import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft, AlertTriangle, Phone, Mail } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto p-6 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-4xl">
                    <Card className="border-[#003566]/20 shadow-lg overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-[#003566]/5 to-[#003566]/10 text-center py-12">
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <div className="w-24 h-24 bg-[#003566] rounded-full flex items-center justify-center">
                                        <span className="text-4xl font-bold text-white">404</span>
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                        <AlertTriangle className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>

                            <CardTitle className="text-3xl text-[#003566] mb-4">Oops! Página não encontrada</CardTitle>
                            <p className="text-gray-600 text-lg max-w-md mx-auto">
                                A página que você está procurando pode ter sido removida, renomeada ou está temporariamente
                                indisponível.
                            </p>
                        </CardHeader>

                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">O que você pode fazer:</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                            <div className="w-2 h-2 bg-[#003566] rounded-full mt-2"></div>
                                            <div>
                                                <p className="font-medium text-gray-800">Verificar o endereço</p>
                                                <p className="text-sm text-gray-600">Certifique-se de que a URL foi digitada corretamente</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                            <div className="w-2 h-2 bg-[#003566] rounded-full mt-2"></div>
                                            <div>
                                                <p className="font-medium text-gray-800">Voltar à página anterior</p>
                                                <p className="text-sm text-gray-600">Use o botão voltar do seu navegador</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                            <div className="w-2 h-2 bg-[#003566] rounded-full mt-2"></div>
                                            <div>
                                                <p className="font-medium text-gray-800">Ir para a página inicial</p>
                                                <p className="text-sm text-gray-600">Acesse o menu principal do sistema</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                        <Button
                                            onClick={() => navigate(-1)}
                                            variant="outline"
                                            className="flex-1 border-[#003566]/30 text-[#003566] hover:bg-[#003566] hover:text-white"
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Voltar
                                        </Button>
                                        <Button onClick={() => navigate("/")} className="flex-1 bg-[#003566] text-amber-50 hover:bg-[#003566]/90">
                                            <Home className="w-4 h-4 mr-2" />
                                            Página Inicial
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Precisa de ajuda?</h3>

                                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                        <p className="text-gray-600 mb-4">
                                            Se você continuar tendo problemas, nossa equipe de suporte está pronta para ajudar.
                                        </p>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-sm">
                                                <Phone className="w-4 h-4 text-[#003566]" />
                                                <span className="text-gray-600">Telefone:</span>
                                                <span className="font-medium">(38) 98813-9630</span>
                                            </div>

                                            <div className="flex items-center gap-3 text-sm">
                                                <Mail className="w-4 h-4 text-[#003566]" />
                                                <span className="text-gray-600">E-mail:</span>
                                                <span className="font-medium">suporteodontosync@gmail.com</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-sm text-gray-500">Sistema OdontoSync</p>
                                        <p className="text-xs text-gray-400 mt-1">Versão 1.0 - © 2025</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}