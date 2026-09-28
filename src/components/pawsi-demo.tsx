import {
  AlertTriangle,
  BarChart3,
  Cat,
  CheckCircle,
  Coins,
  Dog,
  ExternalLink,
  Globe,
  Heart,
  Layers,
  MapPin,
  Share2,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  formatPesos,
  isBlank,
  type CampaignDataset,
  type CampaignRecord,
} from "@/lib/parse-campaign-csv";

function display(value: string, fallback: string): string {
  return isBlank(value) ? fallback : value;
}

function observacionClass(observacion: string): string {
  if (observacion.toLowerCase() === "pagado") {
    return "bg-emerald-50 text-emerald-700 border-emerald-100";
  }
  if (/falta|falto/i.test(observacion)) {
    return "bg-amber-50 text-amber-800 border-amber-100";
  }
  return "bg-slate-50 text-slate-600 border-slate-100";
}

function AnimalMark({ tipo }: { tipo: string }) {
  const Icon = tipo === "Gato" ? Cat : tipo === "Perro" ? Dog : Heart;
  return (
    <div className="p-2 bg-primary/10 text-primary rounded-xl">
      <Icon className="w-5 h-5" aria-hidden="true" />
    </div>
  );
}

function AportesMeaning() {
  return (
    <>
      Los aportes de la campaña son los gastos de medicamentos y descartables de las cirugías. Nada de ese monto es para el municipio ni para la universidad.
    </>
  );
}

function CirugiasMeaning({ entidad, municipio }: { entidad: string; municipio: string }) {
  return (
    <>
      Las intervenciones quirúrgicas las realizan estudiantes del último año de la carrera de Medicina de la universidad ({entidad}), en modalidad de prácticas profesionales, articuladas con FuCoLla y {municipio}.
    </>
  );
}

