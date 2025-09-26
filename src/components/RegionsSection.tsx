import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import amazoniaImage from "@/assets/amazonia.jpg"
import pantanalImage from "@/assets/pantanal.jpg" 
import copacabanaImage from "@/assets/copacabana.jpg"

const regions = [
  {
    name: "Norte",
    title: "Amazônia e Natureza Exuberante",
    image: amazoniaImage,
    destinations: [
      "Floresta Amazônica - Maior floresta tropical do mundo",
      "Encontro das Águas - Fenômeno natural único",
      "Ilha de Marajó - Paraíso ecológico com búfalos",
      "Serra do Divisor - Trilhas e biodiversidade"
    ],
    activities: "Trilhas ecológicas, observação de fauna, passeios de barco, pesca esportiva",
    cuisine: "Tucumã, açaí, pirarucu, tambaqui, cupuaçu"
  },
  {
    name: "Sudeste", 
    title: "Praias Icônicas e Cidades Históricas",
    image: copacabanaImage,
    destinations: [
      "Cristo Redentor - Uma das 7 maravilhas do mundo",
      "Pão de Açúcar - Vista panorâmica do Rio",
      "Ouro Preto - Patrimônio histórico da humanidade",
      "Inhotim - Maior museu a céu aberto do mundo"
    ],
    activities: "City tours, trilhas urbanas, museus, praias, vida noturna",
    cuisine: "Feijoada, pão de açúcar, queijo minas, doce de leite"
  },
  {
    name: "Centro-Oeste",
    title: "Pantanal e Ecoturismo",
    image: pantanalImage, 
    destinations: [
      "Pantanal - Maior planície alagável do mundo",
      "Chapada dos Guimarães - Formações rochosas",
      "Bonito - Águas cristalinas e grutas",
      "Brasília - Capital modernista do país"
    ],
    activities: "Safáris fotográficos, mergulho, flutuação, observação de aves",
    cuisine: "Pacu pintado, piranha, pequi, farofa de banana"
  },
  {
    name: "Sul",
    title: "Cultura Européia e Paisagens Serranas",
    image: copacabanaImage,
    destinations: [
      "Gramado - Charme europeu nas montanhas",
      "Florianópolis - Ilha da magia",
      "Cataratas do Iguaçu - Espetáculo natural",
      "Bento Gonçalves - Vale dos vinhedos"
    ],
    activities: "Enoturismo, trilhas de montanha, festivais, praias do sul",
    cuisine: "Churrasco gaúcho, chimarrão, cucas, vinho colonial"
  }
]

const RegionsSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Explore por{" "}
            <span className="bg-gradient-sunset bg-clip-text text-transparent">Regiões</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada região do Brasil oferece experiências únicas e inesquecíveis
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {regions.map((region, index) => (
            <Card 
              key={region.name}
              className="group overflow-hidden hover:shadow-ocean transition-spring border-2 border-transparent hover:border-brasil-blue/20"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={region.image}
                  alt={`Paisagens da região ${region.name} do Brasil`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-spring"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{region.name}</h3>
                  <p className="text-lg opacity-90">{region.title}</p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-brasil-green mb-2">🗺️ Principais Destinos:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {region.destinations.map((dest, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-brasil-yellow">•</span>
                          {dest}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-brasil-blue mb-2">🎯 Atividades:</h4>
                    <p className="text-sm text-muted-foreground">{region.activities}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-brasil-earth mb-2">🍽️ Culinária Típica:</h4>
                    <p className="text-sm text-muted-foreground">{region.cuisine}</p>
                  </div>
                  
                  <Button 
                    variant="ocean" 
                    className="w-full mt-4"
                    aria-label={`Ver mais destinos da região ${region.name}`}
                  >
                    Ver Mais Destinos
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RegionsSection