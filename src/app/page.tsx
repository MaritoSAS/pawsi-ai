
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Heart, ShieldCheck, MapPin, AlertTriangle, TrendingUp, 
  Layers, Users, Share2, Globe, CheckCircle, ExternalLink,
  Activity, BarChart3, Fingerprint, Coins
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { predictiveAlertsForAnimalManagement } from '@/ai/flows/predictive-alerts-for-animal-management';

const MUNICIPALES_DATA = {
  "La Caldera": {
    poblacionEstimada: 1200,
    esterilizados: 62,
    casosAtendidos: 145,
    mapadeCalorColor: "rgba(239, 68, 68, 0.4)",
    animales: [
      { id: 1, nombre: "Luna", tipo: "Perra", edad: "2 años", foto: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80", estado: "En adopción" },
      { id: 2, nombre: "Oliver", tipo: "Gato", edad: "1 año", foto: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80", estado: "Apadrinado" }
    ]
  },
  "Vaqueros": {
    poblacionEstimada: 950,
    esterilizados: 74,
    casosAtendidos: 98,
    mapadeCalorColor: "rgba(245, 158, 11, 0.4)",
    animales: [
      { id: 3, nombre: "Roco", tipo: "Perro", edad: "3 años", foto: "https://images.unsplash.com/photo-1537151608828-ea2b117b6281?auto=format&fit=crop&w=400&q=80", estado: "En adopción" }
    ]
  },
  "Salta Capital": {
    poblacionEstimada: 8500,
    esterilizados: 48,
    casosAtendidos: 1240,
    mapadeCalorColor: "rgba(220, 38, 38, 0.5)",
    animales: [
      { id: 4, nombre: "Mía", tipo: "Gata", edad: "6 meses", foto: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&q=80", estado: "En adopción" },
      { id: 5, nombre: "Simón", tipo: "Perro", edad: "4 años", foto: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80", estado: "En adopción" }
    ]
  }
};

const TRANSACCIONES_STELLAR = [
  { id: "tx_1", donante: "Gómez, María", monto: "150 XLM", destino: "Tratamiento Luna - La Caldera", hash: "GA5W...3R4Q", estado: "Verificado" },
  { id: "tx_2", donante: "Fernández, Juan", monto: "300 XLM", destino: "Campaña Castración Vaqueros", hash: "GC8K...9P1M", estado: "Verificado" },
  { id: "tx_3", donante: "Fundación Puna", monto: "1200 XLM", destino: "Licenciamiento Tecnológico Fucolla", hash: "GD2X...7L2N", estado: "Verificado" }
];

export default function App() {
  const [municipio, setMunicipio] = useState<keyof typeof MUNICIPALES_DATA>("La Caldera");
  const [aiAlert, setAiAlert] = useState<string>("Generando alerta predictiva...");
  const [loadingAlert, setLoadingAlert] = useState(false);

  const dataActual = MUNICIPALES_DATA[municipio];

  useEffect(() => {
    async function fetchAlert() {
      setLoadingAlert(true);
      try {
        const result = await predictiveAlertsForAnimalManagement({
          municipio,
          poblacionEstimada: dataActual.poblacionEstimada,
          esterilizados: `${dataActual.esterilizados}%`,
          casosAtendidos: dataActual.casosAtendidos
        });
        setAiAlert(result.alert);
      } catch (error) {
        setAiAlert("No se pudo generar la alerta en este momento.");
      } finally {
        setLoadingAlert(false);
      }
    }
    fetchAlert();
  }, [municipio, dataActual]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* 1. GLOBAL HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none flex items-center justify-end">
          <img src="/logo-fucolla.png" alt="" className="h-full w-auto object-contain" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img src="/logo-pawsi.png" alt="Pawsi AI" className="h-12 w-auto" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">Pawsi AI</h1>
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Desarrollado por ONG Fucolla</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-slate-50 border border-border px-3 py-1.5 rounded-xl transition-all hover:border-primary/50 w-full sm:w-auto">
              <MapPin className="w-4 h-4 text-primary" />
              <Select value={municipio} onValueChange={(val) => setMunicipio(val as any)}>
                <SelectTrigger className="border-none bg-transparent focus:ring-0 w-[180px] font-semibold text-sm">
                  <SelectValue placeholder="Seleccionar Municipio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="La Caldera">La Caldera</SelectItem>
                  <SelectItem value="Vaqueros">Vaqueros</SelectItem>
                  <SelectItem value="Salta Capital">Salta Capital</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12 flex-1">
        
        {/* SDG IMPACT SECTION */}
        <section className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-8 lg:p-12 shadow-2xl min-h-[400px]">
          <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-end">
            <img src="/logo-fucolla.png" alt="Fucolla" className="h-full w-auto object-contain opacity-20" />
          </div>
          <div className="relative z-10 space-y-8">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1 font-bold tracking-[0.1em] uppercase">
                Agenda 2030 Global Goals
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-headline">
                Plataforma de Impacto Sostenible Homologada
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Transformando la gestión animal en políticas públicas medibles con trazabilidad financiera absoluta en la Provincia de Salta.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { n: "3", color: "#4C9F38", title: "Salud y Bienestar", desc: "Mitigación de enfermedades zoonóticas mediante automatización de campañas." },
                { n: "11", color: "#F99D1C", title: "Ciudades Sostenibles", desc: "Espacios públicos seguros reduciendo incidentes de fauna urbana sin control." },
                { n: "17", color: "#1F436A", title: "Alianzas Estratégicas", desc: "Alianza público-privada entre municipios, Blockchain y ONG Fucolla." }
              ].map((goal) => (
                <div key={goal.n} className="bg-white/5 border border-white/10 p-6 rounded-2xl group hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <span style={{ backgroundColor: goal.color }} className="w-10 h-10 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                      {goal.n}
                    </span>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">{goal.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{goal.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MUNICIPAL CONTROL PANEL */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-border/60 shadow-xl rounded-[2rem] overflow-hidden">
            <CardHeader className="border-b bg-slate-50/50">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-headline">Panel Territorial (Pawsi Maps AI)</CardTitle>
                  <CardDescription>Métricas de densidad y capacidad operativa municipal</CardDescription>
                </div>
                <Badge variant="outline" className="animate-pulse bg-primary/5 text-primary border-primary/20">
                  IA Activa • ODS 11
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Simulated Heatmap */}
              <div className="aspect-[21/9] bg-slate-900 rounded-[1.5rem] relative overflow-hidden group shadow-inner">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px]"></div>
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 rounded-full blur-[60px] opacity-60"
                  style={{
                    width: '60%', height: '80%', 
                    backgroundColor: dataActual.mapadeCalorColor
                  }}
                ></div>
                <div className="relative h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                  <span className="text-[10px] font-bold text-primary bg-primary/20 px-3 py-1 rounded-full uppercase tracking-widest border border-primary/30">Capa de Densidad Geográfica</span>
                  <h3 className="text-3xl font-bold text-white font-headline">Jurisdicción: {municipio}</h3>
                  <p className="text-slate-400 text-sm font-medium">Análisis de calor actualizado hace 5 minutos</p>
                </div>
              </div>

              {/* Real-time Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:bg-white hover:shadow-md transition-all group">
                  <Users className="w-5 h-5 mx-auto mb-3 text-slate-400 group-hover:text-primary transition-colors" />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Censo Estimado</p>
                  <p className="text-3xl font-bold text-slate-900 font-headline">{dataActual.poblacionEstimada.toLocaleString()}</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:bg-white hover:shadow-md transition-all group">
                  <Activity className="w-5 h-5 mx-auto mb-3 text-slate-400 group-hover:text-primary transition-colors" />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Esterilizados</p>
                  <p className="text-3xl font-bold text-emerald-600 font-headline">{dataActual.esterilizados}%</p>
                  <Progress value={dataActual.esterilizados} className="h-1 mt-3" />
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:bg-white hover:shadow-md transition-all group">
                  <BarChart3 className="w-5 h-5 mx-auto mb-3 text-slate-400 group-hover:text-primary transition-colors" />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Casos Atendidos</p>
                  <p className="text-3xl font-bold text-slate-900 font-headline">{dataActual.casosAtendidos}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI PREDICTIVE ALERTS */}
          <div className="flex flex-col gap-6">
            <Card className="bg-accent text-accent-foreground border-none shadow-2xl rounded-[2rem] flex-1 overflow-hidden relative">
              <div className="absolute bottom-0 right-0 p-4 opacity-5 pointer-events-none">
                <AlertTriangle className="w-32 h-32" />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg font-headline text-white">Alertas Predictivas IA</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl min-h-[160px] flex items-center">
                  <p className={`text-sm leading-relaxed text-slate-100 italic ${loadingAlert ? 'animate-pulse' : ''}`}>
                    "{aiAlert}"
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Foco de Impacto Prioritario</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-xs font-bold text-emerald-400">ODS 3 (Salud Colectiva)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-none rounded-[2rem] shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-white text-sm">Gobernanza Pawsi</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Este panel opera bajo protocolos de privacidad municipal. Todos los datos están anclados al historial inmutable de Arkiv Network.
              </p>
            </Card>
          </div>
        </section>

        {/* CITIZEN HUB: ADOPTION & SPONSORSHIP */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold font-headline">Módulo Ciudadano: Adopción y Apadrinazgo</h3>
              <p className="text-muted-foreground text-sm">Mostrando animales registrados bajo control municipal en {municipio}.</p>
            </div>
            <Button variant="outline" className="rounded-xl border-primary/20 hover:bg-primary/5 text-primary font-bold">
              Ver todos los registros
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dataActual.animales.map((anim) => (
              <div key={anim.id} className="group bg-white rounded-[2rem] border border-border overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={anim.foto} 
                    alt={anim.nombre} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-none font-bold text-[10px] shadow-lg py-1 px-3 rounded-full flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-primary" /> {municipio}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-primary text-white border-none font-bold py-1 px-3 rounded-full shadow-lg">
                      {anim.estado}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-2xl font-bold font-headline">{anim.nombre}</h4>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">{anim.tipo}</span>
                        <span className="text-sm font-bold">{anim.edad}</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-4 transition-colors hover:bg-primary/5 hover:border-primary/20 cursor-help">
                      <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
                        <Fingerprint className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                          Salud Certificada Arkiv <CheckCircle className="w-3 h-3 text-emerald-500" />
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium">Pasaporte digital inmutable verificado</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                    <Button variant="outline" className="rounded-xl font-bold py-6 group-hover:border-primary/50 transition-colors">
                      <Heart className="w-4 h-4 mr-2 text-rose-500" /> Adoptar
                    </Button>
                    <Button className="rounded-xl font-bold py-6 bg-primary hover:bg-accent text-white shadow-lg shadow-primary/20">
                      <Coins className="w-4 h-4 mr-2" /> XLM Sponsor
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STELLAR TRANSPARENCY & SUSTAINABILITY */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-border/60 shadow-xl rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-headline">Libro de Transparencia (Red Stellar)</CardTitle>
                  <CardDescription>Auditoría descentralizada en tiempo real</CardDescription>
                </div>
                <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                  FinTech ODS 17
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-slate-100">
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Donante</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Monto</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Asignación</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Hash Ledger</TableHead>
                      <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-slate-400">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {TRANSACCIONES_STELLAR.map((tx) => (
                      <TableRow key={tx.id} className="border-slate-50 hover:bg-slate-50 transition-colors cursor-default">
                        <TableCell className="font-bold py-4">{tx.donante}</TableCell>
                        <TableCell className="text-primary font-extrabold">{tx.monto}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{tx.destino}</TableCell>
                        <TableCell className="font-mono text-[10px] text-slate-400">
                          <span className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                            {tx.hash} <ExternalLink className="w-3 h-3" />
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-100 font-bold text-[10px]">
                            {tx.estado}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white rounded-[2rem] border-none shadow-2xl p-8 flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 transform group-hover:rotate-0 transition-transform duration-700">
              <TrendingUp className="w-48 h-48" />
            </div>
            
            <div className="space-y-8 relative z-10">
              <div>
                <div className="flex items-center gap-3 text-primary mb-2">
                  <div className="p-2 bg-white/10 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-white font-headline">Sustentabilidad Fucolla</h4>
                </div>
                <p className="text-sm text-slate-400">Nuestro modelo de independencia financiera B2G.</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <p className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" /> Licenciamiento SaaS
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Los municipios abonan una tasa mensual por infraestructura Pawsi Maps AI, cubriendo costos operativos.
                  </p>
                </div>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <p className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-400" /> Donaciones 1:1
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    El 100% de los XLM de donantes ciudadanos se destina directamente a medicina y alimentación animal.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-500 font-bold tracking-widest uppercase">
              <span>Estructura Autónoma</span>
              <div className="flex items-center gap-1 text-emerald-400">
                <CheckCircle className="w-4 h-4" /> Activa
              </div>
            </div>
          </Card>
        </section>
      </main>

      <footer className="bg-white border-t border-border mt-16 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-primary" />
            <p className="text-sm font-bold text-slate-900 font-headline">Pawsi AI 2026</p>
          </div>
          <p className="text-xs font-semibold text-slate-500 text-center max-w-lg leading-relaxed">
            Una alianza estratégica entre la ONG Fucolla, los Municipios de Salta y Arkiv Network. 
            Desarrollado para la Hackaton Puna Tech • Salta, Argentina.
          </p>
          <div className="flex gap-4">
            <Share2 className="w-4 h-4 text-slate-400 hover:text-primary transition-colors cursor-pointer" />
            <ExternalLink className="w-4 h-4 text-slate-400 hover:text-primary transition-colors cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}
