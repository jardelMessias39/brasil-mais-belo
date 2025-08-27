import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const states = [
  {
    name: "Rio de Janeiro",
    region: "Sudeste",
    highlights: "Cristo Redentor, Pão de Açúcar, Copacabana",
    description: "A cidade maravilhosa com suas praias icônicas e paisagens deslumbrantes.",
    image: "🏖️"
  },
  {
    name: "Amazonas",
    region: "Norte", 
    highlights: "Floresta Amazônica, Rio Negro, Encontro das Águas",
    description: "O pulmão do mundo com biodiversidade única e experiências selvagens.",
    image: "🌿"
  },
  {
    name: "Bahia",
    region: "Nordeste",
    highlights: "Salvador, Chapada Diamantina, Costa do Descobrimento",
    description: "Rica cultura afro-brasileira e praias de águas cristalinas.",
    image: "🥁"
  },
  {
    name: "Santa Catarina",
    region: "Sul",
    highlights: "Florianópolis, Balneário Camboriú, Serra Catarinense",
    description: "Praias paradisíacas e montanhas com clima europeu.",
    image: "🏔️"
  },
  {
    name: "Minas Gerais",
    region: "Sudeste",
    highlights: "Ouro Preto, Tiradentes, Serra da Canastra",
    description: "Cidades históricas e gastronomia tradicional mineira.",
    image: "⛪"
  },
  {
    name: "Ceará",
    region: "Nordeste",
    highlights: "Jericoacoara, Canoa Quebrada, Fortaleza",
    description: "Praias com dunas douradas e ventos ideais para esportes aquáticos.",
    image: "🪁"
  },
  {
    name: "Mato Grosso do Sul",
    region: "Centro-Oeste",
    highlights: "Pantanal, Bonito, Aquário Natural",
    description: "Ecoturismo com águas cristalinas e vida selvagem abundante.",
    image: "🐆"
  },
  {
    name: "Pernambuco",
    region: "Nordeste",
    highlights: "Fernando de Noronha, Recife, Porto de Galinhas",
    description: "Arquipélago paradisíaco e rica cultura nordestina.",
    image: "🐢"
  },
  {
    name: "Goiás",
    region: "Centro-Oeste",
    highlights: "Chapada dos Veadeiros, Pirenópolis, Caldas Novas",
    description: "Cerrado exuberante com cachoeiras e águas termais.",
    image: "💎"
  },
  {
    name: "Espírito Santo",
    region: "Sudeste",
    highlights: "Guarapari, Vitória, Domingos Martins",
    description: "Praias douradas e montanhas capixabas encantadoras.",
    image: "🌺"
  }
]

const StatesSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Os 10 Estados Mais Belos do{" "}
            <span className="bg-gradient-brasil bg-clip-text text-transparent">Brasil</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra destinos únicos que representam a diversidade e beleza natural do nosso país
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {states.map((state, index) => (
            <Card 
              key={state.name}
              className="group hover:shadow-brasil transition-spring hover:-translate-y-2 border-2 border-transparent hover:border-brasil-green/20"
            >
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">{state.image}</div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{state.name}</h3>
                  <p className="text-sm text-brasil-blue font-medium mb-3">{state.region}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {state.description}
                  </p>
                  <div className="text-xs text-brasil-green font-medium mb-4">
                    {state.highlights}
                  </div>
                  <Button 
                    variant="brasil" 
                    size="sm" 
                    className="w-full"
                    aria-label={`Explorar destinos em ${state.name}`}
                  >
                    Explorar
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

export default StatesSection