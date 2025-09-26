import { Button } from "@/components/ui/button"
import heroImage from "@/assets/brasil-hero.jpg"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Descubra o{" "}
          <span className="bg-gradient-to-r from-brasil-yellow to-brasil-green bg-clip-text text-transparent">
            Brasil
          </span>{" "}
          Mais Belo
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Explore os destinos mais deslumbrantes do Brasil com experiências acessíveis para todos. 
          Descubra paisagens únicas, culturas ricas e aventuras inesquecíveis.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="hero" 
            size="lg"
            className="text-lg px-8 py-4"
            aria-label="Explorar destinos do Brasil"
          >
            🗺️ Explorar Destinos
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10"
            aria-label="Conhecer recursos de acessibilidade"
          >
            ♿ Acessibilidade
          </Button>
        </div>
        
        {/* Accessibility indicator */}
        <div className="mt-12 flex items-center justify-center gap-4 text-sm text-gray-300">
          <span>🔊 Descrições sonoras disponíveis</span>
          <span>•</span>
          <span>📱 Totalmente acessível</span>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection