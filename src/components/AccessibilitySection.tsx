import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const AccessibilitySection = () => {
  const features = [
    {
      icon: "🔊",
      title: "Descrições Sonoras",
      description: "Todos os destinos contam com descrições detalhadas em áudio, permitindo que pessoas com deficiência visual experienciem a riqueza dos locais através de narrativas envolventes."
    },
    {
      icon: "📱",
      title: "Interface Acessível",
      description: "Design responsivo com alto contraste, fontes legíveis e navegação por teclado. Compatível com leitores de tela e tecnologias assistivas."
    },
    {
      icon: "🗣️",
      title: "Guias Inclusivos",
      description: "Informações sobre acessibilidade física dos destinos, incluindo rampas, elevadores e facilidades para pessoas com mobilidade reduzida."
    },
    {
      icon: "🌍",
      title: "Turismo Para Todos",
      description: "Acreditamos que as belezas do Brasil devem ser acessíveis a todos. Nosso objetivo é democratizar o turismo e promover a inclusão."
    }
  ]

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Turismo{" "}
            <span className="bg-gradient-forest bg-clip-text text-transparent">Acessível</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Nossa missão é tornar as maravilhas do Brasil acessíveis para todos os visitantes, 
            criando experiências inclusivas que respeitam a diversidade e promovem a igualdade no turismo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-warm transition-spring border-2 border-transparent hover:border-brasil-yellow/30"
            >
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="bg-gradient-brasil text-white border-0 shadow-brasil">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Nosso Compromisso com a Inclusão</h3>
              <p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
                Trabalhamos continuamente para melhorar nossos recursos de acessibilidade e 
                garantir que cada pessoa possa descobrir e desfrutar das belezas naturais e 
                culturais do Brasil, independentemente de suas necessidades especiais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                  aria-label="Conhecer recursos de acessibilidade detalhados"
                >
                  📋 Recursos de Acessibilidade
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                  aria-label="Entrar em contato para sugestões"
                >
                  💬 Sugestões e Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default AccessibilitySection