export function PawsiDemo({ campaign }: { campaign: CampaignDataset }) {
  const mascotas = campaign.mascotasConTipo;
  const mezclaPerros = mascotas > 0 ? Math.round((campaign.perros / mascotas) * 100) : 0;
  const muestra = campaign.nombresMuestra.join(", ");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
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

          <div className="flex items-center gap-2 bg-slate-50 border border-border px-4 py-2 rounded-xl w-full sm:w-auto">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <div className="text-left">
              <p className="font-semibold text-sm leading-tight">{campaign.municipio}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {campaign.fecha} · {campaign.entidadGestora}
              </p>
              <p className="text-[10px] text-slate-600 leading-tight max-w-[240px]">
                Aportes: medicamentos y descartables de las cirugías
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12 flex-1">
        <section className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-8 lg:p-12 shadow-2xl min-h-[400px]">
          <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-end">
            <img src="/logo-fucolla.png" alt="" className="h-full w-auto object-contain opacity-20" />
          </div>
          <div className="relative z-10 space-y-8">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1 font-bold tracking-[0.1em] uppercase">
                Jornada {campaign.fecha}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-headline">
                Campaña en {campaign.municipio}
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                {campaign.totalRegistros} registros de la base FuCoLla. {campaign.perros} perros y {campaign.gatos} gatos.{" "}
                <CirugiasMeaning entidad={campaign.entidadGestora} municipio={campaign.municipio} />
              </p>
              <p className="text-white text-base leading-relaxed mt-4 max-w-3xl">
                <AportesMeaning /> El total en la base es {formatPesos(campaign.aporteTotal)}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { n: "3", color: "#4C9F38", title: "Salud y Bienestar", desc: "Cirugías de perros y gatos en prácticas profesionales de estudiantes de último año de Medicina." },
                { n: "11", color: "#F99D1C", title: "Ciudades Sostenibles", desc: `Jornada articulada con FuCoLla y ${campaign.municipio}, provincia de Salta.` },
                { n: "17", color: "#1F436A", title: "Alianzas Estratégicas", desc: `Prácticas de ${campaign.entidadGestora} con FuCoLla y ${campaign.municipio}. Los aportes no van al municipio ni a la universidad.` },
              ].map((goal) => (
                <div key={goal.n} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span style={{ backgroundColor: goal.color }} className="w-10 h-10 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                      {goal.n}
                    </span>
                    <h3 className="font-bold text-white text-sm uppercase tracking-wide">{goal.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{goal.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-border/60 shadow-xl rounded-[2rem] overflow-hidden">
            <CardHeader className="border-b bg-slate-50/50">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-xl font-headline">Panel de la jornada</CardTitle>
                  <CardDescription>
                    Conteos por tipo de mascota tomados de {campaign.fuente}. Los aportes de la campaña cubren medicamentos y descartables de las cirugías.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                  Base real
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="aspect-[21/9] bg-slate-900 rounded-[1.5rem] relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px]"></div>
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] opacity-60"
                  style={{ width: "60%", height: "80%", backgroundColor: "rgba(239, 68, 68, 0.4)" }}
                ></div>
                <div className="relative h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                  <span className="text-[10px] font-bold text-primary bg-primary/20 px-3 py-1 rounded-full uppercase tracking-widest border border-primary/30">
                    Lugar de la jornada
                  </span>
                  <h3 className="text-3xl font-bold text-white font-headline">{campaign.municipio}</h3>
                  <p className="text-slate-300 text-sm font-medium max-w-md">
                    {campaign.fecha} · {campaign.entidadGestora}. El municipio es el lugar de la campaña: no recibe los aportes.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <Dog className="w-5 h-5 mx-auto mb-3 text-slate-400" />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Perros</p>
                  <p className="text-3xl font-bold text-slate-900 font-headline">{campaign.perros}</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <Cat className="w-5 h-5 mx-auto mb-3 text-slate-400" />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Gatos</p>
                  <p className="text-3xl font-bold text-slate-900 font-headline">{campaign.gatos}</p>
                  <p className="text-[10px] font-bold text-slate-500 mt-3 mb-1">{mezclaPerros}% de las mascotas son perros</p>
                  <Progress value={mezclaPerros} className="h-1" aria-label="Proporción de perros" />
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <Coins className="w-5 h-5 mx-auto mb-3 text-slate-400" />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Aportes de la campaña</p>
                  <p className="text-3xl font-bold text-emerald-600 font-headline">{formatPesos(campaign.aporteTotal)}</p>
                  <p className="text-xs text-slate-700 mt-3 leading-snug">
                    Medicamentos y descartables de las cirugías. No es para el municipio ni para la universidad.
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 mt-2">{campaign.pagados} filas con observación Pagado</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 px-4 py-3">
                  <Users className="w-4 h-4 text-primary" />
                  <span><strong>{campaign.totalRegistros}</strong> filas en la base</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 px-4 py-3">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span><strong>{campaign.sinMascota}</strong> filas sin mascota</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 px-4 py-3">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    {campaign.entidadGestora}
                    <span className="block text-[11px] text-slate-500 leading-snug">
                      Prácticas de estudiantes de último año de Medicina. La universidad no recibe los aportes.
                    </span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="bg-accent text-accent-foreground border-none shadow-2xl rounded-[2rem] flex-1 overflow-hidden relative">
              <div className="absolute bottom-0 right-0 p-4 opacity-5 pointer-events-none">
                <AlertTriangle className="w-32 h-32" />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg font-headline text-white">Lectura de la base</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                  <p className="text-sm leading-relaxed text-slate-100">
                    En {campaign.municipio}, el {campaign.fecha}, la base registra {campaign.perros} perros y {campaign.gatos} gatos.{" "}
                    <CirugiasMeaning entidad={campaign.entidadGestora} municipio={campaign.municipio} />{" "}
                    Los aportes suman {formatPesos(campaign.aporteTotal)} y cubren medicamentos y descartables de esas cirugías. Nada de ese monto es para el municipio ni para la universidad.
                    {muestra ? ` Entre los nombres figuran ${muestra}.` : ""}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fuente pública</p>
                  <p className="text-xs font-bold text-emerald-400 break-all">{campaign.fuente}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-none rounded-[2rem] shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-white text-sm">Privacidad de la base</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                La demo publica municipio, mascota, tipo, aporte y entidad gestora. La columna de teléfono quedó fuera del archivo.
              </p>
            </Card>
          </div>
        </section>

        <section className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold font-headline">Mascotas registradas en {campaign.municipio}</h3>
            <p className="text-muted-foreground text-sm mt-1">
              {campaign.mascotas.length} mascotas el {campaign.fecha} ({campaign.perros} perros y {campaign.gatos} gatos). Cada tarjeta es una fila de la base.
              {muestra ? ` Nombres de la jornada: ${muestra}.` : ""}
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaign.mascotas.map((animal) => (
              <li key={animal.id} className="bg-white rounded-2xl border border-border p-5 shadow-sm flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <AnimalMark tipo={animal.tipo} />
                    <div className="min-w-0">
                      <h4 className="text-lg font-bold font-headline truncate">{display(animal.nombre, "Sin nombre")}</h4>
                      <p className="text-xs text-muted-foreground truncate">{display(animal.responsable, "Sin responsable")}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="shrink-0">{animal.tipo || "Sin tipo"}</Badge>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <div>
                    <span className="font-bold text-primary">{formatPesos(animal.aporte)}</span>
                    <p className="text-[10px] text-slate-500 leading-tight">medicamentos y descartables</p>
                  </div>
                  <Badge variant="secondary" className={observacionClass(animal.observaciones)}>
                    {display(animal.observaciones, "Sin observación")}
                  </Badge>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {animal.municipio} · {animal.entidadGestora} · fila {animal.id}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-border/60 shadow-xl rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-xl font-headline">Aportes de la campaña</CardTitle>
                  <CardDescription>
                    Gastos de medicamentos y descartables de las cirugías del {campaign.fecha}. Total {formatPesos(campaign.aporteTotal)}. Nada de este monto es para el municipio ni para la universidad.
                  </CardDescription>
                </div>
                <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                  {campaign.entidadGestora}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-sm text-foreground mb-4 leading-relaxed">
                <AportesMeaning />{" "}
                <CirugiasMeaning entidad={campaign.entidadGestora} municipio={campaign.municipio} />{" "}
                Las cifras salen de la base. El ledger Stellar de la demo es una capa ilustrativa y usa {formatPesos(campaign.aporteTotal)} como total de la jornada.
              </p>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-slate-100">
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">N°</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Mascota</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tipo</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Responsable</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Aporte
                        <span className="block normal-case tracking-normal font-medium text-slate-500">medicamentos y descartables</span>
                      </TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Observación</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaign.registros.map((row) => (
                      <AporteRow key={row.id} row={row} />
                    ))}
                    <TableRow className="border-slate-100 bg-slate-50/80">
                      <TableCell colSpan={4} className="font-bold py-4">
                        Total de aportes de la campaña
                        <span className="block text-xs font-medium text-muted-foreground mt-1">
                          Medicamentos y descartables de las cirugías. No es para el municipio ni para la universidad.
                        </span>
                      </TableCell>
                      <TableCell className="text-primary font-extrabold">{formatPesos(campaign.aporteTotal)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{campaign.totalRegistros} filas</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white rounded-[2rem] border-none shadow-2xl p-8 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12">
              <TrendingUp className="w-48 h-48" />
            </div>

            <div className="space-y-8 relative z-10">
              <div>
                <div className="flex items-center gap-3 text-primary mb-2">
                  <div className="p-2 bg-white/10 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-headline">Sustentabilidad Fucolla</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  En esta jornada los aportes suman {formatPesos(campaign.aporteTotal)}. Son gastos de medicamentos y descartables de las cirugías, no fondos para el municipio ni para la universidad ({campaign.entidadGestora}).
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                  <p className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" /> Licenciamiento SaaS
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Los municipios abonan una tasa mensual por infraestructura Pawsi Maps AI, cubriendo costos operativos. Esa tasa no sale de los aportes de la campaña.
                  </p>
                </div>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                  <p className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-400" /> Aportes de la campaña
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Medicamentos y descartables de las cirugías: {formatPesos(campaign.aporteTotal)}. Las intervenciones las realizan estudiantes del último año de Medicina ({campaign.entidadGestora}) en prácticas profesionales, articuladas con FuCoLla y {campaign.municipio}.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-500 font-bold tracking-widest uppercase">
              <span>{campaign.municipio}</span>
              <div className="flex items-center gap-1 text-emerald-400">
                <CheckCircle className="w-4 h-4" /> {campaign.fecha}
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
            Jornada {campaign.fecha} en {campaign.municipio}. Cirugías en prácticas profesionales de estudiantes de último año de Medicina ({campaign.entidadGestora}), articuladas con FuCoLla. Los aportes cubren medicamentos y descartables, no al municipio ni a la universidad. ONG Fucolla · Hackathon Puna Tech · Salta, Argentina.
          </p>
          <div className="flex gap-4">
            <Share2 className="w-4 h-4 text-slate-400" />
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </footer>
    </div>
  );
}

function AporteRow({ row }: { row: CampaignRecord }) {
  return (
    <TableRow className="border-slate-50">
      <TableCell className="font-mono text-xs py-4">{row.id}</TableCell>
      <TableCell className="font-bold">{display(row.nombre, row.tieneMascota ? "Sin nombre" : "Sin mascota")}</TableCell>
      <TableCell className="text-xs">{display(row.tipo, "—")}</TableCell>
      <TableCell className="text-xs text-muted-foreground">{display(row.responsable, "—")}</TableCell>
      <TableCell className="text-primary font-extrabold">{formatPesos(row.aporte)}</TableCell>
      <TableCell>
        <Badge variant="secondary" className={`font-bold text-[10px] ${observacionClass(row.observaciones)}`}>
          {display(row.observaciones, "—")}
        </Badge>
      </TableCell>
    </TableRow>
  );
}
