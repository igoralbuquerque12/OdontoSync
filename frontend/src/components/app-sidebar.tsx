import { Calendar, Calendar1, User, ChartLine, Box, Search, UserPlus, Package, PlusCircle, FolderPen, ChartPie } from 'lucide-react'
import { addDays } from 'date-fns'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


const daysOfWeek = [
  'Domingo',       // 0
  'Segunda-feira', // 1
  'Terça-feira',   // 2
  'Quarta-feira',  // 3
  'Quinta-feira',  // 4
  'Sexta-feira',   // 5
  'Sábado'         // 6
];

// get the next five days (include today)                                                                                                                                                                                                                                                                                                                  
function getNextFiveDays() {
  const today = new Date();  
  const utilDays = [];       

  let count: number = 0;     

  for (let i = 1; count < 5; i++) {
    const day = addDays(today, i);  
    const dayWeek = day.getDay();  

    if ((dayWeek !== 0) && (dayWeek !== 6)) {
      utilDays.push({ title: `Dia ${day.getDate()}, ${daysOfWeek[dayWeek]}`, url: `#`, icon: FolderPen });
      count++;  
    }
  }

  return utilDays;  
}


const items = [
  {
    title: "Calendário",
    icon: Calendar,
    subItems: getNextFiveDays()
  },
  {
    title: "Relatórios e Estatísticas",
    url: "#",
    icon: ChartLine,
    subItems: [
      { title: "Visualizar semana", url: "#visualizar-semana", icon: ChartPie },
      { title: "Visualizar mês", url: "#visualizar-mes", icon: Calendar1 },
    ]
  },
  {
    title: "Pacientes",
    icon: User,
    subItems: [
      { title: "Buscar", url: "#buscar", icon: Search },
      { title: "Cadastrar", url: "/pacientes/cadastrar/", icon: UserPlus },
    ]
  },
  {
    title: "Materiais",
    icon: Box,
    subItems: [
      { title: "Estoque", url: "#estoque", icon: Package },
      { title: "Adicionar Novo Item", url: "#adicionar", icon: PlusCircle },
    ]
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="py-5 px-3 text-2xl font-bold">OdontoSync</SidebarGroupLabel>
          <SidebarGroupContent className="pt-6">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="flex flex-col py-1 ">
                  <SidebarMenuButton asChild className="text-lg font-medium hover:bg-accent">
                    <a href={item.url} className="flex items-center gap-2 p-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  
                  {item.subItems && (
                    <div className="ml-6 flex flex-col space-y-1">
                      {item.subItems.map((subItem) => (
                        <SidebarMenuButton key={subItem.title} asChild className="text-base hover:bg-accent/50">
                          <a href={subItem.url} className="flex items-center gap-2 p-2 hover:font-medium">
                            {subItem.icon && <subItem.icon className="h-4 w-4" />}
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
