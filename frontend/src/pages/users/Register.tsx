import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterUser() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">OdontoSync</CardTitle>
          <CardDescription className="font-medium text-black-300">Digite seus dados para criar sua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" placeholder="Escreva seu nome completo" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Nome de Usuário</Label>
            <Input id="username" placeholder="Escolha um nome de usuário" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" placeholder="Defina uma senha" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" type="submit">
            Create Account
          </Button>
          <div className="flex text-center text-sm gap-0.5">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              <p className="font-">Acesse por aqui</p>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}