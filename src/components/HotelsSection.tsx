import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Calendar, Users, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Hotel {
  id: string;
  name: string;
  state_name: string;
  address: string;
  latitude: number;
  longitude: number;
  price_per_night: number;
  rating: number;
  image_url?: string;
  amenities: string[];
  description: string;
}

interface HotelsSectionProps {
  stateName?: string;
}

const HotelsSection = ({ stateName }: HotelsSectionProps) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        let query = supabase.from('hotels').select('*');
        
        if (stateName) {
          query = query.eq('state_name', stateName);
        }
        
        const { data, error } = await query.order('rating', { ascending: false });
        
        if (error) throw error;
        setHotels(data || []);
      } catch (error) {
        console.error('Erro ao buscar hotéis:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os hotéis.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [stateName, toast]);

  const handleBooking = async (hotel: Hotel) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para fazer reservas.",
        variant: "destructive",
      });
      return;
    }

    setBookingLoading(hotel.id);

    try {
      // Create a booking entry and then proceed to payment
      const checkInDate = new Date();
      checkInDate.setDate(checkInDate.getDate() + 7); // 1 week from now
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkOutDate.getDate() + 2); // 2 nights

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          hotel_name: hotel.name,
          state_name: hotel.state_name,
          price_per_night: hotel.price_per_night,
          nights: 2,
          check_in_date: checkInDate.toISOString().split('T')[0],
          check_out_date: checkOutDate.toISOString().split('T')[0],
        },
      });

      if (error) throw error;

      if (data?.url) {
        // Open payment page in new tab
        window.open(data.url, '_blank');
        toast({
          title: "Redirecionando",
          description: "Você será redirecionado para o pagamento.",
        });
      }
    } catch (error: any) {
      console.error('Erro na reserva:', error);
      toast({
        title: "Erro na reserva",
        description: error.message || "Não foi possível processar a reserva.",
        variant: "destructive",
      });
    } finally {
      setBookingLoading(null);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Carregando hotéis...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {stateName ? `Hotéis em ${stateName}` : 'Hotéis e Pousadas'}
          </h2>
          <p className="text-xl text-muted-foreground">
            Encontre as melhores acomodações para sua viagem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20">
                {hotel.image_url ? (
                  <img 
                    src={hotel.image_url} 
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-primary/60" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-foreground">
                    <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                    {hotel.rating}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {hotel.name}
                </CardTitle>
                <CardDescription className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {hotel.address}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {hotel.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {hotel.amenities.slice(0, 3).map((amenity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{hotel.amenities.length - 3} mais
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      R$ {hotel.price_per_night.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">por noite</p>
                  </div>
                  
                  <Button 
                    onClick={() => handleBooking(hotel)}
                    disabled={bookingLoading === hotel.id}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {bookingLoading === hotel.id ? (
                      <>
                        <CreditCard className="h-4 w-4 mr-2 animate-pulse" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4 mr-2" />
                        Reservar
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {hotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {stateName 
                ? `Nenhum hotel encontrado em ${stateName}.`
                : "Nenhum hotel disponível no momento."
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HotelsSection;