-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create bookings table for tourism bookings
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  state_name TEXT NOT NULL,
  hotel_name TEXT NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  guests INTEGER NOT NULL DEFAULT 1,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create hotels table for accommodation options
CREATE TABLE public.hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  state_name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  price_per_night DECIMAL(8,2) NOT NULL,
  rating DECIMAL(3,2) DEFAULT 4.5,
  image_url TEXT,
  amenities TEXT[],
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for bookings
CREATE POLICY "Users can view their own bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
ON public.bookings 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for hotels (public read access)
CREATE POLICY "Hotels are viewable by everyone" 
ON public.hotels 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hotels_updated_at
BEFORE UPDATE ON public.hotels
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample hotels data
INSERT INTO public.hotels (name, state_name, address, latitude, longitude, price_per_night, rating, amenities, description) VALUES
('Hotel Amazônia Palace', 'Amazonas', 'Av. Getúlio Vargas, 657 - Centro, Manaus - AM', -3.1190, -60.0217, 180.00, 4.2, ARRAY['Wi-Fi', 'Piscina', 'Restaurante', 'Ar-condicionado'], 'Hotel de luxo no coração de Manaus com vista para o Rio Negro'),
('Pousada Uirapuru', 'Amazonas', 'Rua dos Andradas, 311 - Centro, Manaus - AM', -3.1201, -60.0185, 120.00, 4.0, ARRAY['Wi-Fi', 'Café da manhã', 'Recepção 24h'], 'Pousada aconchegante próxima aos principais pontos turísticos'),
('Hotel Pantanal Norte', 'Mato Grosso', 'Av. Isaac Póvoas, 1000 - Centro Norte, Cuiabá - MT', -15.5989, -56.0949, 150.00, 4.3, ARRAY['Wi-Fi', 'Piscina', 'Academia', 'Estacionamento'], 'Hotel moderno com acesso fácil ao Pantanal'),
('Pousada Águas do Pantanal', 'Mato Grosso do Sul', 'Estrada Parque Pantanal, Km 15 - Corumbá - MS', -19.0068, -57.6531, 200.00, 4.5, ARRAY['Piscina natural', 'Passeios ecológicos', 'Restaurante regional'], 'Pousada ecológica com experiência autêntica do Pantanal'),
('Copacabana Palace', 'Rio de Janeiro', 'Av. Atlântica, 1702 - Copacabana, Rio de Janeiro - RJ', -22.9711, -43.1823, 800.00, 4.8, ARRAY['Piscina', 'Spa', 'Restaurante', 'Academia', 'Wi-Fi'], 'Hotel icônico de luxo em frente à praia de Copacabana'),
('Hotel Arpoador', 'Rio de Janeiro', 'Rua Francisco Otaviano, 177 - Ipanema, Rio de Janeiro - RJ', -22.9844, -43.2003, 320.00, 4.1, ARRAY['Wi-Fi', 'Restaurante', 'Próximo à praia'], 'Hotel boutique com vista para a praia do Arpoador');