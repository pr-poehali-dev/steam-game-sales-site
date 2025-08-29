import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

// Import components
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GameCard from "@/components/GameCard";
import GameModal from "@/components/GameModal";
import GameTabs from "@/components/GameTabs";
import Footer from "@/components/Footer";

interface Game {
  id: number;
  title: string;
  price: string;
  originalPrice: string | null;
  discount: string | null;
  rating: number;
  genre: string;
  image: string;
  steamKey: boolean;
  description: string;
}

interface CartItem {
  id: number;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  const featuredGames: Game[] = [
    {
      id: 1,
      title: "Mystic Legends RPG",
      price: "₽1,299",
      originalPrice: "₽1,799",
      discount: "-30%",
      rating: 4.8,
      genre: "RPG",
      image: "/img/716ab0ba-41a0-4811-846f-a427888568cd.jpg",
      steamKey: true,
      description: "Эпическая RPG с открытым миром и захватывающим сюжетом"
    },
    {
      id: 2,
      title: "Speed Racing Championship",
      price: "₽899",
      originalPrice: "₽1,299",
      discount: "-31%",
      rating: 4.5,
      genre: "Racing",
      image: "/img/c0d624fd-0e6d-45e6-ba03-237df1bbcca2.jpg",
      steamKey: true,
      description: "Реалистичные гонки с потрясающей графикой"
    },
    {
      id: 3,
      title: "Cyber Shooter 2077",
      price: "₽1,599",
      originalPrice: null,
      discount: null,
      rating: 4.9,
      genre: "Shooter",
      image: "/img/fe4620e2-0079-4346-ba8f-5b6c9a551aec.jpg",
      steamKey: true,
      description: "Футуристический шутер в киберпанк вселенной"
    }
  ];

  const gameGenres = [
    { name: "Action", icon: "Zap", count: 156 },
    { name: "RPG", icon: "Shield", count: 89 },
    { name: "Racing", icon: "Car", count: 45 },
    { name: "Strategy", icon: "Brain", count: 67 },
    { name: "Shooter", icon: "Target", count: 134 },
    { name: "Adventure", icon: "Map", count: 78 }
  ];

  const reviews = [
    {
      id: 1,
      user: "GameMaster2024",
      rating: 5,
      text: "Быстрая доставка ключей! Отличный сервис!",
      game: "Mystic Legends RPG"
    },
    {
      id: 2,
      user: "SpeedRacer",
      rating: 5,
      text: "Ключ пришел мгновенно после оплаты. Рекомендую!",
      game: "Speed Racing Championship"
    }
  ];

  // Functions for cart and filtering
  const addToCart = (game: Game) => {
    const existingItem = cart.find(item => item.id === game.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === game.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: game.id,
        title: game.title,
        price: game.price,
        image: game.image,
        quantity: 1
      }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace('₽', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const openGameModal = (game: Game) => {
    setSelectedGame(game);
    setIsGameModalOpen(true);
  };

  const handleBuyNow = (game: typeof featuredGames[0]) => {
    addToCart(game);
    setIsGameModalOpen(false);
  };

  // Filter games based on search, price, and genre
  useEffect(() => {
    let filtered = [...featuredGames];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenre !== "all") {
      filtered = filtered.filter(game => game.genre === selectedGenre);
    }

    // Filter by price
    filtered = filtered.filter(game => {
      const price = parseInt(game.price.replace('₽', '').replace(',', ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    setFilteredGames(filtered);
  }, [searchTerm, selectedGenre, priceRange]);

  const handleBuyNow = (game: Game) => {
    addToCart(game);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        getTotalPrice={getTotalPrice}
      />

      {/* Hero Section Component */}
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      {/* Featured Games */}
      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">🔥 Популярные игры</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onGameClick={openGameModal}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <GameTabs
        games={featuredGames}
        onGameClick={openGameModal}
        onAddToCart={addToCart}
      />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">🔥 Горячие скидки</h3>
                <p className="text-muted-foreground mb-8">Лучшие цены только сейчас</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredGames.filter(game => game.discount).map((game) => (
                  <GameCard
                    key={`sale-${game.id}`}
                    game={game}
                    onGameClick={openGameModal}
                    onAddToCart={addToCart}
                    variant="compact"
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="top" className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">⭐ Топ продаж</h3>
                <p className="text-muted-foreground mb-8">Самые популярные игры месяца</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredGames.map((game, index) => (
                  <Card key={`top-${game.id}`} className="game-card">
                    <div className="relative">
                      <img 
                        src={game.image} 
                        alt={game.title}
                        className="w-full h-32 object-cover cursor-pointer"
                        onClick={() => openGameModal(game)}
                      />
                      <Badge className="absolute top-2 left-2 bg-primary">
                        #{index + 1}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle 
                        className="text-base cursor-pointer hover:text-primary"
                        onClick={() => openGameModal(game)}
                      >
                        {game.title}
                      </CardTitle>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Icon name="Star" size={14} className="text-yellow-400" fill="currentColor" />
                          <span className="text-sm">{game.rating}</span>
                        </div>
                        <Button size="sm" onClick={() => addToCart(game)}>Купить</Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Genres */}
      <section id="genres" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">🎯 Игры по жанрам</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gameGenres.map((genre) => (
              <Card key={genre.name} className="hover-scale cursor-pointer text-center p-4">
                <div className="flex flex-col items-center space-y-2">
                  <Icon name={genre.icon as any} size={32} className="text-primary" />
                  <h4 className="font-semibold">{genre.name}</h4>
                  <Badge variant="secondary">{genre.count} игр</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">💬 Отзывы покупателей</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{review.user}</CardTitle>
                    <div className="flex">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-400" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <CardDescription>Купил: {review.game}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/Support */}
      <section id="support" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8">🎧 Нужна помощь?</h3>
          <p className="text-xl text-muted-foreground mb-8">
            Наша команда поддержки работает 24/7
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button variant="outline" className="hover-scale">
              <Icon name="MessageCircle" className="mr-2" size={20} />
              Онлайн чат
            </Button>
            <Button variant="outline" className="hover-scale">
              <Icon name="Mail" className="mr-2" size={20} />
              Email поддержка
            </Button>
            <Button variant="outline" className="hover-scale">
              <Icon name="Phone" className="mr-2" size={20} />
              Телефон
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Game Details Modal */}
      <GameModal
        game={selectedGame}
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
        onAddToCart={(game) => {
          addToCart(game);
          setIsGameModalOpen(false);
          setIsCartOpen(true);
        }}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
};

export default Index;